import os
import json
from typing import Dict, Any, Optional
from ..repositories.analysis_repository import AnalysisRepository
from .gemini_service import GeminiService
from .openrouter_service import OpenRouterService
from .groq_service import GroqService
from ..core.logger import logger
from ..models.analysis import Analysis

# Helper to locate and load text templates
def load_prompt_template(filename: str) -> str:
    current_dir = os.path.dirname(os.path.abspath(__file__))
    prompt_path = os.path.join(current_dir, "..", "prompts", filename)
    with open(prompt_path, "r", encoding="utf-8") as f:
        return f.read()

class AnalysisService:
    def __init__(self, repo: AnalysisRepository):
        self.repo = repo
        self.gemini = GeminiService()
        self.openrouter = OpenRouterService()
        self.groq = GroqService()

    def _clean_json_response(self, text: str) -> Dict[str, Any]:
        """
        Cleans markdown JSON wraps (e.g. ```json ... ```) out of response texts to parse dictionaries.
        """
        cleaned = text.strip()
        if cleaned.startswith("```"):
            # Strip start blocks
            first_newline = cleaned.find("\n")
            if first_newline != -1:
                cleaned = cleaned[first_newline:].strip()
            # Strip trailing blocks
            if cleaned.endswith("```"):
                cleaned = cleaned[:-3].strip()

        # Parse and return JSON dictionary
        return json.loads(cleaned)

    async def execute_code_review(self, user_id: str, code: str, language: str) -> Analysis:
        """
        Orchestrates compiling code reviews using fallback models, parsing contents, and saving logs.
        """
        template = load_prompt_template("code_review.txt")
        raw_text = ""
        success_provider = ""

        # Phase 1: Try Gemini
        try:
            raw_text = await self.gemini.generate_review(code, language, template)
            success_provider = "Gemini"
        except Exception as e:
            logger.warning(f"Primary Gemini provider failed: {e}. Falling back to OpenRouter...")
            
            # Phase 2: Try OpenRouter
            try:
                raw_text = await self.openrouter.generate_review(code, language, template)
                success_provider = "OpenRouter"
            except Exception as e2:
                logger.warning(f"OpenRouter fallback failed: {e2}. Falling back to Groq...")
                
                # Phase 3: Try Groq
                try:
                    raw_text = await self.groq.generate_review(code, language, template)
                    success_provider = "Groq"
                except Exception as e3:
                    logger.error(f"All AI providers exhausted: {e3}")
                    raise Exception("Code analysis is temporarily unavailable. All AI review services failed.")

        logger.info(f"AI Review successfully generated via {success_provider}")

        # Parse structure
        try:
            report_dict = self._clean_json_response(raw_text)
        except Exception as e:
            logger.error(f"Failed to parse structured JSON from raw response text: {e}. Raw content: {raw_text}")
            raise Exception("AI review completed but response content was malformed.")

        # Extract values
        score = report_dict.get("score", 70)
        summary = report_dict.get("summary", "Code reviewed successfully.")
        explanation = report_dict.get("explanation", "Logic structures analyzed.")

        # Save to database
        analysis = await self.repo.create_analysis(
            user_id=user_id,
            code=code,
            language=language,
            score=score,
            summary=summary,
            explanation=explanation,
            raw_report=report_dict
        )
        return analysis
