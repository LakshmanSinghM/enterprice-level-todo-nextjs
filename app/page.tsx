"use client"

import { RegisterForm } from "@/components/auth/Register";
import { useAuth } from "@/hooks/useAuth";
import { useCurrentUser } from "@/hooks/useUser";
import { getCookieByKey, getLocalStorageItem } from "@/utils/storage/storageHelper";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const { loggedIn } = useAuth();
  const [mounted, setMounted] = useState<boolean>(false);
  const { fetchCurrentUserData, userLoading, userMessage, userError, user } = useCurrentUser();

  useEffect(() => {

    if (!user) {
      fetchCurrentUserData();
    }
    // const userLoggedIn = loggedIn || getCookieByKey("authToken") || getLocalStorageItem("authToken");
    // if (userLoggedIn) {
    //   router.replace("/user")
    // }
    // setMounted(true);
  }, [])

  return (
    <div>
      {
        // mounted &&
        <div className="flex flex-col gap-6 min-h-screen items-center justify-center dark:bg-gray-900">
          <RegisterForm />
        </div>
      }
    </div>
  );
}