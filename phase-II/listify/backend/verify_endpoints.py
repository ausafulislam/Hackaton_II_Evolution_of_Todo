from fastapi.testclient import TestClient
from main import app
from sqlmodel import Session, text
from database import engine
import uuid
from datetime import datetime

client = TestClient(app)

def create_test_user(user_id):
    """Helper to create a test user via raw SQL since we don't have user endpoints in backend"""
    with Session(engine) as session:
        email = f"{user_id}@example.com"
        session.exec(
            text("INSERT INTO users (id, name, email, email_verified, created_at, updated_at) VALUES (:id, :name, :email, :verified, :now, :now) ON CONFLICT (id) DO NOTHING"),
            params={
                "id": user_id, 
                "name": "API Test User", 
                "email": email, 
                "verified": False,
                "now": datetime.now()
            }
        )
        session.commit()

def test_api_flow():
    user1_id = "api_user_" + str(uuid.uuid4())[:8]
    user2_id = "api_user_" + str(uuid.uuid4())[:8]
    
    print(f"Creating test users: {user1_id}, {user2_id}")
    create_test_user(user1_id)
    create_test_user(user2_id)

    # 1. Create Task for User 1
    print("\n[Test 1] Create Task for User 1 being tested...")
    response = client.post(
        f"/api/{user1_id}/tasks",
        json={"title": "User 1 Task", "description": "Secret Task"}
    )
    assert response.status_code == 201
    task1 = response.json()
    print(f"Success. Task ID: {task1['id']}")

    # 2. Verify User 2 cannot see it
    print("\n[Test 2] Verify User 2 Isolation...")
    response = client.get(f"/api/{user2_id}/tasks")
    assert response.status_code == 200
    tasks_u2 = response.json()
    assert len(tasks_u2) == 0
    print("Success. User 2 has 0 tasks.")

    # 3. Verify User 1 can see it
    print("\n[Test 3] Verify User 1 Retrieval...")
    response = client.get(f"/api/{user1_id}/tasks")
    assert response.status_code == 200
    tasks_u1 = response.json()
    assert len(tasks_u1) == 1
    assert tasks_u1[0]['id'] == task1['id']
    print("Success. User 1 retrieved their task.")
    
    # 4. Cleanup
    print("\n[Cleanup]")
    with Session(engine) as session:
        session.exec(text("DELETE FROM users WHERE id IN (:u1, :u2)"), params={"u1": user1_id, "u2": user2_id})
        session.commit()
    print("Cleanup complete.")

if __name__ == "__main__":
    try:
        test_api_flow()
        print("\n\nALL API TESTS PASSED! ✅")
    except AssertionError as e:
        print(f"\n\nTEST FAILED ❌: {e}")
    except Exception as e:
        print(f"\n\nERROR ❌: {e}")
