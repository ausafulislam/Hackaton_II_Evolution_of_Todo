import { IPricingPlan } from "@/types";
import { RocketIcon, UserIcon, UsersIcon } from "lucide-react";

export const pricing: IPricingPlan[] = [
    {
        icon: RocketIcon,
        name: "Free",
        description: "Get started with basic task management features.",
        price: 0,
        linkText: "Start Free",
        linkUrl: "#",
        features: [
            "Up to 50 tasks",
            "Basic task management",
            "Simple organization",
            "Email support",
            "Cross-device sync",
        ],
    },
    {
        icon: UserIcon,
        name: "Personal",
        description: "Perfect for individuals who want advanced organization.",
        price: 4,
        linkText: "Get Started",
        linkUrl: "#",
        features: [
            "Unlimited tasks",
            "Priority support",
            "Advanced filters",
            "Custom tags",
            "Weekly reports",
        ],
    },
    {
        icon: UsersIcon,
        name: "Professional",
        type: "popular",
        description: "Best for professionals and small teams.",
        price: 9,
        linkText: "Upgrade to Pro",
        linkUrl: "#",
        features: [
            "Everything in Personal",
            "Team collaboration",
            "Shared task lists",
            "Project management",
            "Priority support",
        ],
    },
    {
        icon: UserIcon,
        name: "Business",
        type: "enterprise",
        description: "Custom solutions for large organizations.",
        price: 19,
        linkText: "Contact Sales",
        linkUrl: "#",
        features: [
            "Unlimited users",
            "Custom integrations",
            "Advanced security",
            "Dedicated support",
            "Custom reporting",
        ],
    },
];