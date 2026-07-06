from pydantic import BaseModel, Field
from datetime import datetime

class ChatRequest(BaseModel):
    query: str = Field(..., description="Developer inquiry question.")
    language: str = Field("typescript", description="Language environment key.")

class ChatResponse(BaseModel):
    id: str
    user_id: str
    query: str
    response: str
    language: str
    created_at: datetime

    class Config:
        from_attributes = True
