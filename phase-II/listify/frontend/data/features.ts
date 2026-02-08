import {
    ListChecksIcon,
    CheckCircleIcon,
    LayoutDashboardIcon,
    ShieldCheckIcon,
    BellIcon,
    SparklesIcon
} from "lucide-react";
import { IFeature } from "../types";

export const features: IFeature[] = [
    {
        title: "Create & Manage Tasks",
        description:
            "Easily add, edit and organize your daily tasks so nothing important is ever forgotten.",
        icon: ListChecksIcon,
        cardBg: "bg-orange-100",
        iconBg: "bg-orange-500"
    },
    {
        title: "Mark Tasks Complete",
        description:
            "Track progress by marking tasks as complete and stay motivated throughout your day.",
        icon: CheckCircleIcon,
        cardBg: "bg-green-100",
        iconBg: "bg-green-500"
    },
    {
        title: "Clean & Focused Interface",
        description:
            "A distraction-free dashboard designed to keep you focused and productive.",
        icon: LayoutDashboardIcon,
        cardBg: "bg-indigo-100",
        iconBg: "bg-indigo-500"
    },
    {
        title: "Secure & Reliable",
        description:
            "Built on a modern backend architecture to keep your tasks safe and always accessible.",
        icon: ShieldCheckIcon,
        cardBg: "bg-pink-100",
        iconBg: "bg-pink-500"
    },
    {
        title: "Smart Reminders (Coming Soon)",
        description:
            "Get notified about important tasks with reminders and alerts planned for future updates.",
        icon: BellIcon,
        cardBg: "bg-lime-100",
        iconBg: "bg-lime-500"
    },
    {
        title: "Advanced Features (Planned)",
        description:
            "Upcoming advanced features and smart automation to make task management effortless.",
        icon: SparklesIcon,
        cardBg: "bg-gray-50",
        iconBg: "bg-orange-500"
    }
];
