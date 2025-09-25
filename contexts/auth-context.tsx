"use client"

import { useSession } from "next-auth/react"
import { createContext, useContext, ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  isVerified: boolean
  provider?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()
  
  const user = session?.user ? {
    id: session.user.id,
    name: session.user.name || "",
    email: session.user.email || "",
    phone: session.user.phone,
    avatar: session.user.image || undefined,
    isVerified: session.user.isVerified,
    provider: session.user.provider,
  } : null

  const value = {
    user,
    isAuthenticated: !!session?.user,
    isLoading: status === "loading"
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}