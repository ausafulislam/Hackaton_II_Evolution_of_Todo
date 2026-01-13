// API service for Todo operations

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const USER_ID = process.env.NEXT_PUBLIC_USER_ID;

/**
 * Fetch all tasks for a user
 */
export const fetchTasks = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/${USER_ID}/tasks`);

    if (!response.ok) {
      throw new Error(`Error fetching tasks: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    throw error;
  }
};

/**
 * Create a new task
 */
export const createTask = async (taskData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/${USER_ID}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      throw new Error(`Error creating task: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to create task:', error);
    throw error;
  }
};

/**
 * Update an existing task
 */
export const updateTask = async (taskId, taskData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/${USER_ID}/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      throw new Error(`Error updating task: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to update task:', error);
    throw error;
  }
};

/**
 * Delete a task
 */
export const deleteTask = async (taskId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/${USER_ID}/tasks/${taskId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Error deleting task: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Failed to delete task:', error);
    throw error;
  }
};

/**
 * Toggle task completion status
 */
export const toggleTaskCompletion = async (taskId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/${USER_ID}/tasks/${taskId}/complete`, {
      method: 'PATCH',
    });

    if (!response.ok) {
      throw new Error(`Error toggling task completion: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to toggle task completion:', error);
    throw error;
  }
};