from pydantic import BaseModel, EmailStr
from typing import Optional

class CurrentUser(BaseModel):
    clerk_id: str
    email: EmailStr
    name: Optional[str] = None
