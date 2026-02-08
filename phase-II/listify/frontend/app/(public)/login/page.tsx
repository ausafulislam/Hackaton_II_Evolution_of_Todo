import LoginClient from '@/components/auth/login-client'
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

const LoginPage = async () => {
    const session = await getSession();

    if (session) {
        redirect('/dashboard');
    }

    return <LoginClient />
}

export default LoginPage
