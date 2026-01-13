import { useState, useEffect } from 'react';
import {
  fetchTasks as fetchTasksApi,
  createTask as createTaskApi,
  updateTask as updateTaskApi,
  deleteTask as deleteTaskApi,
  toggleTaskCompletion as toggleTaskCompletionApi
} from '@/services/api';

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState({
    fetch: false,
    create: false,
    update: false,
    delete: false,
    toggle: false,
  });
  const [error, setError] = useState(null);

  // Fetch tasks on mount
  useEffect(() => {
    fetchAllTasks();
  }, []);

  const fetchAllTasks = async () => {
    setLoading(prev => ({ ...prev, fetch: true }));
    setError(null);

    try {
      const tasksData = await fetchTasksApi();
      setTasks(tasksData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(prev => ({ ...prev, fetch: false }));
    }
  };

  const createTask = async (taskData) => {
    setLoading(prev => ({ ...prev, create: true }));
    setError(null);

    try {
      // Optimistic update
      const newTask = {
        id: Date.now().toString(), // Temporary ID until API returns real one
        user_id: process.env.NEXT_PUBLIC_USER_ID,
        title: taskData.title,
        description: taskData.description,
        completed: taskData.completed || false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        optimistic: true, // Flag to track optimistic updates
      };

      setTasks(prevTasks => [newTask, ...prevTasks]);

      // Actual API call
      const createdTask = await createTaskApi(taskData);

      // Update with real task data
      setTasks(prevTasks =>
        prevTasks.map(t => t.id === newTask.id && t.optimistic ? { ...createdTask, optimistic: false } : t)
      );

      return createdTask;
    } catch (err) {
      setError(err.message);
      // Revert optimistic update if API call fails
      setTasks(prevTasks => prevTasks.filter(t => !(t.id === newTask.id && t.optimistic)));
      throw err;
    } finally {
      setLoading(prev => ({ ...prev, create: false }));
    }
  };

  const updateTask = async (taskId, taskData) => {
    setLoading(prev => ({ ...prev, update: true }));
    setError(null);

    try {
      // Optimistic update
      setTasks(prevTasks =>
        prevTasks.map(t =>
          t.id === taskId ? { ...t, ...taskData, updated_at: new Date().toISOString() } : t
        )
      );

      // Actual API call
      const updatedTask = await updateTaskApi(taskId, taskData);

      // Update with real task data
      setTasks(prevTasks =>
        prevTasks.map(t => t.id === taskId ? updatedTask : t)
      );

      return updatedTask;
    } catch (err) {
      setError(err.message);
      // Re-fetch tasks to revert optimistic update if API call fails
      fetchAllTasks();
      throw err;
    } finally {
      setLoading(prev => ({ ...prev, update: false }));
    }
  };

  const deleteTask = async (taskId) => {
    setLoading(prev => ({ ...prev, delete: true }));
    setError(null);

    try {
      // Optimistic update
      const deletedTask = tasks.find(t => t.id === taskId);
      setTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));

      // Actual API call
      await deleteTaskApi(taskId);

      // In case of success, nothing to do as task is already removed
    } catch (err) {
      setError(err.message);
      // Re-add task if API call fails
      if (deletedTask) {
        setTasks(prevTasks => [...prevTasks, deletedTask]);
      }
      throw err;
    } finally {
      setLoading(prev => ({ ...prev, delete: false }));
    }
  };

  const toggleTaskCompletion = async (taskId) => {
    setLoading(prev => ({ ...prev, toggle: true }));
    setError(null);

    try {
      // Optimistic update
      setTasks(prevTasks =>
        prevTasks.map(t =>
          t.id === taskId ? { ...t, completed: !t.completed, updated_at: new Date().toISOString() } : t
        )
      );

      // Actual API call
      const updatedTask = await toggleTaskCompletionApi(taskId);

      // Update with real task data
      setTasks(prevTasks =>
        prevTasks.map(t => t.id === taskId ? updatedTask : t)
      );

      return updatedTask;
    } catch (err) {
      setError(err.message);
      // Re-fetch tasks to revert optimistic update if API call fails
      fetchAllTasks();
      throw err;
    } finally {
      setLoading(prev => ({ ...prev, toggle: false }));
    }
  };

  return {
    tasks,
    loading,
    error,
    fetchAllTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
  };
};

export default useTasks;