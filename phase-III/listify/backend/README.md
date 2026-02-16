# Listify Backend API

This is a FastAPI-based backend application for the Listify todo application. It provides a robust API for managing tasks with user authentication and secure data storage.

## Features

- REST-style endpoints for todo task management
- PostgreSQL database integration with SQLModel
- Full CRUD operations for tasks
- Task completion toggling
- User-specific task management
- CORS enabled for frontend integration
- Secure database operations

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

2. Set up environment variables (ensure DATABASE_URL is configured)

3. Run the application:
   ```bash
   uvicorn main:app --reload
   ```

4. The API will be available at `http://localhost:8000`

## Database Configuration

This backend connects to a PostgreSQL database. The connection string is retrieved from the frontend's .env file or environment variables. Make sure to set up your DATABASE_URL appropriately.

## CORS Configuration

This backend is configured with CORS middleware to allow cross-origin requests from frontend applications. By default, it allows all origins for development purposes. In production, the origins should be restricted to specific domains.

## Testing

Run the test script to verify all functionality:
```bash
python verify_endpoints.py
```