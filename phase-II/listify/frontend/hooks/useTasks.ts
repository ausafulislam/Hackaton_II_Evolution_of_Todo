import { useState, useEffect, useCallback } from 'react';
import {
  fetchTasks as fetchTasksApi,
  createTask as createTaskApi,
  updateTask as updateTaskApi,
  deleteTask as deleteTaskApi,
  toggleTaskCompletion as toggleTaskCompletionApi
} from '@/services/api';
import { authClient } from "@/lib/auth-client";
import { Task } from '@/types';

interface TaskData {
  title: string;
  description?: string;
  completed?: boolean;
}

interface LoadingState {
  fetch: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
  toggle: boolean;
  session?: boolean;
}

// Helper to safely extract error message
const getErrorMessage = (err: unknown) => {
  if (err instanceof Error) return err.message;
  if (typeof err === 'string') return err;
  return 'An unknown error occurred';
};

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<LoadingState>({
    fetch: false,
    create: false,
    update: false,
    delete: false,
    toggle: false,
  });
  const [error, setError] = useState<string | null>(null);

  const { data: session, isPending: isSessionLoading } = authClient.useSession();
  const userId = session?.user?.id;

  // Fetch tasks safely
  const fetchAllTasks = useCallback(async (currentUserId: string) => {
    if (!currentUserId) return;

    setLoading(prev => ({ ...prev, fetch: true }));
    setError(null);

    try {
      const tasksData = await fetchTasksApi(currentUserId);
      setTasks(tasksData);
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(prev => ({ ...prev, fetch: false }));
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchAllTasks(userId);
    } else {
      setTasks([]);
    }
  }, [userId, fetchAllTasks]);

  const createTask = useCallback(async (taskData: TaskData) => {
    if (!userId) throw new Error("User not authenticated");

    setLoading(prev => ({ ...prev, create: true }));
    setError(null);

    const tempId = crypto.randomUUID();

    try {
      const newTask: Task = {
        id: tempId,
        user_id: userId,
        title: taskData.title,
        description: taskData.description,
        completed: taskData.completed || false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        optimistic: true,
      };

      setTasks(prev => [newTask, ...prev]);

      const createdTask = await createTaskApi(userId, taskData);

      setTasks(prev =>
        prev.map(t => t.id === tempId && t.optimistic ? { ...createdTask, optimistic: false } : t)
      );

      return createdTask;
    } catch (err: unknown) {
      const message = getErrorMessage(err);
      setError(message);
      setTasks(prev => prev.filter(t => !(t.id === tempId && t.optimistic)));
      throw new Error(message);
    } finally {
      setLoading(prev => ({ ...prev, create: false }));
    }
  }, [userId]);

  const updateTask = useCallback(async (taskId: string, taskData: Partial<TaskData>) => {
    if (!userId) throw new Error("User not authenticated");

    setLoading(prev => ({ ...prev, update: true }));
    setError(null);

    const previousTasks = [...tasks];

    try {
      setTasks(prev =>
        prev.map(t => t.id === taskId ? { ...t, ...taskData, updated_at: new Date().toISOString() } : t)
      );

      const updatedTask = await updateTaskApi(userId, taskId, taskData);

      setTasks(prev =>
        prev.map(t => t.id === taskId ? updatedTask : t)
      );

      return updatedTask;
    } catch (err: unknown) {
      const message = getErrorMessage(err);
      setError(message);
      setTasks(previousTasks);
      throw new Error(message);
    } finally {
      setLoading(prev => ({ ...prev, update: false }));
    }
  }, [userId, tasks]);

  const deleteTask = useCallback(async (taskId: string) => {
    if (!userId) throw new Error("User not authenticated");

    setLoading(prev => ({ ...prev, delete: true }));
    setError(null);

    const taskToDelete = tasks.find(t => t.id === taskId);
    const previousTasks = [...tasks];

    try {
      setTasks(prev => prev.filter(t => t.id !== taskId));

      await deleteTaskApi(userId, taskId);
    } catch (err: unknown) {
      const message = getErrorMessage(err);
      setError(message);
      if (taskToDelete) setTasks(previousTasks);
      throw new Error(message);
    } finally {
      setLoading(prev => ({ ...prev, delete: false }));
    }
  }, [userId, tasks]);

  const toggleTaskCompletion = useCallback(async (taskId: string) => {
    if (!userId) throw new Error("User not authenticated");

    setLoading(prev => ({ ...prev, toggle: true }));
    setError(null);

    const previousTasks = [...tasks];

    try {
      setTasks(prev =>
        prev.map(t => t.id === taskId ? { ...t, completed: !t.completed, updated_at: new Date().toISOString() } : t)
      );

      const updatedTask = await toggleTaskCompletionApi(userId, taskId);

      setTasks(prev =>
        prev.map(t => t.id === taskId ? updatedTask : t)
      );

      return updatedTask;
    } catch (err: unknown) {
      const message = getErrorMessage(err);
      setError(message);
      setTasks(previousTasks);
      throw new Error(message);
    } finally {
      setLoading(prev => ({ ...prev, toggle: false }));
    }
  }, [userId, tasks]);

  return {
    tasks,
    loading: { ...loading, session: isSessionLoading },
    error,
    fetchAllTasks: userId ? () => fetchAllTasks(userId) : undefined,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    userId,
  };
};

export default useTasks;
