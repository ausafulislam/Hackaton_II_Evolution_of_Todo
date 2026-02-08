"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";


export const SignOutButton = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const signout = async () => {
        setIsLoading(true);
        try {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => router.push('/'),
                },
            });
        } catch (error) {
            console.error('Sign out error:', error);
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={signout}
            disabled={isLoading}
            className={`py-3 md:py-2.5 w-full md:w-auto px-8 border border-orange-200 bg-linear-to-tl from-orange-600 to-orange-500 text-white text-center rounded-full cursor-pointer flex items-center justify-center ${isLoading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
        >
            {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing out...
                </>
            ) : (
                'Sign Out'
            )}
        </button>
    );
}