from fastapi import APIRouter, HTTPException, Path, Body
from typing import List
from models import Task, TaskCreate, TaskUpdate
from data import (
    get_tasks as data_get_tasks,
    create_task as data_create_task,
    get_task as data_get_task,
    update_task as data_update_task,
    delete_task as data_delete_task,
    toggle_completion as data_toggle_completion
)

router = APIRouter(tags=["tasks"])

@router.get("/tasks", response_model=List[Task])
async def get_tasks(user_id: str = Path(..., description="User ID")):
    """
    Retrieve all tasks for a specific user.
    """
    tasks = data_get_tasks(user_id)
    return tasks


@router.post("/tasks", response_model=Task, status_code=201)
async def create_task(
    task_create: TaskCreate = Body(..., description="Task data"),
    user_id: str = Path(..., description="User ID")
):
    """
    Create a new task for a specific user.
    """
    # Validate required fields
    if not task_create.title or task_create.title.strip() == "":
        raise HTTPException(status_code=400, detail="Title is required")

    task = data_create_task(user_id, task_create)
    return task


@router.get("/tasks/{id}", response_model=Task)
async def get_task(
    id: str = Path(..., description="Task ID"),
    user_id: str = Path(..., description="User ID")
):
    """
    Retrieve a specific task by ID.
    """
    task = data_get_task(user_id, id)
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.put("/tasks/{id}", response_model=Task)
async def update_task(
    task_update: TaskUpdate = Body(..., description="Task update data"),
    id: str = Path(..., description="Task ID"),
    user_id: str = Path(..., description="User ID")
):
    """
    Update a specific task.
    """
    task = data_update_task(user_id, id, task_update)
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.delete("/tasks/{id}")
async def delete_task(
    id: str = Path(..., description="Task ID"),
    user_id: str = Path(..., description="User ID")
):
    """
    Delete a specific task.
    """
    success = data_delete_task(user_id, id)
    if not success:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted successfully"}


@router.patch("/tasks/{id}/complete", response_model=Task)
async def toggle_task_completion(
    id: str = Path(..., description="Task ID"),
    user_id: str = Path(..., description="User ID")
):
    """
    Toggle the completion status of a task.
    """
    task = data_toggle_completion(user_id, id)
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task