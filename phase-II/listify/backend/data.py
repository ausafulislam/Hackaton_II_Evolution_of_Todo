from typing import Dict, List, Optional
from models import Task, TaskCreate, TaskUpdate
import uuid
from datetime import datetime

# In-memory storage
tasks_storage: Dict[str, Task] = {}
user_tasks: Dict[str, List[str]] = {}

def create_task(user_id: str, task_create: TaskCreate) -> Task:
    """Create a new task for a user."""
    task_id = str(uuid.uuid4())

    task = Task(
        id=task_id,
        user_id=user_id,
        title=task_create.title,
        description=task_create.description,
        completed=task_create.completed,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    tasks_storage[task_id] = task

    # Add task ID to user's task list
    if user_id not in user_tasks:
        user_tasks[user_id] = []
    user_tasks[user_id].append(task_id)

    return task

def get_tasks(user_id: str) -> List[Task]:
    """Get all tasks for a user."""
    if user_id not in user_tasks:
        return []

    user_task_ids = user_tasks[user_id]
    user_tasks_list = []

    for task_id in user_task_ids:
        if task_id in tasks_storage:
            user_tasks_list.append(tasks_storage[task_id])

    return user_tasks_list

def get_task(user_id: str, task_id: str) -> Optional[Task]:
    """Get a specific task by ID for a user."""
    if user_id not in user_tasks:
        return None

    if task_id not in tasks_storage:
        return None

    task = tasks_storage[task_id]
    if task.user_id != user_id:
        return None

    return task

def update_task(user_id: str, task_id: str, task_update: TaskUpdate) -> Optional[Task]:
    """Update a specific task for a user."""
    if user_id not in user_tasks:
        return None

    if task_id not in tasks_storage:
        return None

    task = tasks_storage[task_id]
    if task.user_id != user_id:
        return None

    # Update task fields based on the update model
    update_data = task_update.dict(exclude_unset=True)

    for field, value in update_data.items():
        setattr(task, field, value)

    # Update the updated_at timestamp
    task.updated_at = datetime.now()

    # Save the updated task
    tasks_storage[task_id] = task

    return task

def delete_task(user_id: str, task_id: str) -> bool:
    """Delete a specific task for a user."""
    if user_id not in user_tasks:
        return False

    if task_id not in tasks_storage:
        return False

    task = tasks_storage[task_id]
    if task.user_id != user_id:
        return False

    # Remove task from user's task list
    if user_id in user_tasks:
        if task_id in user_tasks[user_id]:
            user_tasks[user_id].remove(task_id)

    # Remove task from storage
    del tasks_storage[task_id]

    return True

def toggle_completion(user_id: str, task_id: str) -> Optional[Task]:
    """Toggle the completion status of a task for a user."""
    if user_id not in user_tasks:
        return None

    if task_id not in tasks_storage:
        return None

    task = tasks_storage[task_id]
    if task.user_id != user_id:
        return None

    # Toggle completion status
    task.completed = not task.completed
    task.updated_at = datetime.now()

    # Save the updated task
    tasks_storage[task_id] = task

    return task