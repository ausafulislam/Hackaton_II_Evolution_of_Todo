'use client'

import { useState } from 'react';
import Link from 'next/link'
import SectionTitle from '@/components/section-title'
import { SparkleIcon, Eye, EyeOff, Loader2, Mail, Lock, ShieldCheck } from 'lucide-react'
import AnimatedContent from '@/components/animated-content'
import toast from 'react-hot-toast'
import { authClient } from '@/lib/auth-client'

async function hashPassword(password: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

const ForgotPasswordClient = () => {
    const [step, setStep] = useState<'email' | 'reset'>('email');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const { error } = await authClient.emailOtp.sendVerificationOtp({
                email,
                type: 'forget-password',
            });

            if (error) {
                toast.error(error.message || 'Failed to send OTP. Please check your email.');
            } else {
                toast.success('OTP sent to your email!');
                setStep('reset');
            }
        } catch (error) {
            console.error('Send OTP error:', error);
            toast.error('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (otp.length !== 6) {
            toast.error('Please enter a valid 6-digit OTP');
            return;
        }
        if (newPassword.length < 8) {
            toast.error('Password must be at least 8 characters long');
            return;
        }

        setIsSubmitting(true);
        try {
            const hashed = await hashPassword(newPassword);
            const { error } = await authClient.emailOtp.resetPassword({
                email,
                otp,
                password: hashed,
            });

            if (error) {
                toast.error(error.message || 'Reset failed. Please check your OTP.');
            } else {
                toast.success('Password reset successfully! Please login.');
                window.location.href = '/login';
            }
        } catch (error) {
            console.error('Reset password error:', error);
            toast.error('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen pt-20 w-full flex items-center justify-center px-4 md:px-16 lg:px-24 xl:px-32">
            <AnimatedContent>
                <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-lg overflow-hidden border border-orange-100">
                    {/* LEFT SIDE - Visual */}
                    <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-b from-orange-100 to-orange-50 p-10 space-y-6">
                        <img
                            src="/assets/logo-colored.svg"
                            alt="Listify Logo"
                            className="h-24 w-auto object-contain"
                        />
                        <div className="text-center space-y-2">
                            <h3 className="font-bold text-orange-800 text-xl">Secure Access</h3>
                            <p className="text-orange-700/70 text-sm max-w-[200px]">
                                We'll help you get back into your account in just a few steps.
                            </p>
                        </div>
                        <ShieldCheck className="size-20 text-orange-500/20" />
                    </div>

                    {/* RIGHT SIDE - Form */}
                    <div className="flex flex-col items-center justify-center py-14 px-6 relative">
                        <Link
                            href="/login"
                            className="absolute top-6 left-6 text-xs text-gray-500 hover:text-orange-600 transition-colors flex items-center gap-1"
                        >
                            ← Back to Login
                        </Link>

                        <SectionTitle
                            dir="left"
                            icon={SparkleIcon}
                            title={step === 'email' ? "Forgot Password" : "Reset Password"}
                            subtitle={step === 'email' ? "Enter your email to receive an OTP" : "Enter the OTP and your new password"}
                        />

                        <AnimatedContent className="w-full max-w-sm mt-8">
                            {step === 'email' ? (
                                <form onSubmit={handleSendOtp} className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center w-full border border-gray-300/60 h-12 rounded-full pl-6 pr-4 gap-2 focus-within:border-orange-500 transition-colors">
                                            <Mail className="size-4 text-gray-400" />
                                            <input
                                                type="email"
                                                placeholder="Email address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                autoComplete="email"
                                                className="bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm w-full"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full h-11 bg-gradient-to-tr from-orange-600 to-orange-500 text-white rounded-full flex items-center justify-center font-medium shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70"
                                    >
                                        {isSubmitting ? (
                                            <Loader2 className="animate-spin h-5 w-5 text-white" />
                                        ) : (
                                            'Send Verification Code'
                                        )}
                                    </button>
                                </form>
                            ) : (
                                <form onSubmit={handleResetPassword} className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center w-full border border-gray-300/60 h-12 rounded-full pl-6 pr-4 gap-2 focus-within:border-orange-500 transition-colors">
                                                <input
                                                    type="text"
                                                    placeholder="6-digit OTP"
                                                    value={otp}
                                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                                    maxLength={6}
                                                    className="bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm w-full tracking-[0.5em] font-mono text-center"
                                                    required
                                                />
                                            </div>
                                            <p className="text-[10px] text-gray-400 text-center">Enter the code sent to {email}</p>
                                        </div>

                                        <div className="flex items-center w-full border border-gray-300/60 h-12 rounded-full pl-6 pr-4 gap-2 focus-within:border-orange-500 transition-colors">
                                            <Lock className="size-4 text-gray-400" />
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="New Password"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                className="bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm w-full"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="text-gray-400 hover:text-gray-600 transition-colors"
                                            >
                                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full h-11 bg-gradient-to-tr from-orange-600 to-orange-500 text-white rounded-full flex items-center justify-center font-medium shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70"
                                    >
                                        {isSubmitting ? (
                                            <Loader2 className="animate-spin h-5 w-5 text-white" />
                                        ) : (
                                            'Reset Password'
                                        )}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setStep('email')}
                                        className="w-full text-sm text-gray-500 hover:text-orange-600 transition-colors"
                                    >
                                        Resend Code
                                    </button>
                                </form>
                            )}
                        </AnimatedContent>
                    </div>
                </div>
            </AnimatedContent>
        </div>
    )
}

export default ForgotPasswordClient
