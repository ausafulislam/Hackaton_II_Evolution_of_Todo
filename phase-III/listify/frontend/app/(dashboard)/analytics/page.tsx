'use client'

import { useMemo } from 'react'
import { Card } from '@/components/ui/card'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import useTasks from '@/hooks/useTasks'
import { Loader2, ShieldAlert, AlertCircle, ArrowRight } from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AnalyticsPage() {
    const { data: session } = authClient.useSession();
    const { tasks, loading } = useTasks();
    const isVerified = session?.user?.emailVerified;

    // Calculate dynamic metrics
    const { totalTasks, completedTasks, pendingTasks, completionPercentage } = useMemo(() => {
        const total = tasks.length;
        const completed = tasks.filter(t => t.completed).length;
        const pending = total - completed;
        const rate = total > 0 ? Math.round((completed / total) * 100) : 0;
        return { totalTasks: total, completedTasks: completed, pendingTasks: pending, completionPercentage: rate };
    }, [tasks]);

    // Calculate Daily Data (Last 7 days)
    const dailyData = useMemo(() => {
        const data = [];
        const today = new Date();

        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toLocaleDateString('en-US', { weekday: 'short' });

            // Filter tasks created or updated on this day (simplified logic for demo)
            // In a real app, we'd track "completion date" separately. 
            // For now, let's just show current status distribution as it stands.
            // Or better: Count tasks created on this day?
            // Let's count tasks created on this day.

            const dayTasks = tasks.filter(t => {
                const taskDate = new Date(t.created_at || t.createdAt || new Date());
                return taskDate.getDate() === date.getDate() &&
                    taskDate.getMonth() === date.getMonth() &&
                    taskDate.getFullYear() === date.getFullYear();
            });

            data.push({
                date: dateStr,
                created: dayTasks.length,
                completed: dayTasks.filter(t => t.completed).length // Completed *among those created* (approx)
            });
        }
        return data;
    }, [tasks]);

    // Status Distribution for Pie Chart
    const statusData = [
        { name: 'Completed', value: completedTasks, color: '#22c55e' }, // green-500
        { name: 'Pending', value: pendingTasks, color: '#ea580c' },   // orange-600
    ];

    if (loading.fetch || loading.session) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
                <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-4" />
                <p className="text-muted-foreground">Crunching the numbers...</p>
            </div>
        )
    }

    return (
        <div className="relative min-h-[50vh]">
            {/* Overlay for Unverified Users */}
            {!isVerified && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/30 backdrop-blur-[2px]">
                    <Card className="max-w-md p-8 text-center shadow-2xl border-orange-100 flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-300">
                        <div className="p-4 bg-red-50 rounded-full">
                            <ShieldAlert className="w-12 h-12 text-red-600" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold text-foreground">Verification Required</h2>
                            <p className="text-muted-foreground">
                                You are not a verified user. To access premium data features like Analytics, please verify your email first.
                            </p>
                        </div>
                        <Link href="/profile" className="w-full">
                            <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white gap-2">
                                <AlertCircle className="w-4 h-4" />
                                Verify Now
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                    </Card>
                </div>
            )}

            {/* Main Content (Blurred if unverified) */}
            <div className={`space-y-8 transition-all duration-300 ${!isVerified ? 'blur-[4px] pointer-events-none select-none' : ''}`}>
                {/* Header */}
                <div>
                    <h1 className="text-4xl font-bold text-foreground text-pretty">Analytics</h1>
                    <p className="text-muted-foreground mt-2">
                        Track your productivity and task completion metrics
                    </p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="p-6 border border-border">
                        <p className="text-sm text-muted-foreground font-medium">Total Tasks</p>
                        <p className="text-3xl font-bold text-foreground mt-2">{totalTasks}</p>
                        <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                    </Card>

                    <Card className="p-6 border border-border">
                        <p className="text-sm text-muted-foreground font-medium">Completed</p>
                        <p className="text-3xl font-bold text-green-600 mt-2">{completedTasks}</p>
                        <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                            <div
                                className="bg-green-500 h-1.5 rounded-full transition-all duration-500"
                                style={{ width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%` }}
                            ></div>
                        </div>
                    </Card>

                    <Card className="p-6 border border-border">
                        <p className="text-sm text-muted-foreground font-medium">Pending</p>
                        <p className="text-3xl font-bold text-orange-600 mt-2">{pendingTasks}</p>
                        <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                            <div
                                className="bg-orange-500 h-1.5 rounded-full transition-all duration-500"
                                style={{ width: `${totalTasks > 0 ? (pendingTasks / totalTasks) * 100 : 0}%` }}
                            ></div>
                        </div>
                    </Card>

                    <Card className="p-6 border border-border">
                        <p className="text-sm text-muted-foreground font-medium">Completion %</p>
                        <p className="text-3xl font-bold text-purple-600 mt-2">{completionPercentage}%</p>
                        <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                            <div
                                className="bg-purple-500 h-1.5 rounded-full transition-all duration-500"
                                style={{ width: `${completionPercentage}%` }}
                            ></div>
                        </div>
                    </Card>
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Daily Activity Chart */}
                    <Card className="p-6 border border-border">
                        <h2 className="text-lg font-semibold text-foreground mb-4">Daily Activity (Last 7 Days)</h2>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={dailyData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                                    <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#fff',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '8px',
                                        }}
                                    />
                                    <Legend />
                                    <Bar name="Created" dataKey="created" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                    <Bar name="Completed" dataKey="completed" fill="#22c55e" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    {/* Task Distribution Pie Chart */}
                    <Card className="p-6 border border-border">
                        <h2 className="text-lg font-semibold text-foreground mb-4">Status Distribution</h2>
                        <div className="h-[300px] w-full">
                            {totalTasks === 0 ? (
                                <div className="flex items-center justify-center h-full text-muted-foreground">
                                    No data available
                                </div>
                            ) : (
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={statusData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {statusData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
