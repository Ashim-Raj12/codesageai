from typing import List
from ..repositories.history_repository import HistoryRepository
from ..models.analysis import Analysis

class HistoryService:
    def __init__(self, repo: HistoryRepository):
        self.repo = repo

    async def get_user_history(self, user_id: str) -> List[Analysis]:
        return await self.repo.get_user_history(user_id)

    async def delete_history_item(self, item_id: str, user_id: str) -> bool:
        return await self.repo.delete_history_item(item_id, user_id)
