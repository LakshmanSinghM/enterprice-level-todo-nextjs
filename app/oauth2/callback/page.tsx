"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
// import axios from "axios";

export default function Page() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const code = searchParams.get("code");

        // console.log("Full URL:", window.location.href);
        // console.log("Code:", code);

        if (!code) {
            router.push("/login");
            return;
        }

        // axios.post(
        //   "http://localhost:8080/api/auth/google",
        //   { code },
        //   { withCredentials: true } // REQUIRED for cookies
        // )
        // .then(() => {
        //   router.push("/dashboard");
        // })
        // .catch((err) => {
        //   console.error(err);
        //   router.push("/login");
        // });
    }, [searchParams, router]);

    return <div>Processing Google Login...</div>;
}