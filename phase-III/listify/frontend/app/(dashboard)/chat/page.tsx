'use client';

import { redirect } from 'next/navigation';
import ChatView from '@/components/chat-view';
import { authClient } from '@/lib/auth-client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldAlert, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import VerificationGuard from '@/components/verification-guard';

export default function ChatPage() {
    const { data: session, isPending: isSessionPending } = authClient.useSession();

    if (isSessionPending) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
                <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-4" />
                <p className="text-muted-foreground">Checking authorization...</p>
            </div>
        );
    }

    if (!session?.user) {
        redirect('/login');
    }

    const isVerified = session.user.emailVerified;

    return (
        <div className="flex flex-col gap-4 h-[calc(100vh-6rem)] overflow-hidden">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">AI Assistant</h1>
            </div>

            <VerificationGuard
                isVerified={isVerified}
                description="You are not a verified user. To interact with the AI Assistant, please verify your email first."
            >
                <div className="h-full">
                    <ChatView userId={session.user.id} userName={session.user.name} userImage={session.user.image} />
                </div>
            </VerificationGuard>
        </div>
    );
}

