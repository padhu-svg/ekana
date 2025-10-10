from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://username:password@localhost:5432/ekana_db"
    SUPABASE_URL: str = ""
    SUPABASE_KEY: str = ""
    MAPBOX_ACCESS_TOKEN: str = ""
    SECRET_KEY: str = "your-secret-key-here"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    class Config:
        env_file = ".env"

settings = Settings()