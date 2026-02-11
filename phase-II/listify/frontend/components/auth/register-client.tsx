'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SectionTitle from '@/components/section-title'
import { SparkleIcon } from 'lucide-react'
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


const RegisterClient = () => {
    const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const signinWithGithub = async () => {
        setLoadingProvider('github');
        try {
            await authClient.signIn.social({
                callbackURL: "/dashboard",
                provider: "github",
            });
        } catch (error) {
            console.error('GitHub sign in error:', error);
            toast.error('GitHub sign in failed. Please try again.');
        } finally {
            setLoadingProvider(null);
        }
    }

    const signinWithGoogle = async () => {
        setLoadingProvider('google');
        try {
            await authClient.signIn.social({
                callbackURL: "/dashboard",
                provider: "google",
            });
        } catch (error) {
            console.error('Google sign in error:', error);
            toast.error('Google sign in failed. Please try again.');
        } finally {
            setLoadingProvider(null);
        }
    }

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const hashed = await hashPassword(password);
            const { data, error } = await authClient.signUp.email({
                email,
                password: hashed,
                name,
                callbackURL: "/dashboard",
            });


            if (error) {
                toast.error(error.message || 'Registration failed. Please try again.');
            } else {
                toast.success('Registration successful! Redirecting...');
                router.push('/dashboard');
            }
        } catch (error) {
            console.error('Registration error:', error);
            toast.error('Something went wrong! Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen pt-20 w-full flex items-center justify-center px-4 md:px-16 lg:px-24 xl:px-32">

            {/* Main Card */}
            <AnimatedContent>
                <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* LEFT SIDE */}
                    <div className="hidden md:flex items-center justify-center bg-gradient-to-b from-orange-100 to-orange-50 p-10">
                        <img
                            src="/assets/logo-colored.svg"
                            alt="Listify Logo"
                            className="h-full w-auto object-contain"
                        />
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="flex flex-col items-center justify-center py-14 px-6">

                        <SectionTitle
                            dir="left"
                            icon={SparkleIcon}
                            title="Sign Up"
                            subtitle="Create your account to get started"
                        />

                        <AnimatedContent>
                            <form
                                className="md:w-96 w-80 flex flex-col items-center justify-center"
                                onSubmit={handleSignup}
                            >
                                {/* Social Buttons */}
                                <div className="mt-10 mb-2 grid w-full grid-cols-3 gap-6">
                                    {/* google button svg */}
                                    <button
                                        type="button"
                                        onClick={signinWithGoogle}
                                        disabled={loadingProvider === 'google'}
                                        className={`flex items-center justify-center rounded-full border border-gray-200 py-2.5 hover:bg-gray-50 focus:border-gray-300 cursor-pointer ${loadingProvider === 'google' ? 'opacity-75 cursor-not-allowed' : ''
                                            }`}
                                    >
                                        {loadingProvider === 'google' ? (
                                            <svg className="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        ) : (
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0_8755_1278)">
                                                    <path d="M12 9.81836V14.4656H18.4582C18.1746 15.9602 17.3236 17.2257 16.0472 18.0766L19.9417 21.0984C22.2108 19.0039 23.5199 15.9276 23.5199 12.273C23.5199 11.4221 23.4436 10.6039 23.3017 9.81849L12 9.81836Z" fill="#4285F4" />
                                                    <path d="M5.27657 14.2842L4.3982 14.9566L1.28906 17.3783C3.2636 21.2947 7.31058 24.0002 12.0014 24.0002C15.2414 24.0002 17.9577 22.9311 19.9432 21.0984L16.0487 18.0765C14.9796 18.7965 13.6159 19.2329 12.0014 19.2329C8.88146 19.2329 6.23063 17.1275 5.28147 14.2911L5.27657 14.2842Z" fill="#34A853" />
                                                    <path d="M1.28718 6.62207C0.469042 8.23655 0 10.0584 0 12.0002C0 13.942 0.469042 15.7638 1.28718 17.3783C1.28718 17.3891 5.27997 14.2801 5.27997 14.2801C5.03998 13.5601 4.89812 12.7965 4.89812 12.0001C4.89812 11.2036 5.03998 10.44 5.27997 9.72L1.28718 6.62207Z" fill="#FBBC05" />
                                                    <path d="M12.0017 4.77818C13.769 4.77818 15.3399 5.38907 16.5944 6.56727L20.0307 3.13095C17.9471 1.18917 15.2417 0 12.0017 0C7.31082 0 3.2636 2.69454 1.28906 6.62183L5.28174 9.72001C6.23077 6.88362 8.88171 4.77818 12.0017 4.77818Z" fill="#EA4335" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_8755_1278">
                                                        <rect width="24" height="24" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        )}
                                    </button>

                                    {/* github button svg */}
                                    <button
                                        type="button"
                                        onClick={signinWithGithub}
                                        disabled={loadingProvider === 'github'}
                                        className={`flex items-center justify-center rounded-full border border-gray-200 py-2.5 hover:bg-gray-50 focus:border-gray-300 cursor-pointer ${loadingProvider === 'github' ? 'opacity-75 cursor-not-allowed' : ''
                                            }`}
                                    >
                                        {loadingProvider === 'github' ? (
                                            <svg className="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                                <g fill="none">
                                                    <g clipPath="url(#SVGXv8lpc2Y)">
                                                        <path fill="currentColor" fillRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12" clipRule="evenodd" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="SVGXv8lpc2Y">
                                                            <path fill="#fff" d="M0 0h24v24H0z" />
                                                        </clipPath>
                                                    </defs>
                                                </g>
                                            </svg>
                                        )}
                                    </button>


                                    {/* facbook button svg */}
                                    <button type="button" className="flex items-center justify-center rounded-full border border-gray-200 py-2.5 hover:bg-gray-50 focus:border-gray-300 cursor-pointer opacity-50 cursor-not-allowed" disabled>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_8755_1272)">
                                                <path d="M24 12C24 5.37264 18.6274 0 12 0C5.37264 0 0 5.37264 0 12C0 17.6275 3.87456 22.3498 9.10128 23.6467V15.6672H6.62688V12H9.10128V10.4198C9.10128 6.33552 10.9498 4.4424 14.9597 4.4424C15.72 4.4424 17.0318 4.59168 17.5685 4.74048V8.06448C17.2853 8.03472 16.7933 8.01984 16.1822 8.01984C14.2147 8.01984 13.4544 8.76528 13.4544 10.703V12H17.3741L16.7006 15.6672H13.4544V23.9122C19.3963 23.1946 24.0005 18.1354 24.0005 12H24Z" fill="#0866FF" />
                                                <path d="M16.6988 15.6672L17.3722 12H13.4525V10.703C13.4525 8.76526 14.2128 8.01982 16.1804 8.01982C16.7914 8.01982 17.2834 8.0347 17.5666 8.06446V4.74046C17.03 4.59118 15.7181 4.44238 14.9578 4.44238C10.9479 4.44238 9.0994 6.3355 9.0994 10.4198V12H6.625V15.6672H9.0994V23.6467C10.0277 23.8771 10.9988 24 11.9981 24C12.4901 24 12.9754 23.9697 13.452 23.9121V15.6672H16.6983H16.6988Z" fill="white" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_8755_1272">
                                                    <rect width="24" height="24" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </button>
                                </div>

                                {/* Divider */}
                                <div className="flex items-center gap-4 w-full my-5">
                                    <div className="flex-1 h-px bg-gray-300/90"></div>
                                    <p className="text-nowrap text-sm text-gray-500/90">or sign up with email</p>
                                    <div className="flex-1 h-px bg-gray-300/90"></div>
                                </div>

                                {/* Name */}
                                <div className="flex items-center w-full border border-gray-300/60 h-12 rounded-full pl-6 gap-2 mb-6">
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        autoComplete="name"
                                        className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full"
                                        required
                                    />
                                </div>

                                {/* Email */}
                                <div className="flex items-center w-full border border-gray-300/60 h-12 rounded-full pl-6 gap-2">
                                    <input
                                        type="email"
                                        placeholder="Email id"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        autoComplete="email"
                                        className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full"
                                        required
                                    />
                                </div>

                                {/* Password */}
                                <div className="flex items-center mt-6 w-full border border-gray-300/60 h-12 rounded-full pl-6 gap-2">
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        autoComplete="new-password"
                                        className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full"
                                        required
                                    />
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="mt-8 w-full h-11 bg-gradient-to-tr from-orange-600 to-orange-500 text-white rounded-full flex items-center justify-center"
                                >
                                    {isSubmitting ? (
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : 'Register'}
                                </button>

                                <p className="text-gray-500/90 text-sm mt-4">
                                    Already have an account?{' '}
                                    <a className="text-orange-500 hover:underline" href="/login">
                                        Sign in
                                    </a>
                                </p>
                            </form>
                        </AnimatedContent>
                    </div>
                </div>
            </AnimatedContent>

        </div>
    )
}

export default RegisterClient
