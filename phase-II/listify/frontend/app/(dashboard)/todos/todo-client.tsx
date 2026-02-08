"use client";

import { useState, useMemo } from 'react';
import useTasks from '@/hooks/useTasks';
import {
    Plus,
    Search,
    MoreVertical,
    Calendar,
    CheckCircle2,
    Circle,
    Trash2,
    Edit2,
    X,
    Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
} from "@/components/ui/sheet"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"


// ✅ TYPE ADDED (Fixes 'never' error)
type Task = {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    created_at?: string;
    createdAt?: string;
};

export default function TodoClient() {
    const {
        tasks,
        loading,
        error,
        createTask,
        updateTask,
        deleteTask,
        toggleTaskCompletion
    } = useTasks();

    const [isToolboxOpen, setIsToolboxOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });

    // ✅ Properly typed param
    const handleOpenToolbox = (taskToEdit: Task | null = null) => {
        if (taskToEdit) {
            setEditingTask(taskToEdit);
            setFormData({
                title: taskToEdit.title,
                description: taskToEdit.description ?? '',
            });
        } else {
            setEditingTask(null);
            setFormData({ title: '', description: '' });
        }
        setIsToolboxOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // ✅ Prevent empty titles
        if (!formData.title.trim()) return;

        try {
            if (editingTask) {
                await updateTask(editingTask.id, formData);
            } else {
                await createTask(formData);
            }
            setIsToolboxOpen(false);
        } catch (error) {
            console.error("Task operation failed", error);
        }
    };

    // ✅ Performance safe filtering
    const filteredTasks = useMemo(() => {
        return tasks.filter((task: Task) =>
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [tasks, searchQuery]);

    return (
        <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-full mx-auto space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">My Tasks</h1>
                        <p className="text-gray-500 mt-1">Manage, organize, and track your daily progress.</p>
                    </div>
                    <Button
                        onClick={() => handleOpenToolbox()}
                        className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20 transition-all duration-300 transform hover:scale-105"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Add New Task
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Search Bar */}
                    <div className="col-span-1 md:col-span-2 flex items-center bg-white border border-gray-200 shadow-sm rounded-xl px-4 py-3">
                        <Input
                            placeholder="Search tasks..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-1 border border-orange-300 focus-visible:ring-2 focus-visible:ring-orange-500 rounded-lg px-3 py-2 text-base placeholder-gray-400 shadow-sm"
                        />
                        <Search className="w-6 h-6 text-gray-400 ml-3" />
                    </div>

                    {/* Total Tasks */}
                    <div className="flex items-center justify-between bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg rounded-xl px-6 py-4 ">
                        <div className="flex flex-col">
                            <span className="text-3xl font-extrabold">{tasks.length}</span>
                            <span className="text-sm font-medium uppercase tracking-wide">Total Tasks</span>
                        </div>
                        <Plus className="w-6 h-6 text-white" />
                    </div>
                </div>


                <div className="space-y-4">
                    {loading.fetch || loading.session ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Loader2 className="w-10 h-10 text-orange-500 animate-spin mb-4" />
                            <p className="text-gray-500 animate-pulse">Loading your productivity...</p>
                        </div>
                    ) : filteredTasks.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                            <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Plus className="w-8 h-8 text-orange-500" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">No tasks found</h3>
                            <p className="text-gray-500 mt-1">Create a new task to get started!</p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {filteredTasks.map((task: Task) => {
                                const createdDate = task.created_at ?? task.createdAt;

                                return (
                                    <Card key={task.id} className="group p-4 hover:shadow-md transition-all duration-300 border-l-4 border-l-transparent hover:border-l-orange-500">
                                        <div className="flex items-start gap-4">
                                            <button
                                                onClick={() => toggleTaskCompletion(task.id)}
                                                className={cn(
                                                    "mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200",
                                                    task.completed
                                                        ? "bg-green-500 border-green-500 text-white"
                                                        : "border-gray-300 text-transparent hover:border-orange-500"
                                                )}
                                            >
                                                <CheckCircle2 className="w-4 h-4" />
                                            </button>

                                            <div className="flex-1 min-w-0 space-y-1">
                                                <div className="flex items-center justify-between">
                                                    <h3 className={cn(
                                                        "font-semibold text-lg leading-none truncate pr-4 transition-all",
                                                        task.completed ? "text-gray-400 line-through" : "text-gray-900"
                                                    )}>
                                                        {task.title}
                                                    </h3>
                                                    {task.completed ? (
                                                        <Badge
                                                            variant="secondary"
                                                            className="bg-green-100 text-green-700 hover:bg-green-100"
                                                        >
                                                            Completed
                                                        </Badge>
                                                    ) : (
                                                        <Badge
                                                            variant="secondary"
                                                            className="bg-orange-100 text-orange-700 hover:bg-orange-100"
                                                        >
                                                            Pending
                                                        </Badge>
                                                    )}
                                                </div>

                                                {task.description && (
                                                    <p className={cn(
                                                        "text-sm line-clamp-2",
                                                        task.completed ? "text-gray-300" : "text-gray-500"
                                                    )}>
                                                        {task.description}
                                                    </p>
                                                )}

                                                {createdDate && (
                                                    <div className="flex items-center gap-4 pt-2 text-xs text-gray-400">
                                                        <div className="flex items-center gap-1">
                                                            <Calendar className="w-3 h-3" />
                                                            <span>{new Date(createdDate).toLocaleDateString()}</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <MoreVertical className="w-5 h-5" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => handleOpenToolbox(task)}>
                                                        <Edit2 className="w-4 h-4 mr-2" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => deleteTask(task.id)}
                                                        className="text-red-600 focus:text-red-600 focus:bg-red-50"
                                                    >
                                                        <Trash2 className="w-4 h-4 mr-2" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            <Sheet open={isToolboxOpen} onOpenChange={setIsToolboxOpen}>
                <SheetContent className="sm:max-w-md w-full border-l border-orange-500 shadow-2xl">
                    <SheetHeader className="space-y-4 pb-6 border-b">
                        <SheetTitle className="text-2xl font-bold flex items-center gap-2">
                            {editingTask ? "Edit Task" : "New Task"}
                        </SheetTitle>
                        <SheetDescription>
                            {editingTask ? "Make changes to your task here." : "Add a new task to your list. Get things done!"}
                        </SheetDescription>
                    </SheetHeader>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-5">
                        <Input
                            placeholder="Task Title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                        <Textarea
                            placeholder="Description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />

                        <SheetFooter className="mt-auto pt-4 flex-row-reverse gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsToolboxOpen(false)}
                                className="flex h-11 border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                disabled={loading.create || loading.update}
                                className="flex-1 h-11 bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white font-medium shadow-lg shadow-orange-500/30 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {loading.create || loading.update
                                    ? "Saving..."
                                    : editingTask
                                        ? "Save Changes"
                                        : "Create Task"}
                            </Button>
                        </SheetFooter>

                    </form>
                </SheetContent>
            </Sheet>
        </div>
    );
}
