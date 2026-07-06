import uuid
from sqlalchemy import Column, String, ForeignKey, JSON, DateTime
from sqlalchemy.sql import func
from ..core.database import Base

class Report(Base):
    __tablename__ = "reports"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    user_id = Column(String, ForeignKey("users.clerk_id", ondelete="CASCADE"), nullable=False)
    title = Column(String, nullable=False)
    content = Column(JSON, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
