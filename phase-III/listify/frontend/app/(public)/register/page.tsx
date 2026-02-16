import RegisterClient from '@/components/auth/register-client'
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

const RegisterPage = async () => {
    const session = await getSession();

    if (session) {
        redirect('/dashboard');
    }

    return <RegisterClient />
}

export default RegisterPage
