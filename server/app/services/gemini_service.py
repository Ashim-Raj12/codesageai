import asyncio
import google.generativeai as genai
from ..core.config import settings
from ..core.logger import logger

class GeminiService:
    def __init__(self):
        if settings.GEMINI_API_KEY:
            genai.configure(api_key=settings.GEMINI_API_KEY)
        # Instantiate fast context flash model
        self.model = genai.GenerativeModel("gemini-1.5-flash")

    async def generate_review(self, code: str, language: str, prompt_template: str) -> str:
        """
        Executes review completions inside a separate worker thread.
        """
        if not settings.GEMINI_API_KEY:
            raise Exception("Gemini API key is not configured")

        prompt = prompt_template.format(code=code, language=language)
        try:
            logger.info("Sending code review request to Gemini API...")
            response = await asyncio.to_thread(self.model.generate_content, prompt)
            return response.text
        except Exception as e:
            logger.error(f"Gemini service exception: {e}")
            raise
