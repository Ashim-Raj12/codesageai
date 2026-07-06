from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import Optional, List, Dict, Any
from ..models.analysis import Analysis

class AnalysisRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create_analysis(
        self,
        user_id: str,
        code: str,
        language: str,
        score: int,
        summary: str,
        explanation: str,
        raw_report: Dict[str, Any]
    ) -> Analysis:
        analysis = Analysis(
            user_id=user_id,
            code=code,
            language=language,
            score=score,
            summary=summary,
            explanation=explanation,
            raw_report=raw_report
        )
        self.db.add(analysis)
        await self.db.commit()
        await self.db.refresh(analysis)
        return analysis

    async def get_by_id(self, analysis_id: str) -> Optional[Analysis]:
        result = await self.db.execute(select(Analysis).filter(Analysis.id == analysis_id))
        return result.scalars().first()

    async def get_by_user(self, user_id: str) -> List[Analysis]:
        result = await self.db.execute(
            select(Analysis)
            .filter(Analysis.user_id == user_id)
            .order_by(Analysis.created_at.desc())
        )
        return list(result.scalars().all())

    async def delete_analysis(self, analysis_id: str, user_id: str) -> bool:
        analysis = await self.get_by_id(analysis_id)
        if analysis and analysis.user_id == user_id:
            await self.db.delete(analysis)
            await self.db.commit()
            return True
        return False
