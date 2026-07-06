from fastapi import APIRouter, Depends
from ....core.dependencies import get_current_user
from ....schemas.auth import CurrentUser

router = APIRouter()

@router.get("/me", response_model=CurrentUser)
async def check_session(current_user: CurrentUser = Depends(get_current_user)):
    """
    Validates token payloads, returns decoded Clerk session variables.
    """
    return current_user
