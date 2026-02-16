# from mcp.server.fastapi import Context
# from mcp.server import Server
from sqlmodel import Session, select
from database import engine
from models import Task, TaskUpdate
from datetime import datetime
import uuid
from typing import Optional

# This will be integrated into the FastAPI app or run as a standalone MCP server
# For this implementation, we'll define the tools that the agent will use.

def add_task(user_id: str, title: str, description: Optional[str] = None):
    with Session(engine) as session:
        new_task = Task(
            user_id=user_id,
            title=title,
            description=description,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        session.add(new_task)
        session.commit()
        session.refresh(new_task)
        return {"status": "success", "task": new_task.model_dump(mode='json')}

def list_tasks(user_id: str, status: Optional[str] = None):
    with Session(engine) as session:
        statement = select(Task).where(Task.user_id == user_id)
        if status == "completed":
            statement = statement.where(Task.completed == True)
        elif status == "pending":
            statement = statement.where(Task.completed == False)
        
        results = session.exec(statement).all()
        return {"status": "success", "tasks": [task.model_dump(mode='json') for task in results]}

def complete_task(user_id: str, task_id: str):
    with Session(engine) as session:
        statement = select(Task).where(Task.id == task_id, Task.user_id == user_id)
        task = session.exec(statement).first()
        if not task:
            return {"status": "error", "message": "Task not found"}
        
        task.completed = True
        task.updated_at = datetime.utcnow()
        session.add(task)
        session.commit()
        session.refresh(task)
        return {"status": "success", "task": task.model_dump(mode='json')}

def delete_task(user_id: str, task_id: str):
    with Session(engine) as session:
        statement = select(Task).where(Task.id == task_id, Task.user_id == user_id)
        task = session.exec(statement).first()
        if not task:
            return {"status": "error", "message": "Task not found"}
        
        session.delete(task)
        session.commit()
        return {"status": "success", "message": "Task deleted"}

def update_task(user_id: str, task_id: str, title: Optional[str] = None, description: Optional[str] = None):
    with Session(engine) as session:
        statement = select(Task).where(Task.id == task_id, Task.user_id == user_id)
        task = session.exec(statement).first()
        if not task:
            return {"status": "error", "message": "Task not found"}
        
        if title is not None:
            task.title = title
        if description is not None:
            task.description = description
        
        task.updated_at = datetime.utcnow()
        session.add(task)
        session.commit()
        session.refresh(task)
        return {"status": "success", "task": task.model_dump(mode='json')}
