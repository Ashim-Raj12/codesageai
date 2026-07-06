from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from ....core.database import get_db
from ....core.dependencies import get_current_user
from ....schemas.report import ReportCreate, ReportResponse
from ....schemas.auth import CurrentUser
from ....repositories.report_repository import ReportRepository
from ....services.report_service import ReportService

router = APIRouter()

@router.get("", response_model=List[ReportResponse])
async def get_reports(
    current_user: CurrentUser = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Returns list summaries of all saved report templates.
    """
    repo = ReportRepository(db)
    service = ReportService(repo)
    return await service.get_user_reports(current_user["clerk_id"])

@router.post("", response_model=ReportResponse, status_code=status.HTTP_201_CREATED)
async def save_report(
    payload: ReportCreate,
    current_user: CurrentUser = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Saves a report template structure in database.
    """
    repo = ReportRepository(db)
    service = ReportService(repo)
    return await service.create_report(
        user_id=current_user["clerk_id"],
        title=payload.title,
        content=payload.content
    )

@router.delete("/{report_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_report(
    report_id: str,
    current_user: CurrentUser = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Deletes a saved report.
    """
    repo = ReportRepository(db)
    service = ReportService(repo)
    success = await service.delete_report(report_id, current_user["clerk_id"])
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Report not found or access denied"
        )
    return
