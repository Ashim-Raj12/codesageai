from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from ..models.chat import Chat

class ChatRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_by_user(self, user_id: str, limit: int = 30) -> List[Chat]:
        result = await self.db.execute(
            select(Chat)
            .filter(Chat.user_id == user_id)
            .order_by(Chat.created_at.asc())
            .limit(limit)
        )
        return list(result.scalars().all())

    async def create_chat(self, user_id: str, query: str, response: str, language: str) -> Chat:
        chat = Chat(user_id=user_id, query=query, response=response, language=language)
        self.db.add(chat)
        await self.db.commit()
        await self.db.refresh(chat)
        return chat
