from pydantic import BaseModel, Field
from typing import Dict, Any
from datetime import datetime

class ReportCreate(BaseModel):
    title: str = Field(..., description="Report title name.")
    content: Dict[str, Any] = Field(..., description="Report payload summary data.")

class ReportResponse(BaseModel):
    id: str
    user_id: str
    title: str
    content: Dict[str, Any]
    created_at: datetime

    class Config:
        from_attributes = True
