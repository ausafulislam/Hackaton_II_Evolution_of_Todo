# Data Model: Todo Frontend Integration

## Task Entity

The frontend will work with Task objects that match the backend API response structure:

### Task Object
- **id** (string): Unique identifier for the task
- **user_id** (string): ID of the user who owns this task
- **title** (string): Title of the task
- **description** (string): Optional description of the task
- **completed** (boolean): Whether the task is completed
- **created_at** (string): Timestamp when the task was created (ISO format)
- **updated_at** (string): Timestamp when the task was last updated (ISO format)

### Task Creation Object
- **title** (string): Title of the task (required)
- **description** (string): Optional description of the task
- **completed** (boolean): Initial completion status (optional, defaults to false)

### Task Update Object
- **title** (string, optional): Updated title of the task
- **description** (string, optional): Updated description of the task
- **completed** (boolean, optional): Updated completion status

## State Model

### Task State in Frontend
- **tasks** (Task[]): Array of all tasks for the current user
- **loading** (boolean): Whether tasks are currently being fetched
- **creating** (boolean): Whether a task is being created
- **updating** (string | null): ID of the task currently being updated
- **deleting** (string | null): ID of the task currently being deleted
- **error** (string | null): Error message if an operation failed

## API Response Format

### Successful Response
- **Status**: 200/201 for success, 200 for deletion
- **Content-Type**: application/json
- **Body**: Task object or array of Task objects

### Error Response
- **Status**: 400, 404, 500, etc.
- **Content-Type**: application/json
- **Body**: Error object with message field