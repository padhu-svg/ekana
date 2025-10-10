from pydantic import BaseModel
from typing import List, Optional

class DestinationBase(BaseModel):
    name: str
    category: str
    district: str
    description: str
    images: List[str] = []
    lat: float
    lng: float
    tags: List[str] = []
    best_time: Optional[str] = None

class DestinationCreate(DestinationBase):
    pass

class Destination(DestinationBase):
    id: int
    created_at: Optional[str] = None
    
    class Config:
        from_attributes = True