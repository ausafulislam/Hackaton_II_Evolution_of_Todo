# Quickstart Guide: Todo API Backend

## Environment Setup

1. Create backend directory:
   ```bash
   mkdir backend && cd backend
   ```

2. Create Python virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate virtual environment:
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On Unix/Mac:
     ```bash
     source venv/bin/activate
     ```

4. Install required dependencies:
   ```bash
   pip install fastapi uvicorn python-multipart
   ```

## Project Structure

Create the following directory and file structure:

```
backend/
├── main.py              # Main FastAPI application
├── models.py            # Pydantic models
├── data.py              # In-memory data storage
├── routers/             # API route handlers
│   └── tasks.py         # Task-related endpoints
└── requirements.txt     # Project dependencies
```

## Dependencies File

Create `requirements.txt`:
```
fastapi==0.104.1
uvicorn[standard]==0.24.0
python-multipart==0.0.6
```

## Running the Application

1. Install dependencies from requirements.txt:
   ```bash
   pip install -r requirements.txt
   ```

2. Run the application:
   ```bash
   uvicorn main:app --reload
   ```

3. The API will be available at `http://localhost:8000`

## API Testing

Once running, you can test the endpoints using curl or a tool like Postman:

- List tasks: `GET http://localhost:8000/api/user123/tasks`
- Create task: `POST http://localhost:8000/api/user123/tasks`
- Get specific task: `GET http://localhost:8000/api/user123/tasks/task123`
- Update task: `PUT http://localhost:8000/api/user123/tasks/task123`
- Delete task: `DELETE http://localhost:8000/api/user123/tasks/task123`
- Toggle completion: `PATCH http://localhost:8000/api/user123/tasks/task123/complete`