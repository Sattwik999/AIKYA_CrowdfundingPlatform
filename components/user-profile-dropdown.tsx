"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { useState, useCallback } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { User, LogOut, Shield } from "lucide-react"

export function UserProfileDropdown() {
  const { data: session, status } = useSession()
  const [open, setOpen] = useState(false)

  const handleOpenChange = useCallback((next: boolean) => {
    setOpen(next)
    // Debug log to help diagnose if Radix state is toggling
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line no-console
      console.log("[UserProfileDropdown] dropdown open:", next)
    }
  }, [])

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" })
  }

  if (status === "loading") {
    return (
      <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
    )
  }

  if (!session?.user) return null

  const user = session.user

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <DropdownMenu open={open} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="flex items-center space-x-2 px-3 py-2 h-auto"
          aria-haspopup="menu"
          aria-expanded={open}
          data-testid="user-profile-trigger"
          onClick={() => setOpen((prev) => !prev)}
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image || ""} alt={user.name || "User"} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:flex flex-col items-start">
            <div className="flex items-center space-x-1">
              <span className="text-sm font-medium">{user.name || "User"}</span>
              {user.isVerified && (
                <Shield className="h-3 w-3 text-green-500 fill-current" />
              )}
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-56" align="end" sideOffset={8} forceMount>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/profile">
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>My Profile</span>
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600" onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}