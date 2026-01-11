"""
Test script to verify that the Todo API Backend (Phase II) works correctly.
This script tests all the required endpoints to ensure they function as specified.
"""

import asyncio
import json
from datetime import datetime
from fastapi.testclient import TestClient
from main import app

# Create a test client
client = TestClient(app)

def test_endpoints():
    print("Testing Todo API Backend (Phase II)...")

    # Test user ID for our tests
    test_user_id = "test_user_123"

    print(f"\n1. Testing GET /api/{test_user_id}/tasks (should return empty list)")
    response = client.get(f"/api/{test_user_id}/tasks")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    assert response.status_code == 200
    assert response.json() == []
    print("PASSED: Empty task list returned correctly\n")

    print("2. Testing POST /api/{test_user_id}/tasks (creating a new task)")
    task_data = {
        "title": "Test Task 1",
        "description": "This is a test task",
        "completed": False
    }
    response = client.post(f"/api/{test_user_id}/tasks", json=task_data)
    print(f"Status: {response.status_code}")
    created_task = response.json()
    print(f"Created task: {created_task}")
    assert response.status_code == 201
    assert created_task['title'] == "Test Task 1"
    assert created_task['user_id'] == test_user_id
    assert 'id' in created_task
    task_id = created_task['id']
    print("OK PASSED: Task created successfully\n")

    print("3. Testing GET /api/{test_user_id}/tasks/{id} (getting specific task)")
    response = client.get(f"/api/{test_user_id}/tasks/{task_id}")
    print(f"Status: {response.status_code}")
    retrieved_task = response.json()
    print(f"Retrieved task: {retrieved_task}")
    assert response.status_code == 200
    assert retrieved_task['id'] == task_id
    assert retrieved_task['title'] == "Test Task 1"
    print("OK PASSED: Specific task retrieved successfully\n")

    print("4. Testing GET /api/{test_user_id}/tasks (should return one task now)")
    response = client.get(f"/api/{test_user_id}/tasks")
    print(f"Status: {response.status_code}")
    tasks = response.json()
    print(f"Task list: {tasks}")
    assert response.status_code == 200
    assert len(tasks) == 1
    assert tasks[0]['id'] == task_id
    print("OK PASSED: Task list now contains one task\n")

    print("5. Testing PUT /api/{test_user_id}/tasks/{id} (updating task)")
    update_data = {
        "title": "Updated Test Task 1",
        "description": "This is an updated test task",
        "completed": True
    }
    response = client.put(f"/api/{test_user_id}/tasks/{task_id}", json=update_data)
    print(f"Status: {response.status_code}")
    updated_task = response.json()
    print(f"Updated task: {updated_task}")
    assert response.status_code == 200
    assert updated_task['title'] == "Updated Test Task 1"
    assert updated_task['completed'] == True
    print("OK PASSED: Task updated successfully\n")

    print("6. Testing PATCH /api/{test_user_id}/tasks/{id}/complete (toggling completion)")
    response = client.patch(f"/api/{test_user_id}/tasks/{task_id}/complete")
    print(f"Status: {response.status_code}")
    toggled_task = response.json()
    print(f"Toggled task: {toggled_task}")
    assert response.status_code == 200
    assert toggled_task['completed'] == False  # Should be toggled back to False
    print("OK PASSED: Completion status toggled successfully\n")

    print("7. Testing DELETE /api/{test_user_id}/tasks/{id} (deleting task)")
    response = client.delete(f"/api/{test_user_id}/tasks/{task_id}")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    assert response.status_code == 200  # Our implementation returns a success message
    print("OK PASSED: Task deleted successfully\n")

    print("8. Testing GET /api/{test_user_id}/tasks (should return empty list again)")
    response = client.get(f"/api/{test_user_id}/tasks")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    assert response.status_code == 200
    assert response.json() == []
    print("OK PASSED: Task list is empty again\n")

    print("9. Testing error case - getting non-existent task")
    response = client.get(f"/api/{test_user_id}/tasks/non_existent_id")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    assert response.status_code == 404
    print("OK PASSED: 404 error returned for non-existent task\n")

    print("10. Testing error case - updating non-existent task")
    response = client.put(f"/api/{test_user_id}/tasks/non_existent_id", json={"title": "test"})
    print(f"Status: {response.status_code}")
    assert response.status_code == 404
    print("OK PASSED: 404 error returned for non-existent task update\n")

    print("SUCCESS: All tests passed! The Todo API Backend (Phase II) is working correctly.")
    print("\nImplemented endpoints:")
    print("- GET /api/{user_id}/tasks (list all tasks)")
    print("- POST /api/{user_id}/tasks (create new task)")
    print("- GET /api/{user_id}/tasks/{id} (get specific task)")
    print("- PUT /api/{user_id}/tasks/{id} (update task)")
    print("- DELETE /api/{user_id}/tasks/{id} (delete task)")
    print("- PATCH /api/{user_id}/tasks/{id}/complete (toggle completion)")

if __name__ == "__main__":
    test_endpoints()