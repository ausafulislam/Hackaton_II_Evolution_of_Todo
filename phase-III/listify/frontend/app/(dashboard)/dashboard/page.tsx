import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import DashboardClient from './dashboard-client'


const DashboardPage = async () => {
    const session = await getSession()

    if (!session) {
        redirect('/login')
    }

    return <DashboardClient user={session.user} />
}

export default DashboardPage
