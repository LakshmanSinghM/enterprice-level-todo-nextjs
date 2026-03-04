"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    InputGroup
} from "@/components/ui/input-group"
import { useToast } from "@/hooks/useToast"
import { useRouter } from "next/navigation"
import { FcGoogle } from "react-icons/fc"
import { googleLogin as redirectGoogleLogin } from "./google-login"
import { useAppDispatch } from "@/redux/hooks"
import { registerRequest } from "@/redux/slices/authSlice"
import { UserAuthRequestPayload } from "@/types/userAndAuthTypes"
import { useAuth } from "@/hooks/useAuth"
import { useEffect } from "react"

const formSchema = z.object({
    email: z.string().email("Please enter a valid email."),
    password: z.string().min(6, "Password must be at least 6 characters.").max(32, "Password must be at most 32 characters."),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
})

export function RegisterForm() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { authLoading, authError, errors, authMessage, loggedIn, register } = useAuth();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        const payload: UserAuthRequestPayload = {
            user: {
                email: data.email,
                password: data.password,
            },
            reqMeta: {
                resiter: "registerRequest"
            }
        }
        register(payload);
        // useToast("Registation successful", { type: "success", position: "bottom-right" });
        // form.reset()
    }

    useEffect(() => {
        if (authError) {
            useToast(authError, { type: "error" })
        }
    }, [authError])

    function handleGoogleLogin() {
        redirectGoogleLogin(router);
    }

    return (
        <Card className="w-full sm:max-w-md  shadow-none! border-none!">
            <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>
                    Register using your email and password.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>

                        {/* Email */}
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="register-email">
                                        Email
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="register-email"
                                        type="email"
                                        placeholder="you@example.com"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        {/* Password */}
                        <Controller
                            name="password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="register-password">
                                        Password
                                    </FieldLabel>

                                    <InputGroup>
                                        <Input
                                            {...field}
                                            id="register-password"
                                            type="password"
                                            placeholder="Enter password"
                                            aria-invalid={fieldState.invalid}
                                        />
                                    </InputGroup>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        {/* Confirm Password */}
                        <Controller
                            name="confirmPassword"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="register-confirm-password">
                                        Confirm Password
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="register-confirm-password"
                                        type="password"
                                        placeholder="Confirm password"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>

            <CardFooter>
                <Field orientation="vertical">
                    <div className="flex gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => form.reset()}
                        >
                            Reset
                        </Button>
                        <Button type="submit" form="register-form">
                            Register
                        </Button>
                    </div>
                    <br />
                    <Button
                        onClick={() => { handleGoogleLogin() }}>
                        <FcGoogle />
                        Continue with google
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    )
}