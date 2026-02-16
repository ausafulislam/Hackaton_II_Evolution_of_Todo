# Data Model: Todo API Backend

## Task Entity

### TaskBase
- **title** (str): Required title of the task
- **description** (Optional[str]): Optional description of the task
- **completed** (bool): Whether the task is completed, defaults to False

### TaskCreate (inherits from TaskBase)
- Same fields as TaskBase
- Used for creating new tasks

### TaskUpdate (inherits from TaskBase)
- **title** (Optional[str]): Optional title (to allow partial updates)
- **description** (Optional[str]): Optional description (to allow partial updates)
- **completed** (Optional[bool]): Optional completion status (to allow partial updates)
- Used for updating existing tasks

### Task (inherits from TaskBase)
- **id** (str): Unique identifier for the task
- **user_id** (str): ID of the user who owns this task
- **created_at** (datetime): Timestamp when the task was created
- **updated_at** (datetime): Timestamp when the task was last updated
- Used for representing complete task objects in responses

## Storage Model

### In-Memory Storage Structure
- **tasks_storage**: Dictionary mapping task_id to Task objects
- **user_tasks**: Dictionary mapping user_id to list of task_ids
- Both dictionaries will be maintained in the data.py module
- Data will be stored only in runtime memory (lost on application restart)