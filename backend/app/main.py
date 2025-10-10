from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="EKaNa API",
    description="Experience Karnataka Naturally - Tourism Platform API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "EKaNa API - Experience Karnataka Naturally"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/api/v1/destinations")
async def get_destinations():
    return [
        {
            "id": 1,
            "name": "Hampi",
            "category": "Heritage",
            "district": "Hampi",
            "description": "Ancient ruins and temples showcasing Vijayanagara Empire",
            "images": ["https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500"],
            "best_time": "Oct-Mar",
            "tags": ["UNESCO", "History", "Architecture"]
        },
        {
            "id": 2,
            "name": "Coorg",
            "category": "Hills",
            "district": "Coorg",
            "description": "Coffee plantations and misty hills perfect for nature lovers",
            "images": ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500"],
            "best_time": "Oct-May",
            "tags": ["Coffee", "Hills", "Nature"]
        }
    ]

@app.get("/api/v1/community")
async def get_community():
    return [
        {
            "id": 1,
            "name": "Ravi's Homestay",
            "type": "Homestay",
            "district": "Coorg",
            "description": "Traditional Kodava homestay with authentic local cuisine",
            "images": ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500"],
            "phone": "+91 98765 43210",
            "email": "ravi@homestay.com"
        }
    ]