from ..repositories.chat_repository import ChatRepository
from .gemini_service import GeminiService
from .openrouter_service import OpenRouterService
from .groq_service import GroqService
from ..core.logger import logger
from ..models.chat import Chat

class ChatService:
    def __init__(self, repo: ChatRepository):
        self.repo = repo
        self.gemini = GeminiService()
        self.openrouter = OpenRouterService()
        self.groq = GroqService()

    async def converse_with_ai(self, user_id: str, query: str, language: str) -> Chat:
        """
        Submits chatbot queries to AI APIs using failover providers and saves records.
        """
        # Construct systematic context prompt wrapper
        system_wrapper = (
            f"You are the CodeSage AI assistant. Provide a helpful, technical explanation "
            f"regarding the active editor code in {language}.\n"
            f"Question: {query}\n"
            f"Use Markdown styling with clean code block listings where appropriate."
        )

        response_text = ""
        success_provider = ""

        # Phase 1: Try Gemini
        try:
            response_text = await self.gemini.generate_review(
                code=query, language=language, prompt_template=system_wrapper
            )
            success_provider = "Gemini"
        except Exception as e:
            logger.warning(f"Chat Gemini failure: {e}. Trying OpenRouter...")
            
            # Phase 2: Try OpenRouter
            try:
                response_text = await self.openrouter.generate_review(
                    code=query, language=language, prompt_template=system_wrapper
                )
                success_provider = "OpenRouter"
            except Exception as e2:
                logger.warning(f"Chat OpenRouter failure: {e2}. Trying Groq...")
                
                # Phase 3: Try Groq
                try:
                    response_text = await self.groq.generate_review(
                        code=query, language=language, prompt_template=system_wrapper
                    )
                    success_provider = "Groq"
                except Exception as e3:
                    logger.error(f"All Chat providers failed: {e3}")
                    raise Exception("AI Assistant is offline. Please retry in a moment.")

        logger.info(f"Chat response successfully generated via {success_provider}")

        # Save to database
        chat = await self.repo.create_chat(
            user_id=user_id,
            query=query,
            response=response_text,
            language=language
        )
        return chat
