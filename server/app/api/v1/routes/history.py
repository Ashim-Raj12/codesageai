from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from ....core.database import get_db
from ....core.dependencies import get_current_user
from ....schemas.analysis import HistorySummary
from ....schemas.auth import CurrentUser
from ....repositories.history_repository import HistoryRepository
from ....services.history_service import HistoryService

router = APIRouter()

@router.get("", response_model=List[HistorySummary])
async def get_history(
    current_user: CurrentUser = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Returns list summaries of all code scans compiled by the user.
    """
    repo = HistoryRepository(db)
    service = HistoryService(repo)
    return await service.get_user_history(current_user["clerk_id"])

@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_history_item(
    item_id: str,
    current_user: CurrentUser = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Deletes a single scan log from history.
    """
    repo = HistoryRepository(db)
    service = HistoryService(repo)
    success = await service.delete_history_item(item_id, current_user["clerk_id"])
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="History item not found or access denied"
        )
    return
