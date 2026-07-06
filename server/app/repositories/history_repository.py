from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List, Optional
from ..models.analysis import Analysis

class HistoryRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_user_history(self, user_id: str, limit: int = 50) -> List[Analysis]:
        """
        Retrieves user historical scans ordered by creation date.
        """
        result = await self.db.execute(
            select(Analysis)
            .filter(Analysis.user_id == user_id)
            .order_by(Analysis.created_at.desc())
            .limit(limit)
        )
        return list(result.scalars().all())

    async def delete_history_item(self, item_id: str, user_id: str) -> bool:
        """
        Deletes a single analysis log.
        """
        result = await self.db.execute(
            select(Analysis).filter(Analysis.id == item_id, Analysis.user_id == user_id)
        )
        item = result.scalars().first()
        if item:
            await self.db.delete(item)
            await self.db.commit()
            return True
        return False
