from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.models.community import Community

router = APIRouter()

@router.get("/")
def get_community_listings(
    skip: int = 0,
    limit: int = 100,
    type: Optional[str] = None,
    district: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Community)
    if type:
        query = query.filter(Community.type == type)
    if district:
        query = query.filter(Community.district == district)
    return query.offset(skip).limit(limit).all()

@router.get("/{community_id}")
def get_community_listing(community_id: int, db: Session = Depends(get_db)):
    listing = db.query(Community).filter(Community.id == community_id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Community listing not found")
    return listing