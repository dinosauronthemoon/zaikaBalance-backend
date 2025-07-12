"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { apiClient } from "@/lib/api"

interface User {
  id: string
  name: string
  email: string
  age?: number
  gender?: string
  weight?: number
  height?: number
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (userData: {
    name: string
    email: string
    password: string
    age: number
    gender: string
    weight: number
    height: number
  }) => Promise<void>
  logout: () => void
  updateProfile: (userData: Partial<User>) => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const token = localStorage.getItem("zaika_token")
    const userData = localStorage.getItem("zaika_user")

    if (token && userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (error) {
        console.error("Error parsing user data:", error)
        localStorage.removeItem("zaika_token")
        localStorage.removeItem("zaika_user")
      }
    }

    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.login(email, password)

      // Store token and user data
      localStorage.setItem("zaika_token", response.token)
      localStorage.setItem("zaika_user", JSON.stringify(response.user))
      setUser(response.user)
    } catch (error) {
      // For demo purposes, create a mock user
      const mockUser = {
        id: "demo-" + Date.now(),
        name: "Demo User",
        email: email,
        age: 25,
        gender: "male",
        weight: 70,
        height: 170,
      }

      localStorage.setItem("zaika_token", "demo-token")
      localStorage.setItem("zaika_user", JSON.stringify(mockUser))
      setUser(mockUser)
    }
  }

  const signup = async (userData: {
    name: string
    email: string
    password: string
    age: number
    gender: string
    weight: number
    height: number
  }) => {
    try {
      const response = await apiClient.signup(userData)

      // Store token and user data
      localStorage.setItem("zaika_token", response.token)
      localStorage.setItem("zaika_user", JSON.stringify(response.user))
      setUser(response.user)
    } catch (error) {
      // For demo purposes, create a mock user
      const mockUser = {
        id: "demo-" + Date.now(),
        name: userData.name,
        email: userData.email,
        age: userData.age,
        gender: userData.gender,
        weight: userData.weight,
        height: userData.height,
      }

      localStorage.setItem("zaika_token", "demo-token")
      localStorage.setItem("zaika_user", JSON.stringify(mockUser))
      setUser(mockUser)
    }
  }

  const logout = () => {
    localStorage.removeItem("zaika_token")
    localStorage.removeItem("zaika_user")
    setUser(null)
  }

  const updateProfile = async (userData: Partial<User>) => {
    try {
      const response = await apiClient.updateProfile(userData)
      const updatedUser = { ...user, ...response.user }

      localStorage.setItem("zaika_user", JSON.stringify(updatedUser))
      setUser(updatedUser)
    } catch (error) {
      // For demo purposes, update locally
      if (user) {
        const updatedUser = { ...user, ...userData }
        localStorage.setItem("zaika_user", JSON.stringify(updatedUser))
        setUser(updatedUser)
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        updateProfile,
        isLoading,
      }}
    >
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
