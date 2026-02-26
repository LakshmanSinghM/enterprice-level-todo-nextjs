"use client"

import { RegisterForm } from "@/components/auth/Register";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 min-h-screen items-center justify-center dark:bg-gray-900">
      <RegisterForm />
    </div>
  );
}