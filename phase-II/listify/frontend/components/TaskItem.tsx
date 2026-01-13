import React, { useState } from 'react';

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

interface TaskItemProps {
  task: Task;
  onUpdate: (id: string, data: Partial<Task>) => void;
  onDelete: (id: string) => void;
  onToggleCompletion: (id: string) => void;
  isLoading: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onUpdate,
  onDelete,
  onToggleCompletion,
  isLoading
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');

  const handleSave = () => {
    onUpdate(task.id, {
      title: editTitle,
      description: editDescription
    });
    setIsEditing(false);
  };

  const handleToggleCompletion = () => {
    onToggleCompletion(task.id);
  };

  return (
    <div className={`border rounded-lg p-4 shadow-sm ${task.completed ? 'bg-green-50' : 'bg-white'}`}>
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows={3}
          />
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-sm"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={handleToggleCompletion}
                disabled={isLoading}
                className="mt-1"
              />
              <div>
                <h3 className={`text-lg ${task.completed ? 'line-through text-gray-500' : ''}`}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-600'} mt-1`}>
                    {task.description}
                  </p>
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"
              >
                Delete
              </button>
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Created: {new Date(task.created_at).toLocaleString()}
            {task.updated_at !== task.created_at && (
              <span>, Updated: {new Date(task.updated_at).toLocaleString()}</span>
            )}
          </div>
        </div>
      )}
      {isLoading && <div className="text-xs text-gray-500 mt-1">Updating...</div>}
    </div>
  );
};

export default TaskItem;