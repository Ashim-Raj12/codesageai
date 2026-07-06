from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from ....core.database import get_db
from ....core.dependencies import get_current_user
from ....schemas.chat import ChatRequest, ChatResponse
from ....schemas.auth import CurrentUser
from ....repositories.chat_repository import ChatRepository
from ....services.chat_service import ChatService

router = APIRouter()

@router.post("", response_model=ChatResponse, status_code=status.HTTP_201_CREATED)
async def ask_assistant(
    payload: ChatRequest,
    current_user: CurrentUser = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Submits user queries to fallback AI models to generate response streams.
    """
    repo = ChatRepository(db)
    service = ChatService(repo)
    try:
        chat = await service.converse_with_ai(
            user_id=current_user["clerk_id"],
            query=payload.query,
            language=payload.language
        )
        return chat
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
