from sqlalchemy import Column, Integer, String, Text, Float, ARRAY
from app.core.database import Base

class Destination(Base):
    __tablename__ = "destinations"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    category = Column(String, index=True)
    district = Column(String, index=True)
    description = Column(Text)
    images = Column(ARRAY(String))
    lat = Column(Float)
    lng = Column(Float)
    tags = Column(ARRAY(String))
    best_time = Column(String)
    created_at = Column(String)