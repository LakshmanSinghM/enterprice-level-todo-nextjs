"use client"

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

const UserHome = () => {
    const { loggedIn, authLoading, authError } = useAuth();
    const router = useRouter();

    if (!loggedIn) router.push("/");

    return (
        <div className="flex flex-col gap-6 min-h-screen items-center justify-center dark:bg-gray-900">
            <h1 className='text-xl flex justify-center p-4'>Hello welcome to the todos dashboard  with metrices</h1>
        </div>
    )
}

export default UserHome