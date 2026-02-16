# Implementation Plan: Todo API Backend (Phase II)

**Feature**: Todo API Backend (Phase II)
**Branch**: 001-todo-api-backend
**Created**: 2026-01-10
**Status**: Draft
**Input**: Create the Phase II technical plan for the "Evolution of Todo" backend API

## Technical Context

This plan outlines the implementation of a FastAPI-based backend application for the Todo API (Phase II). The implementation will follow the approved specification and global constitution, focusing on providing REST-style endpoints for todo task management without authentication or database persistence.

**Technology Stack**:
- Python 3.9+
- FastAPI framework
- Pydantic for data validation
- In-memory data storage (temporary, runtime only)

**Architecture**:
- Single main FastAPI application
- API routing strategy for todo endpoints
- Request validation using Pydantic models
- Response formatting and error handling

**Unknowns**: None at this time - all requirements are clearly specified in the feature specification.

## Constitution Check

**Spec-Driven Development Mandate**: ✅ This plan follows the required sequence: Constitution → Specifications → Plan → Tasks → Implementation

**Agent Behavior Rules**: ✅ Plan will not include feature invention outside approved specs

**Phase Governance**: ✅ Plan remains strictly scoped to Phase II requirements

**Technology Stack Compliance**: ✅ Plan uses Python with FastAPI as required

**Quality Assurance Standards**: ✅ Plan emphasizes modular, maintainable, and testable code

**Implementation Discipline**: ✅ Plan focuses on smallest viable changes

## Gates

**GATE 1: Specification Alignment** - All implementation details align with approved feature specification ✅

**GATE 2: Constitution Compliance** - Implementation approach follows constitution requirements ✅

**GATE 3: Scope Validation** - Plan remains within Phase II boundaries ✅

## Phase 0: Research & Discovery

### Research Findings

**FastAPI Application Structure**: FastAPI follows the standard Python web application pattern with a main application instance that can include multiple routers for different API sections.

**In-Memory Data Strategy**: Python dictionaries and lists can be used for temporary, runtime-only storage. This approach is suitable for the Phase II requirements since no persistence is needed.

**Pydantic Validation**: Pydantic models provide excellent request/response validation and serialization capabilities that integrate seamlessly with FastAPI.

**API Routing**: FastAPI's APIRouter allows for clean organization of endpoints by functionality, making it easy to group todo-related endpoints.

## Phase 1: Data Models & Contracts

### Data Model: Task Entity

```python
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    completed: bool = False

class TaskCreate(TaskBase):
    pass

class TaskUpdate(TaskBase):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None

class Task(TaskBase):
    id: str
    user_id: str
    created_at: datetime
    updated_at: datetime
```

### API Contracts

#### GET /api/{user_id}/tasks
- **Purpose**: Retrieve all tasks for a specific user
- **Path Parameters**: user_id (string)
- **Response**: 200 OK with JSON array of Task objects
- **Error Responses**: 500 Internal Server Error

#### POST /api/{user_id}/tasks
- **Purpose**: Create a new task for a specific user
- **Path Parameters**: user_id (string)
- **Request Body**: TaskCreate object
- **Response**: 201 Created with created Task object
- **Error Responses**: 400 Bad Request, 500 Internal Server Error

#### GET /api/{user_id}/tasks/{id}
- **Purpose**: Retrieve a specific task by ID
- **Path Parameters**: user_id (string), id (string)
- **Response**: 200 OK with Task object
- **Error Responses**: 404 Not Found, 500 Internal Server Error

#### PUT /api/{user_id}/tasks/{id}
- **Purpose**: Update a specific task
- **Path Parameters**: user_id (string), id (string)
- **Request Body**: TaskUpdate object
- **Response**: 200 OK with updated Task object
- **Error Responses**: 404 Not Found, 400 Bad Request, 500 Internal Server Error

