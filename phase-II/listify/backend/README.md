# Todo API Backend (Phase II)

This is a FastAPI-based backend application for the Todo API (Phase II) as part of the Evolution of Todo project.

## Features

- REST-style endpoints for todo task management
- In-memory data storage (runtime only)
- Full CRUD operations for tasks
- Task completion toggling
- CORS enabled for frontend integration
- No authentication required (Phase II specification)

## Endpoints

- `GET /api/{user_id}/tasks` - Retrieve all tasks for a user
- `POST /api/{user_id}/tasks` - Create a new task for a user
- `GET /api/{user_id}/tasks/{id}` - Retrieve a specific task
- `PUT /api/{user_id}/tasks/{id}` - Update a specific task
- `DELETE /api/{user_id}/tasks/{id}` - Delete a specific task
- `PATCH /api/{user_id}/tasks/{id}/complete` - Toggle completion status

## Running the Application

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Run the application:
   ```bash
   uvicorn main:app --reload
   ```

3. The API will be available at `http://localhost:8000`

## CORS Configuration

This backend is configured with CORS middleware to allow cross-origin requests from frontend applications. By default, it allows all origins for development purposes. In production, the origins should be restricted to specific domains.

## Testing

Run the test script to verify all functionality:
```bash
python test_app.py
```