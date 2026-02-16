import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import ChatView from '@/components/chat-view';

export default async function ChatPage() {
    const session = await getSession();

    if (!session?.user) {
        redirect('/login');
    }

    return (
        <div className="flex flex-col gap-4 h-[calc(100vh-6rem)]">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">AI Assistant</h1>
            </div>
            <div className="flex-1 min-h-0">
                <ChatView userId={session.user.id} />
            </div>
        </div>
    );
}
