"use client";

import { useState, useEffect } from 'react';
import useTasks from '@/hooks/useTasks';
import TaskList from '@/components/TaskList';
import TaskForm from '@/components/TaskForm';

export default function TodoPage() {
  const {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion
  } = useTasks();

  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Todo List</h1>
          <p className="text-gray-600 mb-6">Manage your tasks efficiently</p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              Error: {error}
            </div>
          )}

          <div className="mb-6">
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              {showForm ? 'Cancel' : 'Add New Task'}
            </button>

            {showForm && (
              <TaskForm
                onSubmit={async (taskData) => {
                  await createTask(taskData);
                  setShowForm(false);
                }}
                onCancel={() => setShowForm(false)}
                isLoading={loading.create}
              />
            )}
          </div>

          {loading.fetch ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-2 text-gray-600">Loading tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-4">No tasks found</div>
              <p className="text-gray-600">Add a new task to get started!</p>
            </div>
          ) : (
            <TaskList
              tasks={tasks}
              onUpdate={updateTask}
              onDelete={deleteTask}
              onToggleCompletion={toggleTaskCompletion}
              loadingStates={loading}
            />
          )}
        </div>
      </div>
    </div>
  );
}