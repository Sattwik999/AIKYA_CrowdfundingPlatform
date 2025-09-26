"use client"

import { useState } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "./ui/badge"
import { 
  MenuIcon, 
  Search, 
  Bell, 
  User, 
  LogOut, 
  Plus,
  Heart,
  Sparkles
} from "lucide-react"
import { AuthModal } from "@/components/auth-modal-nextauth"
import { UserProfileDropdown } from "@/components/user-profile-dropdown"

export function Header() {
  const { data: session, status } = useSession()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [notifications] = useState(3) // Mock notification count
  
  const isAuthenticated = !!session?.user
  const isLoading = status === "loading"

  return (
    <header className="relative bg-gradient-to-r from-blue-50 via-cyan-50 to-teal-50 backdrop-blur-sm border-b border-cyan-100/50 shadow-sm">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/8 via-cyan-500/8 to-teal-500/8 animate-pulse"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-200/12 to-transparent animate-shimmer"></div>
      
      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-between px-6 lg:px-8 py-2 min-h-[70px]">
        <Link href="/" className="relative flex items-center gap-3 group" prefetch={false}>
          <div className="relative flex items-center gap-1">
            <div className="relative">
              <img src="/aikya-logo.png" alt="AIKYA Logo" className="h-12 w-15 transition-all duration-300 group-hover:scale-110 opacity-90" style={{
                    mixBlendMode: 'multiply',
                    filter: 'brightness(1.1) contrast(1.1)'
                  }}/>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/15 to-teal-400/15 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent font-poppins group-hover:from-blue-700 group-hover:to-teal-700 transition-all duration-300">AIKYA</span>
        </Link>
        
        <nav className="flex items-center gap-8">
          {isAuthenticated && (
            <Link
              href="/dashboard"
              className="relative text-sm font-medium text-gray-700 hover:text-blue-600 transition-all duration-300 group"
              prefetch={false}
            >
              <span className="relative z-10">Dashboard</span>
              <div className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-500 to-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </Link>
          )}
          <Link
            href="/browse-fundraisers"
            className="relative text-sm font-bold text-gray-700 hover:text-blue-600 transition-all duration-300 group"
            prefetch={false}
          >
            <span className="relative z-10">Browse Fundraisers</span>
            <div className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-500 to-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </Link>
          <Link
            href="/nearby-free-meal"
            className="relative text-sm font-bold text-gray-700 hover:text-blue-600 transition-all duration-300 group"
            prefetch={false}
          >
            <span className="relative z-10">Nearby Free Meal</span>
            <div className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-500 to-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </Link>
          <Link 
            href="#" 
            className="relative text-sm font-bold text-gray-700 hover:text-blue-600 transition-all duration-300 group" 
            prefetch={false}
          >
            <span className="relative z-10">About Us</span>
            <div className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-500 to-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </Link>
        </nav>
        
        <div className="relative flex items-center gap-3">
          {/* Search Icon */}
          <Button 
            variant="ghost" 
            size="sm"
            className="h-9 w-9 p-0 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
          >
            <Search className="h-4 w-4" />
          </Button>

          {!isLoading && (
            <>
              {isAuthenticated ? (
                <>
                  {/* Notification Bell */}
                  <div className="relative">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-9 w-9 p-0 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
                    >
                      <Bell className="h-4 w-4" />
                    </Button>
                    {notifications > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-gradient-to-r from-red-500 to-pink-500 border-2 border-white animate-pulse">
                        {notifications}
                      </Badge>
                    )}
                  </div>

                  <UserProfileDropdown />

                  {/* My Profile Icon */}
                  <Button 
                    asChild 
                    variant="ghost" 
                    size="sm" 
                    className="h-9 w-9 p-0 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
                  >
                    <Link href="/profile">
                      <User className="h-4 w-4" />
                    </Link>
                  </Button>

                  {/* Logout Icon */}
                  <Button
                    variant="ghost"
                    size="sm"
                    aria-label="Log out"
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="h-9 w-9 p-0 text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-300"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <Button 
                  variant="ghost" 
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
                  onClick={() => setShowAuthModal(true)}
                >
                  Sign In
                </Button>
              )}
            </>
          )}

          {/* Enhanced Start a Fundraiser Button */}
          <Button 
            asChild
            className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
          >
            <Link href="/start-fundraiser">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center gap-2">
                <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
                <span>Start Fundraiser</span>
                <Sparkles className="h-4 w-4 opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>
          </Button>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Top row with hamburger menu */}
        <div className="flex items-center justify-end px-3 py-2">
          <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 h-8 w-8"
              >
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-gradient-to-b from-blue-50 to-teal-50 z-50 w-[280px] sm:w-[350px]">
              <div className="flex flex-col gap-4 p-4 pt-6 mt-6">
                {/* Search in Mobile */}
                <div className="flex items-center gap-2 p-3 bg-white/70 rounded-lg border border-blue-100">
                  <Search className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Search campaigns...</span>
                </div>

                {/* Notifications in Mobile */}
                {isAuthenticated && (
                  <div className="flex items-center justify-between p-3 bg-white/70 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Notifications</span>
                    </div>
                    {notifications > 0 && (
                      <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
                        {notifications}
                      </Badge>
                    )}
                  </div>
                )}

                {isAuthenticated && (
                  <Link
                    href="/dashboard"
                    className="text-lg font-bold text-gray-700 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-white/50"
                    prefetch={false}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Dashboard
                  </Link>
                )}
                <Link
                  href="/browse-fundraisers"
                  className="text-lg font-bold text-gray-700 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-white/50"
                  prefetch={false}
                  onClick={() => setShowMobileMenu(false)}
                >
                  Browse Fundraisers
                </Link>
                <Link
                  href="/nearby-free-meal"
                  className="text-lg font-bold text-gray-700 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-white/50"
                  prefetch={false}
                  onClick={() => setShowMobileMenu(false)}
                >
                  Nearby Free Meal
                </Link>
                {isAuthenticated && (
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 text-lg font-bold text-gray-700 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-white/50"
                    prefetch={false}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <User className="h-4 w-4" />
                    My Profile
                  </Link>
                )}
                <Link 
                  href="#" 
                  className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-white/50" 
                  prefetch={false}
                  onClick={() => setShowMobileMenu(false)}
                >
                  About Us
                </Link>
                {!isAuthenticated ? (
                  <Button 
                    variant="ghost"
                    onClick={() => {
                      setShowAuthModal(true)
                      setShowMobileMenu(false)
                    }}
                    className="justify-start text-gray-700 hover:text-blue-600 hover:bg-white/50"
                  >
                    Sign In
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      signOut({ callbackUrl: "/" })
                      setShowMobileMenu(false)
                    }}
                    className="flex items-center gap-2 justify-start text-gray-700 hover:text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Log out
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Centered Logo and Name */}
        <div className="flex justify-center pb-2">
          <Link href="/" className="relative flex items-center gap-3 group" prefetch={false}>
            <div className="relative flex items-center gap-1">
              <div className="relative">
                <img src="/aikya-logo.png" alt="AIKYA Logo" className="h-8 w-10 transition-all duration-300 group-hover:scale-110 opacity-90" style={{
                      mixBlendMode: 'multiply',
                      filter: 'brightness(1.1) contrast(1.1)'
                    }}/>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/15 to-teal-400/15 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent font-poppins group-hover:from-blue-700 group-hover:to-teal-700 transition-all duration-300">AIKYA</span>
          </Link>
        </div>

        {/* Centered Start Fundraiser Button */}
        <div className="flex justify-center pb-3">
          <Button 
            asChild
            className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
          >
            <Link href="/start-fundraiser">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center gap-2">
                <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
                <span>Start Fundraiser</span>
                <Sparkles className="h-4 w-4 opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>
          </Button>
        </div>
      </div>
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={() => setShowAuthModal(false)}
      />
    </header>
  )
}