#### DELETE /api/{user_id}/tasks/{id}
- **Purpose**: Delete a specific task
- **Path Parameters**: user_id (string), id (string)
- **Response**: 204 No Content
- **Error Responses**: 404 Not Found, 500 Internal Server Error

#### PATCH /api/{user_id}/tasks/{id}/complete
- **Purpose**: Toggle the completion status of a task
- **Path Parameters**: user_id (string), id (string)
- **Response**: 200 OK with updated Task object
- **Error Responses**: 404 Not Found, 500 Internal Server Error

## Phase 1: Quickstart Guide

### Environment Setup
1. Create backend directory
2. Create Python virtual environment: `python -m venv venv`
3. Activate virtual environment: `venv\Scripts\activate` (Windows) or `source venv/bin/activate` (Unix/Mac)
4. Install required dependencies: `pip install fastapi uvicorn python-multipart`

### Project Structure
```
backend/
├── main.py              # Main FastAPI application
├── models.py            # Pydantic models
├── data.py              # In-memory data storage
├── routers/             # API route handlers
│   └── tasks.py         # Task-related endpoints
└── requirements.txt     # Project dependencies
```

### Implementation Steps
1. Create the Pydantic models as defined above
2. Implement in-memory data storage with basic CRUD operations
3. Create the tasks router with all required endpoints
4. Mount the router to the main application
5. Add request validation and error handling
6. Test all endpoints

## Phase 2: Architecture & Implementation Strategy

### High-Level Application Structure

The FastAPI application will follow a modular architecture with clear separation of concerns:

1. **main.py**: Contains the FastAPI application instance and handles startup/shutdown
2. **models.py**: Contains Pydantic models for request/response validation
3. **data.py**: Contains in-memory storage and basic CRUD operations
4. **routers/tasks.py**: Contains all task-related endpoints

### In-Memory Data Handling Strategy

The application will use Python dictionaries for temporary, runtime-only storage:

- Tasks will be stored in a dictionary with task_id as key and task object as value
- A separate dictionary will map user_id to a list of task_ids for that user
- All data will be lost when the application shuts down (as required for Phase II)
- Thread-safe operations will be considered for concurrent access

### Request Validation Strategy

All incoming requests will be validated using Pydantic models:
- Request bodies will be validated against Pydantic models
- Path parameters will be type-annotated for validation
- FastAPI will automatically handle validation errors and return appropriate HTTP responses

### Response Formatting and Error Handling

- All responses will follow a consistent JSON format
- Appropriate HTTP status codes will be returned for different scenarios
- Error responses will include descriptive messages
- FastAPI's built-in exception handling will be leveraged

### Endpoint Behavior Mapping

Each endpoint will map directly to the specification acceptance criteria:

1. **GET /api/{user_id}/tasks**: Returns all tasks for the user, or empty array if none exist
2. **POST /api/{user_id}/tasks**: Creates a new task and returns it with unique ID
3. **GET /api/{user_id}/tasks/{id}**: Returns specific task or 404 if not found
4. **PUT /api/{user_id}/tasks/{id}**: Updates task fields and returns updated task
5. **DELETE /api/{user_id}/tasks/{id}**: Deletes task and returns success response
6. **PATCH /api/{user_id}/tasks/{id}/complete**: Toggles completion status and returns updated task

## Phase 3: Implementation Plan

### Task Breakdown

1. **Setup Project Structure**
   - Create directory structure
   - Set up virtual environment
   - Install dependencies

2. **Implement Data Models**
   - Create Pydantic models for Task entities
   - Define validation rules

3. **Implement In-Memory Storage**
   - Create data storage layer
   - Implement CRUD operations

4. **Create Task Router**
   - Implement all 6 required endpoints
   - Add request validation
   - Add response formatting

5. **Integrate with Main Application**
   - Mount router to main app
   - Add configuration

6. **Testing and Validation**
   - Test all endpoints against acceptance criteria
   - Validate error handling