from pydantic import BaseModel, Field
from typing import Dict, Any, List, Optional
from datetime import datetime

class AnalysisRequest(BaseModel):
    code: str = Field(..., description="Raw code block input to scan.")
    language: str = Field(..., description="Programming language key context (e.g. python, typescript).")

class AnalysisResponse(BaseModel):
    id: str
    user_id: str
    code: str
    language: str
    score: int
    summary: str
    explanation: str
    raw_report: Dict[str, Any]
    created_at: datetime

    class Config:
        from_attributes = True

class HistorySummary(BaseModel):
    id: str
    language: str
    score: int
    summary: str
    created_at: datetime

    class Config:
        from_attributes = True
