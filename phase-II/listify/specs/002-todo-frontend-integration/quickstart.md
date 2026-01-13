# Quickstart Guide: Todo Frontend Integration

## Environment Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install project dependencies:
   ```bash
   npm install
   ```

3. Create environment configuration file:
   ```bash
   touch .env.local
   ```

4. Add the following to `.env.local`:
   ```
   NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
   NEXT_PUBLIC_USER_ID=default_user_123
   ```

## Project Structure

The frontend application follows this structure:

```
frontend/
├── pages/
│   └── index.js              # Main Todo application page
├── components/
│   ├── TaskList.js           # Displays list of tasks
│   ├── TaskItem.js           # Represents individual task
│   └── TaskForm.js           # Form for creating/editing tasks
├── services/
│   └── api.js                # API service layer
├── hooks/
│   └── useTasks.js           # Custom hook for task management
├── styles/
│   └── globals.css           # Global styles
└── .env.local                # Environment variables
```

## Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. The application will be available at `http://localhost:3000`

## API Service Usage

The API service provides these functions:

```javascript
import { apiService } from '../services/api';

// Fetch all tasks for a user
const tasks = await apiService.fetchTasks(userId);

// Create a new task
const newTask = await apiService.createTask(userId, taskData);

// Update an existing task
const updatedTask = await apiService.updateTask(userId, taskId, taskData);

// Delete a task
await apiService.deleteTask(userId, taskId);

// Toggle task completion
const updatedTask = await apiService.toggleTaskCompletion(userId, taskId);
```

## Custom Hook Usage

The useTasks hook provides state management:

```javascript
import useTasks from '../hooks/useTasks';

function TodoApp() {
  const {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion
  } = useTasks();

  // Use these values in your component
}
```