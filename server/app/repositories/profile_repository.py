from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import Optional
from ..models.user import User

class ProfileRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_by_clerk_id(self, clerk_id: str) -> Optional[User]:
        result = await self.db.execute(select(User).filter(User.clerk_id == clerk_id))
        return result.scalars().first()

    async def create_user(self, clerk_id: str, email: str, name: Optional[str] = None) -> User:
        user = User(clerk_id=clerk_id, email=email, name=name)
        self.db.add(user)
        await self.db.commit()
        await self.db.refresh(user)
        return user

    async def update_profile(self, clerk_id: str, name: Optional[str] = None) -> Optional[User]:
        user = await self.get_by_clerk_id(clerk_id)
        if user:
            if name is not None:
                user.name = name
            await self.db.commit()
            await self.db.refresh(user)
        return user
