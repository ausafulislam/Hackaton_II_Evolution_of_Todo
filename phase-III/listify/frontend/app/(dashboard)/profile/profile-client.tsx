'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@/types'
import { authClient } from '@/lib/auth-client'
import toast from 'react-hot-toast'
import Image from 'next/image'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Loader2, Trash2, User as UserIcon, Camera, CheckCircle2, XCircle, Mail } from 'lucide-react'

interface ProfileClientProps {
    user: User
}

export default function ProfileClient({ user }: ProfileClientProps) {
    const [name, setName] = useState(user.name || '')
    const [image, setImage] = useState(user.image || '')
    const [isUpdating, setIsUpdating] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isVerifying, setIsVerifying] = useState(false)
    const [otp, setOtp] = useState('')
    const [showOtpInput, setShowOtpInput] = useState(false)
    const [isSendingOtp, setIsSendingOtp] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [countdown, setCountdown] = useState(0)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    // Countdown timer for OTP resend
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
            return () => clearTimeout(timer)
        }
    }, [countdown])

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // 1MB = 1024 * 1024 bytes
        if (file.size > 1024 * 1024) {
            toast.error('Image size must be less than 1MB')
            return
        }

        const reader = new FileReader()
        reader.onloadend = () => {
            const img = new (window as any).Image()
            img.onload = () => {
                const canvas = document.createElement('canvas')
                const MAX_WIDTH = 400
                const MAX_HEIGHT = 400
                let width = img.width
                let height = img.height

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width
                        width = MAX_WIDTH
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height
                        height = MAX_HEIGHT
                    }
                }

                canvas.width = width
                canvas.height = height
                const ctx = canvas.getContext('2d')
                ctx?.drawImage(img, 0, 0, width, height)

                // Compress to JPEG with 0.7 quality for small size
                const base64String = canvas.toDataURL('image/jpeg', 0.7)
                setImage(base64String)
            }
            img.src = reader.result as string
        }
        reader.readAsDataURL(file)
    }

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsUpdating(true)
        try {
            const { data, error } = await authClient.updateUser({
                name,
                image,
            })

            if (error) {
                toast.error(error.message || 'Failed to update profile')
            } else {
                toast.success('Profile updated successfully')
                router.refresh()
            }
        } catch (err) {
            toast.error('Something went wrong')
        } finally {
            setIsUpdating(false)
        }
    }

    const handleDeleteAccount = async () => {
        setIsDeleting(true)
        try {
            const { error } = await authClient.deleteUser()

            if (error) {
                toast.error(error.message || 'Failed to delete account')
                setIsDeleting(false)
            } else {
                toast.success('Account deleted successfully')
                setIsDeleteDialogOpen(false)
                setTimeout(() => {
                    router.push('/login')
                }, 1500)
            }
        } catch (err) {
            toast.error('Something went wrong')
            setIsDeleting(false)
        }
    }

    const handleSendOtp = async () => {
        setIsSendingOtp(true)
        try {
            const { error } = await authClient.emailOtp.sendVerificationOtp({
                email: user.email,
                type: 'email-verification',
            })

            if (error) {
                toast.error(error.message || 'Failed to send OTP')
            } else {
                toast.success('OTP sent to your email')
                setShowOtpInput(true)
                setCountdown(60) // Start 60 second countdown
            }
        } catch (err) {
            toast.error('Something went wrong')
        } finally {
            setIsSendingOtp(false)
        }
    }

    const handleVerifyOtp = async () => {
        setIsVerifying(true)
        try {
            const { error } = await authClient.emailOtp.verifyEmail({
                email: user.email,
                otp: otp,
            })

            if (error) {
                toast.error(error.message || 'Verification failed')
            } else {
                toast.success('Email verified successfully')
                setShowOtpInput(false)
                router.refresh()
            }
        } catch (err) {
            toast.error('Something went wrong')
        } finally {
            setIsVerifying(false)
        }
    }

    return (
        <div className="space-y-6">
            <Card className="border-orange-100 shadow-md overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-white border-b border-orange-100">
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your name and profile picture</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <form onSubmit={handleUpdate} className="space-y-6">
                        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                                <div className="size-24 rounded-full overflow-hidden bg-orange-100 flex items-center justify-center border-2 border-orange-200">
                                    {image ? (
                                        <Image src={image} alt={name} width={96} height={96} className="object-cover" />
                                    ) : (
                                        <UserIcon className="size-12 text-orange-400" />
                                    )}
                                </div>
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
                                    <Camera className="text-white size-6" />
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                                <p className="text-[10px] text-orange-600/70 mt-2 text-center max-w-[96px] leading-tight italic">
                                    Note: Custom images may be featured on our landing page.
                                </p>
                            </div>


                            <div className="flex-1 space-y-4 w-full">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter your name"
                                        className="focus-visible:ring-orange-500"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="email">Email Address</Label>
                                        <div className="flex items-center gap-2">
                                            {user.emailVerified ? (
                                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 gap-1 px-2 py-0.5 animate-in fade-in zoom-in duration-300">
                                                    <CheckCircle2 className="size-3" />
                                                    Verified
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 gap-1 px-2 py-0.5">
                                                    <XCircle className="size-3" />
                                                    Not Verified
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <Input
                                            id="email"
                                            value={user.email}
                                            disabled
                                            className="bg-gray-50 cursor-not-allowed flex-1"
                                        />
                                        {!user.emailVerified && !showOtpInput && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={handleSendOtp}
                                                disabled={isSendingOtp}
                                                className="border-orange-200 text-orange-600 hover:bg-orange-50 hover:text-orange-700 h-10 px-4"
                                            >
                                                {isSendingOtp ? <Loader2 className="size-3 animate-spin mr-2" /> : <Mail className="size-3 mr-2" />}
                                                Verify Now
                                            </Button>
                                        )}
                                    </div>

                                    {showOtpInput && (
                                        <div className="bg-orange-50 p-4 rounded-lg border border-orange-100 mt-2 space-y-3 animate-in slide-in-from-top-2 duration-300">
                                            <div className="space-y-1">
                                                <Label htmlFor="otp" className="text-orange-800 font-medium">Enter 6-digit OTP</Label>
                                                <p className="text-xs text-orange-700/70">Check your email for the verification code.</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <Input
                                                    id="otp"
                                                    value={otp}
                                                    onChange={(e) => setOtp(e.target.value)}
                                                    placeholder="123456"
                                                    maxLength={6}
                                                    className="focus-visible:ring-orange-500 bg-white"
                                                />
                                                <Button
                                                    type="button"
                                                    onClick={handleVerifyOtp}
                                                    disabled={isVerifying || otp.length < 6}
                                                    className="bg-orange-600 hover:bg-orange-700 text-white shadow-sm"
                                                >
                                                    {isVerifying ? <Loader2 className="size-4 animate-spin mr-2" /> : 'Verify'}
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    onClick={() => setShowOtpInput(false)}
                                                    className="text-gray-500 hover:text-gray-700"
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                            <div className="flex items-center justify-between pt-2 border-t border-orange-200">
                                                <p className="text-xs text-orange-700/70">Didn't receive the code?</p>
                                                <Button
                                                    type="button"
                                                    variant="link"
                                                    size="sm"
                                                    onClick={handleSendOtp}
                                                    disabled={countdown > 0 || isSendingOtp}
                                                    className="text-orange-600 hover:text-orange-700 h-auto p-0 text-xs"
                                                >
                                                    {countdown > 0 ? (
                                                        `Resend in ${countdown}s`
                                                    ) : isSendingOtp ? (
                                                        <>
                                                            <Loader2 className="size-3 animate-spin mr-1" />
                                                            Sending...
                                                        </>
                                                    ) : (
                                                        'Resend Code'
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                    <p className="text-xs text-muted-foreground italic">Email cannot be changed currently</p>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="image">Profile Image URL</Label>
                                    <Input
                                        id="image"
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                        placeholder="https://example.com/avatar.png"
                                        className="focus-visible:ring-orange-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4 border-t border-gray-100">
                            <Button
                                type="submit"
                                disabled={isUpdating}
                                className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 shadow-md"
                            >
                                {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Card className="border-red-100 shadow-md overflow-hidden">
                <CardHeader className="bg-red-50/50 border-b border-red-100">
                    <CardTitle className="text-red-600">Danger Zone</CardTitle>
                    <CardDescription>Permanently delete your account and all associated data</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-red-50/30 border border-red-100">
                        <div>
                            <h4 className="font-semibold text-red-900">Delete Account</h4>
                            <p className="text-sm text-red-700/80">Once you delete your account, there is no going back. All your tasks will be erased.</p>
                        </div>
                        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="destructive"
                                    className="shrink-0 shadow-sm transition-all hover:scale-105"
                                    onClick={() => setIsDeleteDialogOpen(true)}
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Account
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="border-red-200">
                                <AlertDialogHeader>
                                    <AlertDialogTitle className="text-red-600">Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your
                                        account and remove all your tasks from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                                    <Button
                                        onClick={handleDeleteAccount}
                                        disabled={isDeleting}
                                        variant="destructive"
                                        className="bg-red-600 hover:bg-red-700 text-white"
                                    >
                                        {isDeleting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Deleting...
                                            </>
                                        ) : 'Yes, Delete My Account'}
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
