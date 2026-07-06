from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Dict, Any

from .security import verify_clerk_token
from .database import get_db
from ..repositories.profile_repository import ProfileRepository

security_scheme = HTTPBearer()

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security_scheme),
    db: AsyncSession = Depends(get_db)
) -> Dict[str, Any]:
    """
    Dependency that extracts the Bearer token from the headers, verifies it against Clerk,
    and returns user information (fetching or synchronizing user record in DB).
    """
    token = credentials.credentials
    try:
        # Verify and parse Clerk payload
        payload = await verify_clerk_token(token)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e),
            headers={"WWW-Authenticate": "Bearer"}
        )

    clerk_id = payload.get("sub")
    if not clerk_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token subject missing user identifier"
        )

    # Sync Clerk user to the local PostgreSQL database
    profile_repo = ProfileRepository(db)
    user = await profile_repo.get_by_clerk_id(clerk_id)
    
    if not user:
        # User not found in local DB yet; dynamically sync profile fields
        email = payload.get("email") or ""
        # Sometimes email resides inside nested objects or claims
        if not email and "emails" in payload:
            emails = payload.get("emails")
            if isinstance(emails, list) and len(emails) > 0:
                email = emails[0]
                
        name = payload.get("name") or payload.get("fname", "")
        user = await profile_repo.create_user(
            clerk_id=clerk_id,
            email=email,
            name=name
        )

    # Return standard dictionary representation of active user
    return {
        "clerk_id": user.clerk_id,
        "email": user.email,
        "name": user.name,
    }
