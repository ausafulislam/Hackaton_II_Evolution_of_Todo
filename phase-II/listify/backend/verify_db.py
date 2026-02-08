from data import create_task, get_tasks
from models import TaskCreate
from database import engine
from sqlmodel import Session, text
import uuid
from datetime import datetime

def test_persistence():
    user_id = "test_user_" + str(uuid.uuid4())[:8]
    email = f"{user_id}@example.com"
    print(f"Testing persistence for user: {user_id}")
    
    with Session(engine) as session:
        # 1. Create a dummy user directly (since we don't have a User model in backend yet)
        print("Creating test user...")
        # Note: We use raw SQL because we intentionally didn't mirror the User table in backend models
        session.exec(
            text("INSERT INTO users (id, name, email, email_verified, created_at, updated_at) VALUES (:id, :name, :email, :verified, :now, :now)"),
            params={
                "id": user_id, 
                "name": "Test User", 
                "email": email, 
                "verified": False,
                "now": datetime.now()
            }
        )
        session.commit()

    try:
        # 2. Create a task
        print("Creating task...")
        task_input = TaskCreate(title="Persistent Task", description="This should stay in DB")
        created_task = create_task(user_id, task_input)
        print(f"Task Created: {created_task.id}")
        
        # 3. Read it back
        print("Reading tasks...")
        tasks = get_tasks(user_id)
        found = any(t.id == created_task.id for t in tasks)
        
        if found:
            print("SUCCESS: Task found in database!")
        else:
            print("FAILURE: Task not found in database.")
            
    finally:
        # Cleanup
        print("Cleaning up...")
        with Session(engine) as session:
            # Task will be deleted automatically if we delete user due to CASCADE, but let's be explicit if needed
            # But wait, our schema said onDelete: "cascade" for userId reference!
            # So just deleting user should be enough.
            session.exec(text("DELETE FROM users WHERE id = :id"), params={"id": user_id})
            session.commit()
            print("Cleanup complete.")

if __name__ == "__main__":
    try:
        test_persistence()
    except Exception as e:
        print(f"ERROR: {e}")

