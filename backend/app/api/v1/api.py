from fastapi import APIRouter
from app.api.v1.endpoints import destinations, community

api_router = APIRouter()
api_router.include_router(destinations.router, prefix="/destinations", tags=["destinations"])
api_router.include_router(community.router, prefix="/community", tags=["community"])