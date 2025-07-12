"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useAuth } from "@/hooks/use-auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Menu,
  X,
  Home,
  Search,
  Calculator,
  BarChart3,
  BookOpen,
  Bell,
  MessageSquare,
  User,
  LogOut,
  LogIn,
  UserPlus,
  Sparkles,
} from "lucide-react"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Food Analysis", href: "/food-analysis", icon: Search },
  { name: "Diet Planner", href: "/diet-planner", icon: Calculator },
  { name: "BMI Calculator", href: "/bmi-calculator", icon: Calculator },
  { name: "Nutrient Tracker", href: "/nutrient-tracker", icon: BarChart3 },
  { name: "Recipes", href: "/recipes", icon: BookOpen },
  { name: "Reminders", href: "/reminders", icon: Bell },
  { name: "Feedback", href: "/feedback", icon: MessageSquare },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <nav className="vintage-nav sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold gradient-text">Zaika Balance</span>
              </Link>
            </div>
            <div className="hidden md:ml-8 md:flex md:space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      pathname === item.href
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                        : "text-gray-700 hover:bg-white/50 hover:text-purple-600"
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <ModeToggle />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-transparent text-white font-bold">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 bg-white/95 backdrop-blur-md border-white/20"
                  align="end"
                  forceMount
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:bg-white/50 hover:text-purple-600 rounded-xl transition-all duration-300"
                  asChild
                >
                  <Link href="/auth/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </Link>
                </Button>
                <Button className="vintage-button" asChild>
                  <Link href="/auth/signup">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Sign Up
                  </Link>
                </Button>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <ModeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-gray-700 hover:bg-white/50 transition-all duration-300"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-white/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                    pathname === item.href
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      : "text-gray-700 hover:bg-white/50 hover:text-purple-600"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              )
            })}

            {user ? (
              <div className="border-t border-white/20 pt-4 mt-4">
                <div className="flex items-center px-3 py-2">
                  <Avatar className="h-10 w-10 mr-3 bg-gradient-to-br from-purple-400 to-pink-400">
                    <AvatarFallback className="bg-transparent text-white font-bold">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-base font-medium text-gray-800">{user.name}</div>
                    <div className="text-sm text-gray-600">{user.email}</div>
                  </div>
                </div>
                <Link
                  href="/profile"
                  className="flex items-center px-3 py-3 rounded-xl text-base font-medium text-gray-700 hover:bg-white/50 hover:text-purple-600 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="h-5 w-5 mr-3" />
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout()
                    setIsOpen(false)
                  }}
                  className="flex items-center w-full px-3 py-3 rounded-xl text-base font-medium text-gray-700 hover:bg-white/50 hover:text-purple-600 transition-all duration-300"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Log out
                </button>
              </div>
            ) : (
              <div className="border-t border-white/20 pt-4 mt-4 space-y-1">
                <Link
                  href="/auth/login"
                  className="flex items-center px-3 py-3 rounded-xl text-base font-medium text-gray-700 hover:bg-white/50 hover:text-purple-600 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  <LogIn className="h-5 w-5 mr-3" />
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="flex items-center px-3 py-3 rounded-xl text-base font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  <UserPlus className="h-5 w-5 mr-3" />
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
