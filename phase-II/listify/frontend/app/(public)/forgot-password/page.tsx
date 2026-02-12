import ForgotPasswordClient from "@/components/auth/forgot-password-client";
import Navbar from "@/components/navbar";

export const metadata = {
    title: 'Forgot Password | Listify',
    description: 'Reset your Listify account password securely.',
}

export default function ForgotPasswordPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />
            <ForgotPasswordClient />
        </main>
    )
}
