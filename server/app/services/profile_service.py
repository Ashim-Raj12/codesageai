from typing import Optional
from ..repositories.profile_repository import ProfileRepository
from ..models.user import User

class ProfileService:
    def __init__(self, repo: ProfileRepository):
        self.repo = repo

    async def get_profile(self, clerk_id: str) -> Optional[User]:
        return await self.repo.get_by_clerk_id(clerk_id)

    async def update_profile(self, clerk_id: str, name: Optional[str] = None) -> Optional[User]:
        return await self.repo.update_profile(clerk_id, name)
