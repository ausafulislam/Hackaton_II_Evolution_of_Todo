import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export interface ILink {
    name: string;
    href: string;
};

export interface ICustomIcon {
    icon: LucideIcon;
    dir?: 'left' | 'right';
};

export interface ISectionTitle {
    icon: LucideIcon;
    title: string;
    subtitle: string;
    dir?: 'left' | 'center';
};

export interface IFeature {
    icon: LucideIcon;
    title: string;
    description: string;
    cardBg?: string;
    iconBg?: string;
};

export interface IFaq {
    question: string;
    answer: string;
};

export interface ITeamMember {
    name: string;
    image: string;
    role: string;
};

export interface IPricingPlan {
    icon: LucideIcon;
    name: string;
    type?: 'enterprise' | 'popular';
    description: string;
    price: number;
    linkText: string;
    linkUrl: string;
    features: string[];
};

export interface ITestimonial {
    quote: string;
    name: string;
    handle: string;
    image: string;
    rating: 5 | 4 | 3 | 2 | 1;
};

export interface DashboardLayoutProps {
    children: ReactNode
}


export interface User {
    id: string
    email: string
    name?: string
    image?: string | null
    emailVerified?: boolean
}

export interface DashboardStats {
    total: number
    completed: number
    pending: number
    completionRate: number
}

export interface Task {
    id: string
    user_id: string
    title: string
    description?: string
    completed: boolean
    created_at: string
    updated_at: string
    createdAt?: string // Keep for backward compatibility if needed temporarily
    dueDate?: string
    optimistic?: boolean // For UI optimistic updates
}


export interface PublicLayoutProps {
    children: ReactNode;
}