from sqlmodel import SQLModel
from database import engine
import models # Import models to ensure they are registered with SQLModel

def init_db():
    print("Creating database tables...")
    SQLModel.metadata.create_all(engine)
    print("Tables created successfully.")

if __name__ == "__main__":
    init_db()
