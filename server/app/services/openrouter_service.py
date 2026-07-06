import httpx
from ..core.config import settings
from ..core.logger import logger

class OpenRouterService:
    async def generate_review(self, code: str, language: str, prompt_template: str) -> str:
        """
        Submits prompt reviews to OpenRouter API.
        """
        if not settings.OPENROUTER_API_KEY:
            raise Exception("OpenRouter API key is not configured")

        prompt = prompt_template.format(code=code, language=language)
        url = "https://openrouter.ai/api/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {settings.OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
        }
        data = {
            "model": "google/gemini-2.5-flash",
            "messages": [{"role": "user", "content": prompt}],
        }

        async with httpx.AsyncClient() as client:
            try:
                logger.info("Sending code review request to OpenRouter API...")
                resp = await client.post(url, headers=headers, json=data, timeout=30.0)
                resp.raise_for_status()
                return resp.json()["choices"][0]["message"]["content"]
            except Exception as e:
                logger.error(f"OpenRouter service exception: {e}")
                raise
