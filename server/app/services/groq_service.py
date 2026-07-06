import httpx
from ..core.config import settings
from ..core.logger import logger

class GroqService:
    async def generate_review(self, code: str, language: str, prompt_template: str) -> str:
        """
        Submits prompt reviews to Groq API.
        """
        if not settings.GROQ_API_KEY:
            raise Exception("Groq API key is not configured")

        prompt = prompt_template.format(code=code, language=language)
        url = "https://api.groq.com/openai/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {settings.GROQ_API_KEY}",
            "Content-Type": "application/json",
        }
        data = {
            "model": "llama-3.3-70b-versatile",
            "messages": [{"role": "user", "content": prompt}],
        }

        async with httpx.AsyncClient() as client:
            try:
                logger.info("Sending code review request to Groq API...")
                resp = await client.post(url, headers=headers, json=data, timeout=30.0)
                resp.raise_for_status()
                return resp.json()["choices"][0]["message"]["content"]
            except Exception as e:
                logger.error(f"Groq service exception: {e}")
                raise
