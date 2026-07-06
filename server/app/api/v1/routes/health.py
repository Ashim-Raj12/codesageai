import time
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from ....core.database import get_db
from ....core.logger import logger

router = APIRouter()
START_TIME = time.time()

@router.get("")
async def check_health(db: AsyncSession = Depends(get_db)):
    """
    Returns API runtime uptime, version, and database state connection checks.
    """
    db_state = "unhealthy"
    try:
        # Simple non-locking query check execution
        await db.execute(select(1))
        db_state = "healthy"
    except Exception as e:
        logger.error(f"Health check query exception encountered: {e}")

    return {
        "status": "healthy",
        "database": db_state,
        "version": "1.0.0",
        "uptime_seconds": int(time.time() - START_TIME)
    }
