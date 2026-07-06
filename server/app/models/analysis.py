import uuid
from sqlalchemy import Column, String, Integer, Text, ForeignKey, JSON, DateTime
from sqlalchemy.sql import func
from ..core.database import Base

class Analysis(Base):
    __tablename__ = "analyses"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    user_id = Column(String, ForeignKey("users.clerk_id", ondelete="CASCADE"), nullable=False)
    code = Column(Text, nullable=False)
    language = Column(String, nullable=False)
    score = Column(Integer, nullable=False)
    summary = Column(Text, nullable=False)
    explanation = Column(Text, nullable=False)
    raw_report = Column(JSON, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
