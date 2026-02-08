from sqlmodel import create_engine, Session
import os
from pathlib import Path

# Helper to find the frontend .env file
def get_database_url():
    # Try to find .env in frontend directory
    current_dir = Path(__file__).resolve().parent
    frontend_env = current_dir.parent / "frontend" / ".env"
    
    db_url = None
    
    if frontend_env.exists():
        with open(frontend_env, "r") as f:
            for line in f:
                if line.startswith("DATABASE_URL="):
                    db_url = line.strip().split("=", 1)[1]
                    break
    
    if not db_url:
        db_url = os.environ.get("DATABASE_URL")
        
    if not db_url:
        raise ValueError("DATABASE_URL not found in environment or frontend/.env")
        
    return db_url

DATABASE_URL = get_database_url()

# Create engine
# echo=True will log SQL queries for debugging
engine = create_engine(DATABASE_URL, echo=True)

def get_session():
    with Session(engine) as session:
        yield session
