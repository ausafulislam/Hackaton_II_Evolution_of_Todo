import React from 'react';
import TaskItem from './TaskItem';

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

interface TaskListProps {
  tasks: Task[];
  onUpdate: (id: string, data: Partial<Task>) => void;
  onDelete: (id: string) => void;
  onToggleCompletion: (id: string) => void;
  loadingStates: {
    fetch: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
    toggle: boolean;
  };
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onUpdate,
  onDelete,
  onToggleCompletion,
  loadingStates
}) => {
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onToggleCompletion={onToggleCompletion}
          isLoading={loadingStates.update || loadingStates.delete || loadingStates.toggle}
        />
      ))}
    </div>
  );
};

export default TaskList;