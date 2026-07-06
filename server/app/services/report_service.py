from typing import List, Dict, Any
from ..repositories.report_repository import ReportRepository
from ..models.report import Report

class ReportService:
    def __init__(self, repo: ReportRepository):
        self.repo = repo

    async def get_user_reports(self, user_id: str) -> List[Report]:
        return await self.repo.get_by_user(user_id)

    async def create_report(self, user_id: str, title: str, content: Dict[str, Any]) -> Report:
        return await self.repo.create_report(user_id, title, content)

    async def delete_report(self, report_id: str, user_id: str) -> bool:
        return await self.repo.delete_report(report_id, user_id)
