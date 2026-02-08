import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import LenisScroll from '@/components/lenis'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'   // ← from shadcn
import AppSidebar from '@/components/app-sidebar'

import { getSession } from '@/lib/auth'

import { DashboardLayoutProps } from '@/types'

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
    const session = await getSession()
    if (!session?.user) {
        redirect('/login')
    }

    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get('sidebar_state')?.value !== 'false'

    return (
        <html lang="en">
            <body className="min-h-screen bg-background antialiased">
                <LenisScroll />

                <SidebarProvider defaultOpen={defaultOpen}>
                    <div className="flex min-h-screen w-full">
                        <AppSidebar user={session.user} />

                        {/* CONTENT AREA */}
                        <main className="flex-1 w-0 flex flex-col">
                            {/* Top trigger bar */}
                            <div className="h-14 flex items-center px-4 border-b">
                                <SidebarTrigger />
                            </div>

                            {/* Page Content */}
                            <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-auto">
                                {children}
                            </div>
                        </main>
                    </div>
                </SidebarProvider>
            </body>
        </html>
    )
}
