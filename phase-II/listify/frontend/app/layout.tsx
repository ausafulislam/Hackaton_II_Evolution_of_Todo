import { Inter, Urbanist } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import Navbar from "@/components/navbar";
import LenisScroll from "@/components/lenis";
import Footer from "@/components/footer";
import { Toaster } from "react-hot-toast";
import { cn } from "@/lib/utils";


const inter = Inter({
    variable: "--font-sans",
    subsets: ["latin"],
});

const urbanist = Urbanist({
    variable: "--font-urbanist",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        default: "Listify – Your Personal Todo Manager",
        template: "%s | Listify",
    },
    description:
        "Listify is a modern, intuitive todo application that helps you organize tasks, boost productivity, and achieve your goals. Simple, secure, and beautifully designed.",
    keywords: [
        "todo app",
        "task manager",
        "productivity tool",
        "task organizer",
        "to-do list",
        "personal organization",
        "work management",
    ],
    authors: [{ name: "Ausaf" }],
    creator: "Ausaf",
    applicationName: "Listify",
    appleWebApp: {
        title: "Listify",
        capable: true,
        statusBarStyle: "default",
    },
    openGraph: {
        title: "Listify – Organize Your Tasks, Boost Your Productivity",
        description:
            "A modern todo application to help you manage tasks, increase productivity, and stay organized. Simple, secure, and beautifully designed.",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Listify – Organize Your Tasks, Boost Your Productivity",
        description:
            "A modern todo application to help you manage tasks, increase productivity, and stay organized.",
    },
};
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={cn(inter.variable, urbanist.variable)}>
            <body className="min-h-screen bg-background antialiased">
                <Toaster position="top-right" reverseOrder={false} />
                <LenisScroll />
                {/* <Navbar /> */}
                {children}
                {/* <Footer /> */}
            </body>
        </html>
    );
}
