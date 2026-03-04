"use client"
import { googleLogin } from '@/components/auth/google-login'
import { useRouter } from 'next/navigation'

const LoginPage = () => {
    const router = useRouter();

    const handlegoogleLogin = () => {
        googleLogin(router);
    };

    return (
        <button
            onClick={() => { handlegoogleLogin() }}
            className="flex items-center gap-3 px-6 py-3 rounded-lg bg-white shadow-md hover:shadow-lg transition border border-gray-200">

            <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
            />

            <span className="text-gray-700 font-medium">
                Login with Google
            </span>
        </button>
    )
}

export default LoginPage