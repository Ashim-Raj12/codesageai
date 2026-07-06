from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from ..core.config import settings

def setup_cors_middleware(app: FastAPI) -> None:
    """
    Registers CORS middleware with the FastAPI application instance.
    """
    origins = [settings.FRONTEND_URL]
    
    # Fallback to local Vite server
    if "http://localhost:5173" not in origins:
        origins.append("http://localhost:5173")

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
