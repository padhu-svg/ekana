from sqlalchemy import Column, Integer, String, Text, Float, ARRAY
from app.core.database import Base

class Community(Base):
    __tablename__ = "community"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    type = Column(String, index=True)
    contact = Column(String)
    district = Column(String, index=True)
    description = Column(Text)
    images = Column(ARRAY(String))
    lat = Column(Float)
    lng = Column(Float)
    email = Column(String)
    phone = Column(String)
    created_at = Column(String)