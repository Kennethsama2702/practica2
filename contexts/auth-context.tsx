"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface AuthContextType {
  isAuthenticated: boolean
  user: { email: string } | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = () => {
      const authToken = localStorage.getItem("authToken")
      const userEmail = localStorage.getItem("userEmail")
      const isAuth = localStorage.getItem("isAuthenticated") === "true"

      if (authToken && userEmail && isAuth) {
        setIsAuthenticated(true)
        setUser({ email: userEmail })
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app this would call an API
    const ADMIN_CREDENTIALS = {
      email: "admin@portfolio.com",
      password: "admin123",
    }

    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("authToken", "mock-jwt-token")
      localStorage.setItem("userEmail", email)

      setIsAuthenticated(true)
      setUser({ email })
      return true
    }

    return false
  }

  const logout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("authToken")
    localStorage.removeItem("userEmail")

    setIsAuthenticated(false)
    setUser(null)
    router.push("/login")
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
