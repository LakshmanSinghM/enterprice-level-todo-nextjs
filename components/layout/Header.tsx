"use client"

import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

const Header = () => {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Only render theme-dependent UI after mounting on the client
    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <div className="flex justify-between items-center p-4 border-b">
            <h1 className="text-xl font-bold">PrioTask</h1>
            <Button
                variant="outline"
                size="icon"
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
        </div>
    )
}

export default Header