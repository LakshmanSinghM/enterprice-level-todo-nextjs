"use client"

import { Button } from "@/components/ui/button"
import { HelpCircle, LogOut, Moon, Settings, Sun, User } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { useAuth } from "@/hooks/useAuth"
import { getFirstLetterOfName } from "@/utils/user-util/userHelper"

const Header = () => {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false);
    const { user, authLoading } = useAuth();

    console.log("User ", user)

    // Only render theme-dependent UI after mounting on the client
    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <div className="flex justify-between items-center dark:bg-gray-900 px-2 border-b sticky top-0 left-0 z-10">
            <h1 className="text-xl font-bold">PrioTask</h1>
            <div className="flex items-center gap-2">
                <Button
                    variant="link"
                    size="sm"
                    className="rounded-md shadow"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    suppressHydrationWarning>

                    {mounted ? (
                        theme === "dark" ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )
                    ) : (
                        <Moon className="h-5 w-5" />
                    )}
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            className="relative h-15 w-15 rounded-full"
                            variant="ghost"
                        >
                            {
                                authLoading ? <p>loding</p> :
                                    <Avatar>
                                        <AvatarImage
                                            alt=""
                                            src=""
                                        />
                                        <AvatarFallback>
                                            {getFirstLetterOfName(user?.firstName, user?.lastName)}
                                        </AvatarFallback>
                                    </Avatar>
                            }
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="font-medium text-sm leading-none">Hayden Bleasel</p>
                                <p className="text-muted-foreground text-xs leading-none">hello@haydenbleasel.com</p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <User />
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Settings />
                            Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <HelpCircle />
                            Help
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">
                            <LogOut />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default Header