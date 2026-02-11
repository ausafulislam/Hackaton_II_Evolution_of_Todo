'use client'

import { useState, useMemo } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    CheckCircle2,
    ListTodo,
    Clock,
    TrendingUp,
    Plus,
    ArrowRight,
    Calendar,
    Target,
    AlertCircle,
    BadgeCheck as BadgeCheckIcon
} from 'lucide-react'
import { SignOutButton } from '@/components/auth/signout-button'
import Link from 'next/link'
import useTasks from '@/hooks/useTasks'
import { User, DashboardStats } from '@/types'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from 'lucide-react'

export default function DashboardClient({ user }: { user: User }) {
    const { tasks, loading, createTask } = useTasks();
    const [isToolboxOpen, setIsToolboxOpen] = useState(false);
    const [formData, setFormData] = useState({ title: '', description: '' });

    // Calculate dynamic stats
    const stats = useMemo<DashboardStats>(() => {
        const total = tasks.length;
        const completed = tasks.filter(t => t.completed).length;
        const pending = total - completed;
        const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

        return {
            total,
            completed,
            pending,
            completionRate
        };
    }, [tasks]);

    // Get recent tasks (sorted by created_at desc)
    const recentTasks = useMemo(() => {
        return [...tasks]
            .sort((a, b) => new Date(b.created_at || b.createdAt || 0).getTime() - new Date(a.created_at || a.createdAt || 0).getTime())
            .slice(0, 3);
    }, [tasks]);

    const handleQuickCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createTask(formData);
            setFormData({ title: '', description: '' });
            setIsToolboxOpen(false);
        } catch (error) {
            console.error("Failed to create task", error);
        }
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header with User Info */}
            <div className="border-b border-border bg-card sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">
                            {user.name || 'Dashboard'}
                        </h1>
                        <div className="flex items-center gap-2">
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                            {user.emailVerified ? (
                                <BadgeCheckIcon className="size-4 text-blue-500" />
                            ) : (
                                <Link href="/profile">
                                    <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 gap-1 px-2 py-0.5 hover:bg-red-100 transition-colors cursor-pointer text-xs">
                                        <AlertCircle className="size-3" />
                                        Not Verified
                                    </Badge>
                                </Link>
                            )}
                        </div>
                    </div>
                    <SignOutButton />
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                {/* Welcome Section */}
                <div>
                    <h2 className="text-3xl font-bold text-foreground text-pretty">
                        Welcome back, {user.name?.split(' ')[0] || 'User'}
                    </h2>
                    <p className="text-muted-foreground mt-2">
                        Here&apos;s your task overview for today
                    </p>
                </div>

                {/* Stats Grid */}
                {loading.fetch || loading.session ? (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-pulse">
                        {[1, 2, 3, 4].map(i => (
                            <Card key={i} className="h-32 bg-gray-100" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Total Tasks */}
                        <Card className="p-6 border border-border hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground font-medium">Total Tasks</p>
                                    <p className="text-3xl font-bold text-foreground mt-2">{stats.total}</p>
                                    <p className="text-xs text-muted-foreground mt-2">All your tasks</p>
                                </div>
                                <div className="p-3 bg-orange-100 rounded-lg">
                                    <ListTodo className="w-6 h-6 text-orange-600" />
                                </div>
                            </div>
                        </Card>

                        {/* Completed Tasks */}
                        <Card className="p-6 border border-border hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground font-medium">Completed</p>
                                    <p className="text-3xl font-bold text-foreground mt-2">{stats.completed}</p>
                                    <p className="text-xs text-muted-foreground mt-2">Keep it up!</p>
                                </div>
                                <div className="p-3 bg-green-100 rounded-lg">
                                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                        </Card>

                        {/* Pending Tasks */}
                        <Card className="p-6 border border-border hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground font-medium">Pending</p>
                                    <p className="text-3xl font-bold text-foreground mt-2">{stats.pending}</p>
                                    <p className="text-xs text-muted-foreground mt-2">In progress</p>
                                </div>
                                <div className="p-3 bg-blue-100 rounded-lg">
                                    <Clock className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </Card>

                        {/* Completion Rate */}
                        <Card className="p-6 border border-border hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground font-medium">Completion</p>
                                    <p className="text-3xl font-bold text-foreground mt-2">{stats.completionRate}%</p>
                                    <p className="text-xs text-muted-foreground mt-2">This month</p>
                                </div>
                                <div className="p-3 bg-purple-100 rounded-lg">
                                    <TrendingUp className="w-6 h-6 text-purple-600" />
                                </div>
                            </div>
                        </Card>
                    </div>
                )}

                {/* Progress Section */}
                <Card className="p-6 border border-border">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Overall Progress</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-foreground">Completion Rate</span>
                                <span className="text-sm font-bold text-orange-600">{stats.completionRate}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                                <div
                                    className="bg-gradient-to-r from-orange-400 to-orange-600 h-3 rounded-full transition-all duration-500 ease-out"
                                    style={{ width: `${stats.completionRate}%` }}
                                />
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            {stats.completed} of {stats.total} tasks completed
                        </p>
                    </div>
                </Card>

                {/* Recent Tasks Section */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-foreground">Recent Tasks</h3>
                        <Link href="/todos">
                            <Button variant="ghost" size="sm" className="gap-2 text-orange-600 hover:text-orange-700 hover:bg-orange-50">
                                View All
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                    </div>

                    <div className="space-y-3">
                        {tasks.length === 0 && !loading.fetch ? (
                            <div className="text-center py-8 text-muted-foreground">No tasks yet.</div>
                        ) : recentTasks.map((task) => (
                            <Card
                                key={task.id}
                                className="p-4 border border-border hover:bg-muted transition-colors"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center ${task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                                            {task.completed && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p
                                            className={`font-medium text-foreground ${task.completed ? 'line-through text-muted-foreground' : ''
                                                }`}
                                        >
                                            {task.title}
                                        </p>
                                        {task.description && (
                                            <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                                                {task.description}
                                            </p>
                                        )}
                                        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(task.created_at || task.createdAt || new Date()).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <span
                                            className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${task.completed
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-yellow-100 text-yellow-700'
                                                }`}
                                        >
                                            {task.completed ? 'Done' : 'Pending'}
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card
                        className="p-6 border border-border hover:shadow-md transition-shadow cursor-pointer hover:border-orange-500 group"
                        onClick={() => setIsToolboxOpen(true)}
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h4 className="font-semibold text-foreground group-hover:text-orange-600 transition-colors">Create New Task</h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Add a new task to your list
                                </p>
                            </div>
                            <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                                <Plus className="w-5 h-5 text-orange-600" />
                            </div>
                        </div>
                    </Card>

                    <Link href="/todos">
                        <Card className="p-6 border border-border hover:shadow-md transition-shadow cursor-pointer hover:border-blue-500 group h-full">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h4 className="font-semibold text-foreground group-hover:text-blue-600 transition-colors">View All Tasks</h4>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Manage all your tasks
                                    </p>
                                </div>
                                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                                    <Target className="w-5 h-5 text-blue-600" />
                                </div>
                            </div>
                        </Card>
                    </Link>
                </div>
            </div>

            {/* Quick Create Toolbox */}
            <Sheet open={isToolboxOpen} onOpenChange={setIsToolboxOpen}>
                <SheetContent className="sm:max-w-md w-full border-l border-gray-100 shadow-2xl">
                    <SheetHeader className="space-y-4 pb-6 border-b">
                        <SheetTitle className="text-2xl font-bold flex items-center gap-2">
                            <Plus className="w-6 h-6 text-orange-500" />
                            Quick Create
                        </SheetTitle>
                        <SheetDescription>
                            Add a new task swiftly.
                        </SheetDescription>
                    </SheetHeader>

                    <form onSubmit={handleQuickCreate} className="flex flex-col gap-6 py-8">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-900">Task Title</label>
                            <Input
                                placeholder="What needs to be done?"
                                className="focus-visible:ring-orange-500"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-900">Description</label>
                            <Textarea
                                placeholder="Any details?"
                                className="min-h-[100px] resize-none focus-visible:ring-orange-500"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        <SheetFooter className="mt-auto pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsToolboxOpen(false)}
                                className="w-full sm:w-auto"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white"
                                disabled={loading.create}
                            >
                                {loading.create ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    'Create Task'
                                )}
                            </Button>
                        </SheetFooter>
                    </form>
                </SheetContent>
            </Sheet>
        </div>
    )
}
