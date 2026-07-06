from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from ....core.database import get_db
from ....core.dependencies import get_current_user
from ....schemas.profile import UserProfile, UserProfileUpdate
from ....schemas.auth import CurrentUser
from ....repositories.profile_repository import ProfileRepository
from ....services.profile_service import ProfileService

router = APIRouter()

@router.get("", response_model=UserProfile)
async def get_profile(
    current_user: CurrentUser = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Returns the synchronized profile from the local database.
    """
    repo = ProfileRepository(db)
    service = ProfileService(repo)
    profile = await service.get_profile(current_user["clerk_id"])
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User profile not synced or not found"
        )
    return profile

@router.put("", response_model=UserProfile)
async def update_profile(
    payload: UserProfileUpdate,
    current_user: CurrentUser = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Updates the synchronized profile name parameters.
    """
    repo = ProfileRepository(db)
    service = ProfileService(repo)
    profile = await service.update_profile(current_user["clerk_id"], payload.name)
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Failed to update profile. User not found."
        )
    return profile
