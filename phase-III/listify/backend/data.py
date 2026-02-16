from typing import List, Optional
from sqlmodel import Session, select
from models import Task, TaskCreate, TaskUpdate
import uuid
from datetime import datetime
from database import engine

def create_task(user_id: str, task_create: TaskCreate) -> Task:
    """Create a new task for a user."""
    task_id = str(uuid.uuid4())
    current_time = datetime.now()

    task = Task(
        id=task_id,
        user_id=user_id,
        title=task_create.title,
        description=task_create.description,
        completed=task_create.completed,
        created_at=current_time,
        updated_at=current_time
    )

    with Session(engine) as session:
        session.add(task)
        session.commit()
        session.refresh(task)

    return task

def get_tasks(user_id: str) -> List[Task]:
    """Get all tasks for a user."""
    with Session(engine) as session:
        statement = select(Task).where(Task.user_id == user_id)
        results = session.exec(statement)
        return list(results.all())

def get_task(user_id: str, task_id: str) -> Optional[Task]:
    """Get a specific task by ID for a user."""
    with Session(engine) as session:
        task = session.get(Task, task_id)
        if not task or task.user_id != user_id:
            return None
        return task

def update_task(user_id: str, task_id: str, task_update: TaskUpdate) -> Optional[Task]:
    """Update a specific task for a user."""
    with Session(engine) as session:
        task = session.get(Task, task_id)
        
        if not task or task.user_id != user_id:
            return None
        
        # Update task fields based on the update model
        update_data = task_update.dict(exclude_unset=True)
        
        for field, value in update_data.items():
            setattr(task, field, value)
            
        task.updated_at = datetime.now()
        
        session.add(task)
        session.commit()
        session.refresh(task)
        return task

def delete_task(user_id: str, task_id: str) -> bool:
    """Delete a specific task for a user."""
    with Session(engine) as session:
        task = session.get(Task, task_id)
        
        if not task or task.user_id != user_id:
            return False
            
        session.delete(task)
        session.commit()
        return True

def toggle_completion(user_id: str, task_id: str) -> Optional[Task]:
    """Toggle the completion status of a task for a user."""
    with Session(engine) as session:
        task = session.get(Task, task_id)
        
        if not task or task.user_id != user_id:
            return None
            
        task.completed = not task.completed
        task.updated_at = datetime.now()
        
        session.add(task)
        session.commit()
        session.refresh(task)
        return task