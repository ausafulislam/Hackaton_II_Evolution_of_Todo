---
name: fastapi-setup
description: Setup FastAPI backend with Python, environment variables, and basic project structure. Use this Skill to start backend development for APIs, do all work in `/backend`.
---

# FastAPI Setup and Usage

## Instructions

This Skill guides you to:

1. Install FastAPI and dependencies.
2. Setup project structure.
3. Use environment variables.
4. Run a development server.

---

## 1. Install Dependencies

Use pip to install FastAPI and Uvicorn:

```bash
pip install fastapi uvicorn python-dotenv
```

---

## 2. Project Structure

Recommended structure:

```
backend/
├── app/
│   ├── main.py
│   ├── routes/
│   │   └── example.py
│   ├── models/
│   │   └── example_model.py
│   └── utils/
│       └── helpers.py
├── .env
├── requirements.txt
└── README.md
```

---

## 3. Environment Variables

Create a `.env` file in `backend/`:

```
API_KEY="your-api-key"
DATABASE_URL="sqlite:///./test.db"
SECRET_KEY="supersecretkey"
DEBUG=True
```

Load `.env` in FastAPI using Pydantic:

```python
from pydantic import BaseSettings
from fastapi import FastAPI

class Settings(BaseSettings):
    api_key: str
    database_url: str
    secret_key: str
    debug: bool

    class Config:
        env_file = ".env"

settings = Settings()
app = FastAPI()
```

---

## 4. Basic FastAPI App

Create `app/main.py`:

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "FastAPI backend is running!"}
```

---

## 5. Running the Server

Run development server with Uvicorn:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Visit `http://localhost:8000` to see your backend running.

---

## 6. Best Practices

1. Keep secrets in `.env`.
2. Use `.gitignore` to avoid committing `.env`:

```
.env
__pycache__/
*.pyc
venv/
```

3. Separate routes, models, and utils for clarity.
4. Use `requirements.txt` or `pip freeze > requirements.txt` to manage dependencies.
5. Reload server automatically during development using `--reload`.

---

## 7. Example Route

```python
from fastapi import APIRouter

router = APIRouter()

@router.get("/hello")
def hello():
    return {"message": "Hello from FastAPI!"}
```

Include in `main.py`:

```python
from fastapi import FastAPI
from app.routes.example import router

app = FastAPI()
app.include_router(router)
```
