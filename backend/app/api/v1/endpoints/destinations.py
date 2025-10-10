from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.models.destination import Destination
from app.schemas.destination import Destination as DestinationSchema, DestinationCreate

router = APIRouter()

@router.get("/", response_model=List[DestinationSchema])
def get_destinations(
    skip: int = 0,
    limit: int = 100,
    category: Optional[str] = None,
    district: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Destination)
    if category:
        query = query.filter(Destination.category == category)
    if district:
        query = query.filter(Destination.district == district)
    return query.offset(skip).limit(limit).all()

@router.get("/{destination_id}", response_model=DestinationSchema)
def get_destination(destination_id: int, db: Session = Depends(get_db)):
    destination = db.query(Destination).filter(Destination.id == destination_id).first()
    if not destination:
        raise HTTPException(status_code=404, detail="Destination not found")
    return destination

@router.post("/", response_model=DestinationSchema)
def create_destination(destination: DestinationCreate, db: Session = Depends(get_db)):
    db_destination = Destination(**destination.dict())
    db.add(db_destination)
    db.commit()
    db.refresh(db_destination)
    return db_destination