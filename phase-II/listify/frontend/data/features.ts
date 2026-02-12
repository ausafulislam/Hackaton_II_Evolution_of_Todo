import {
    ListChecksIcon,
    CheckCircleIcon,
    LayoutDashboardIcon,
    ShieldCheckIcon,
    MailIcon,
    BarChart3Icon,
    UserCircleIcon,
    LockIcon,
    UsersIcon
} from "lucide-react";
import { IFeature } from "../types";

export const features: IFeature[] = [
    {
        title: "Create & Manage Tasks",
        description:
            "Easily add, edit and organize your daily tasks with a clean, intuitive interface. Never forget what's important.",
        icon: ListChecksIcon,
        cardBg: "bg-orange-100",
        iconBg: "bg-orange-500"
    },
    {
        title: "Mark Tasks Complete",
        description:
            "Track your progress by marking tasks as complete. Stay motivated and see your productivity grow.",
        icon: CheckCircleIcon,
        cardBg: "bg-green-100",
        iconBg: "bg-green-500"
    },
    {
        title: "Email Verification",
        description:
            "Secure your account with OTP-based email verification. Includes smart resend countdown to prevent spam.",
        icon: MailIcon,
        cardBg: "bg-blue-100",
        iconBg: "bg-blue-500"
    },
    {
        title: "Analytics Dashboard",
        description:
            "Visualize your productivity with charts and metrics. Track completion rates and daily activity (verified users only).",
        icon: BarChart3Icon,
        cardBg: "bg-purple-100",
        iconBg: "bg-purple-500"
    },
    {
        title: "Profile Management",
        description:
            "Customize your profile with image uploads, update your information, and manage your account settings.",
        icon: UserCircleIcon,
        cardBg: "bg-pink-100",
        iconBg: "bg-pink-500"
    },
    {
        title: "Secure Authentication",
        description:
            "SHA-256 password hashing, social login with Google & GitHub, and industry-standard security practices.",
        icon: LockIcon,
        cardBg: "bg-red-100",
        iconBg: "bg-red-500"
    },
    {
        title: "Clean & Focused Interface",
        description:
            "A distraction-free dashboard with modern design, smooth animations, and responsive layouts for all devices.",
        icon: LayoutDashboardIcon,
        cardBg: "bg-teal-100",
        iconBg: "bg-teal-500"
    },
    {
        title: "Community Presence",
        description:
            "Your custom profile pictures are dynamically showcased on our landing page, celebrating our growing community of users.",
        icon: UsersIcon,
        cardBg: "bg-amber-100",
        iconBg: "bg-amber-500"
    }
];
