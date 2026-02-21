import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldAlert, AlertCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface VerificationGuardProps {
    isVerified: boolean | undefined;
    title?: string;
    description?: string;
    children: React.ReactNode;
}

export default function VerificationGuard({
    isVerified,
    title = "Verification Required",
    description = "You are not a verified user. Please verify your email to access this feature.",
    children
}: VerificationGuardProps) {
    return (
        <div className="relative flex-1 w-full min-h-0">
            {/* Overlay for Unverified Users */}
            {!isVerified && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/30 backdrop-blur-[4px] p-4">
                    <Card className="max-w-md w-full p-8 text-center shadow-2xl border-orange-100 flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-300">
                        <div className="p-4 bg-red-50 rounded-full">
                            <ShieldAlert className="w-12 h-12 text-red-600" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold text-foreground">{title}</h2>
                            <p className="text-muted-foreground text-sm">
                                {description}
                            </p>
                        </div>
                        <Link href="/profile" className="w-full">
                            <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white gap-2 h-11">
                                <AlertCircle className="w-4 h-4" />
                                Verify Now
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                    </Card>
                </div>
            )}

            {/* Main Content (Blurred if unverified) */}
            <div className={`h-full w-full transition-all duration-300 ${!isVerified ? 'blur-[4px] pointer-events-none select-none' : ''}`}>
                {children}
            </div>
        </div>
    );
}
