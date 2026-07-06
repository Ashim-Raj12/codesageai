from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from ....core.database import get_db
from ....core.dependencies import get_current_user
from ....schemas.analysis import AnalysisRequest, AnalysisResponse
from ....schemas.auth import CurrentUser
from ....repositories.analysis_repository import AnalysisRepository
from ....services.analysis_service import AnalysisService

router = APIRouter()

@router.post("", response_model=AnalysisResponse, status_code=status.HTTP_201_CREATED)
async def create_analysis(
    payload: AnalysisRequest,
    current_user: CurrentUser = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Submits raw code blocks to the AI compiler logic scans.
    """
    repo = AnalysisRepository(db)
    service = AnalysisService(repo)
    try:
        analysis = await service.execute_code_review(
            user_id=current_user["clerk_id"],
            code=payload.code,
            language=payload.language
        )
        return analysis
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.get("/{analysis_id}", response_model=AnalysisResponse)
async def get_analysis(
    analysis_id: str,
    current_user: CurrentUser = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Retrieves a single past analysis from database.
    """
    repo = AnalysisRepository(db)
    analysis = await repo.get_by_id(analysis_id)
    if not analysis or analysis.user_id != current_user["clerk_id"]:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analysis not found or access denied"
        )
    return analysis
