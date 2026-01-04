# Data Model: Phase I - Console Todo Application

## Task Entity

### Attributes
- **id**: Integer, auto-incremented unique identifier
  - Type: int
  - Constraints: Positive integer, unique within application session
  - Generated: Auto-incremented by system

- **description**: Text description of the task
  - Type: str
  - Constraints: Required, non-empty string
  - Validation: Must not be empty or whitespace-only

- **status**: Completion status of the task
  - Type: bool
  - Values: True (complete) or False (incomplete)
  - Default: False (incomplete)

- **created_at**: Timestamp when task was created
  - Type: datetime
  - Format: ISO format string
  - Generated: Automatically set to current time when task is created

### Relationships
- No relationships with other entities (standalone entity as per specification)

### Validation Rules
- Description must be non-empty (FR-009)
- ID must be positive integer
- Status must be boolean value

### State Transitions
- Status can transition from False → True (incomplete → complete)
- Status can transition from True → False (complete → incomplete)
- All other attributes remain immutable after creation except description (via update operation)

## In-Memory Storage Structure

### Task Storage
- **Primary storage**: List of Task objects for ordered display
- **Index storage**: Dictionary mapping ID to Task object for O(1) lookup by ID
- **ID counter**: Integer counter for auto-generating next available ID

### Storage Operations
- **Add Task**: Append to list, add to dictionary index, increment ID counter
- **Get Task by ID**: Lookup in dictionary index (O(1) complexity)
- **Update Task**: Modify description in place
- **Delete Task**: Remove from both list and dictionary
- **List All Tasks**: Return the ordered list
- **Mark Complete/Incomplete**: Update status field in place

### Constraints
- All operations maintain data consistency between list and dictionary
- ID counter never decreases, ensuring unique IDs even after deletions
- Storage remains in memory only (no persistence beyond application lifetime)