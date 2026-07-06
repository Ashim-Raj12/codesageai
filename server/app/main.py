from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from sqlalchemy.exc import SQLAlchemyError

from .core.config import settings
from .core.logger import logger
from .core.database import engine, Base

# Route routers
from .api.v1.routes.health import router as health_router
from .api.v1.routes.auth import router as auth_router
from .api.v1.routes.profile import router as profile_router
from .api.v1.routes.analysis import router as analysis_router
from .api.v1.routes.history import router as history_router
from .api.v1.routes.reports import router as reports_router
from .api.v1.routes.chat import router as chat_router

# Middlewares
from .middleware.cors import setup_cors_middleware
from .middleware.logging import RequestLoggingMiddleware
from .middleware.auth import AuthStateMiddleware

app = FastAPI(
    title="CodeSage AI Backend",
    description="Scalable, production-ready backend API managing code reviews, history, profiles and chat log triggers.",
    version="1.0.0"
)

# Setup CORS
setup_cors_middleware(app)

# Register custom logging and auth middlewares
app.add_middleware(RequestLoggingMiddleware)
app.add_middleware(AuthStateMiddleware)

# Initialize database schemas dynamically on startup (Supabase context)
@app.on_event("startup")
async def startup_event():
    logger.info("Initializing database tables...")
    try:
        async with engine.begin() as conn:
            # Create all tables dynamically
            await conn.run_sync(Base.metadata.create_all)
        logger.info("Database tables initialized successfully.")
    except Exception as e:
        logger.error(f"Database initialization failed: {e}")

# Global Validation Error Handler
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    logger.error(f"Request validation exception: {exc.errors()}")
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"detail": "Request payload validation failed", "errors": exc.errors()}
    )

# Global Database Error Handler
@app.exception_handler(SQLAlchemyError)
async def database_exception_handler(request: Request, exc: SQLAlchemyError):
    logger.error(f"Database engine exception: {str(exc)}")
    return JSONResponse(
        status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
        content={"detail": "Database service is temporarily unavailable"}
    )

# Global Catch-all Exception Handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global exception intercepted: {str(exc)}")
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "An unexpected server error occurred"}
    )

# Mount V1 Routing namespaces
app.include_router(health_router, prefix="/api/v1/health", tags=["Health"])
app.include_router(auth_router, prefix="/api/v1/auth", tags=["Auth"])
app.include_router(profile_router, prefix="/api/v1/profile", tags=["Profile"])
app.include_router(analysis_router, prefix="/api/v1/analysis", tags=["Analysis"])
app.include_router(history_router, prefix="/api/v1/history", tags=["History"])
app.include_router(reports_router, prefix="/api/v1/reports", tags=["Reports"])
app.include_router(chat_router, prefix="/api/v1/chat", tags=["Chat"])

@app.get("/")
def root():
    return {"message": "CodeSage AI Backend API v1 Running 🚀"}
