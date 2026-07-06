import httpx
from typing import Optional, Dict, Any
from jose import jwt
from .config import settings
from .logger import logger

# Simple in-memory cache for Clerk public key sets
_jwks_cache: Optional[Dict[str, Any]] = None

async def get_clerk_jwks() -> Dict[str, Any]:
    global _jwks_cache
    if _jwks_cache is not None:
        return _jwks_cache

    # If the publishable key or JWKS URL is missing, we log warning
    if not settings.CLERK_JWKS_URL:
        logger.warning("CLERK_JWKS_URL config is empty. Verification will fail.")
        return {"keys": []}

    async with httpx.AsyncClient() as client:
        try:
            logger.info(f"Fetching Clerk JWKS from: {settings.CLERK_JWKS_URL}")
            resp = await client.get(settings.CLERK_JWKS_URL, timeout=10.0)
            resp.raise_for_status()
            _jwks_cache = resp.json()
            return _jwks_cache
        except Exception as e:
            logger.error(f"Error loading Clerk JWKS keys: {e}")
            raise Exception("Failed to load Clerk authentication keys")

async def verify_clerk_token(token: str) -> Dict[str, Any]:
    """
    Decodes the Clerk JWT token using RS256 algorithm and verifies signature via JWKS.
    """
    try:
        # Extract signing Key ID from headers without validation
        headers = jwt.get_unverified_header(token)
        kid = headers.get("kid")
        if not kid:
            raise Exception("Token header is missing 'kid' field")

        # Load signing keys
        jwks = await get_clerk_jwks()
        
        # Locate matching key ID
        signing_key = None
        for key in jwks.get("keys", []):
            if key.get("kid") == kid:
                signing_key = key
                break

        if not signing_key:
            raise Exception("No matching signing key found in Clerk JWKS")

        # Verify JWT payload signature
        payload = jwt.decode(
            token,
            signing_key,
            algorithms=["RS256"],
            options={"verify_at_hash": False}
        )
        return payload
    except Exception as e:
        logger.error(f"Clerk token verification error: {str(e)}")
        raise Exception("Invalid or expired Clerk token")
