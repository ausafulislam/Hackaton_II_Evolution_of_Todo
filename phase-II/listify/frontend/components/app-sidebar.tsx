'use client'

import { User } from '@/types'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
    useSidebar,
} from '@/components/ui/sidebar'
import { LayoutDashboard, CheckSquare, BarChart3, BadgeCheck } from 'lucide-react'
import { SignOutButton } from '@/components/auth/signout-button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import Image from 'next/image'

interface AppSidebarProps {
    user: User | null
}

export default function AppSidebar({ user }: AppSidebarProps) {

    const { state } = useSidebar()


    const items = [
        { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
        { title: 'Todos', url: '/todos', icon: CheckSquare },
        { title: 'Analytics', url: '/analytics', icon: BarChart3 },
    ]

    // console.log('User in Sidebar:', user); for debugging 

    return (
        <Sidebar collapsible="icon" className="border-r">
            <SidebarHeader className="border-b">
                <div className="relative flex items-center px-auto py-5 h-[42px]">

                    {/* Full Logo */}
                    <Image
                        src="/assets/logo-colored.svg"
                        alt="Listify Logo"
                        width={150}
                        height={42}
                        className={`absolute transition-all duration-200 ${state === "collapsed"
                                ? "opacity-0 scale-95"
                                : "opacity-100 scale-100"
                            }`}
                    />

                    {/* Icon Logo */}
                    <Image
                        src="/assets/icon0.svg"
                        alt="Listify Icon"
                        width={32}
                        height={32}
                        className={`absolute transition-all duration-200 ${state === "collapsed"
                                ? "opacity-100 scale-100"
                                : "opacity-0 scale-95"
                            }`}
                    />

                </div>
            </SidebarHeader>



            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild tooltip={item.title}>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span className="data-[state=collapsed]:hidden">{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
                                >
                                    {user?.image ? (
                                        <Image
                                            src={user.image}
                                            alt={user.name || 'User Avatar'}
                                            width={32}
                                            height={32}
                                            className="rounded-full"
                                        />
                                    ) : (
                                        <div className="flex aspect-square size-8 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white font-bold">
                                            {(user?.name || user?.email)?.charAt(0).toUpperCase() || 'U'}
                                        </div>
                                    )}

                                    <div className="grid flex-1 text-left text-sm leading-tight data-[state=collapsed]:hidden">
                                        <span className="truncate font-semibold flex items-center gap-1">
                                            {user?.name || user?.email?.split('@')[0]}
                                            {user?.emailVerified === true && (
                                                <BadgeCheck className="size-4 text-blue-500" />
                                            )}
                                        </span>
                                        <span className="truncate text-xs text-muted-foreground">
                                            {user?.email}
                                        </span>
                                    </div>
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                    <SignOutButton />
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
