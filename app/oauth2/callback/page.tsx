"use client";

export const dynamic = "force-dynamic";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
 
function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { authLoading, authError, loggedIn, googleLogin } = useAuth();

  useEffect(() => {
    const code = searchParams.get("code");

    if (!code) {
      router.replace("/login");
      return;
    }

    googleLogin({
      code,
      reqMeta: { google: "google-login" },
    });
  }, [searchParams, router]);

  useEffect(() => {
    if (!loggedIn) return;

    const timer = setTimeout(() => {
      router.replace("/");
    }, 1200);

    return () => clearTimeout(timer);
  }, [loggedIn, router]);

  return (
    <div className="flex min-h-screen items-center justify-center dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md border-none shadow-none dark:bg-gray-900">
        <CardHeader className="text-center space-y-3">
          <div className="flex justify-center">
            <FcGoogle size={42} />
          </div>

          <CardTitle className="text-xl font-semibold">
            Google Authentication
          </CardTitle>

          <CardDescription>
            We’re securely verifying your Google account.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center justify-center space-y-4 py-6">
          {authLoading && (
            <>
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">
                Processing your login...
              </p>
            </>
          )}

          {!authLoading && loggedIn && (
            <>
              <CheckCircle2 className="h-10 w-10 text-green-500" />
              <p className="text-sm font-medium text-green-600">
                Login successful!
              </p>
            </>
          )}

          {!authLoading && !loggedIn && (
            <>
              <XCircle className="h-10 w-10 text-red-500" />
              <p className="text-sm font-medium text-red-600">
                Authentication failed
              </p>
              <p className="text-xs text-muted-foreground text-center">
                {authError}
              </p>

              <Button
                variant="outline"
                onClick={() => router.back()}
              >
                Back
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
 
export default function Page() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <CallbackContent />
    </Suspense>
  );
}