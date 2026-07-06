from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List, Optional, Dict, Any
from ..models.report import Report

class ReportRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_by_id(self, report_id: str) -> Optional[Report]:
        result = await self.db.execute(select(Report).filter(Report.id == report_id))
        return result.scalars().first()

    async def get_by_user(self, user_id: str) -> List[Report]:
        result = await self.db.execute(
            select(Report)
            .filter(Report.user_id == user_id)
            .order_by(Report.created_at.desc())
        )
        return list(result.scalars().all())

    async def create_report(self, user_id: str, title: str, content: Dict[str, Any]) -> Report:
        report = Report(user_id=user_id, title=title, content=content)
        self.db.add(report)
        await self.db.commit()
        await self.db.refresh(report)
        return report

    async def delete_report(self, report_id: str, user_id: str) -> bool:
        report = await self.get_by_id(report_id)
        if report and report.user_id == user_id:
            await self.db.delete(report)
            await self.db.commit()
            return True
        return False
