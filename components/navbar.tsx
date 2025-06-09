"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Menu, X, Heart, MessageCircle, Bell, User, Sun, Moon, ShoppingBag, Plus } from "lucide-react"
import { useTheme } from "next-themes"
import { useAuth } from "@/components/auth-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { user, logout } = useAuth()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div whileHover={{ scale: 1.05 }} className="text-2xl font-bold gradient-text">
              CMART
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/marketplace">
              <Button variant="ghost" className="hover:bg-white/10">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Marketplace
              </Button>
            </Link>

            {user && (
              <>
                <Link href="/post">
                  <Button variant="ghost" className="hover:bg-white/10">
                    <Plus className="w-4 h-4 mr-2" />
                    Sell
                  </Button>
                </Link>

                <Link href="/saved">
                  <Button variant="ghost" size="icon" className="relative hover:bg-white/10">
                    <Heart className="w-5 h-5" />
                    <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 text-xs">3</Badge>
                  </Button>
                </Link>

                <Link href="/chat">
                  <Button variant="ghost" size="icon" className="relative hover:bg-white/10">
                    <MessageCircle className="w-5 h-5" />
                    <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 text-xs">2</Badge>
                  </Button>
                </Link>

                <Button variant="ghost" size="icon" className="relative hover:bg-white/10">
                  <Bell className="w-5 h-5" />
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 text-xs">5</Badge>
                </Button>
              </>
            )}

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hover:bg-white/10"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 glass" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.name}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth">
                  <Button variant="ghost" className="hover:bg-white/10">
                    Login
                  </Button>
                </Link>
                <Link href="/auth">
                  <Button className="rounded-full">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-white/10"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/20 py-4"
          >
            <div className="flex flex-col space-y-2">
              <Link href="/marketplace">
                <Button variant="ghost" className="w-full justify-start hover:bg-white/10">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Marketplace
                </Button>
              </Link>

              {user ? (
                <>
                  <Link href="/post">
                    <Button variant="ghost" className="w-full justify-start hover:bg-white/10">
                      <Plus className="w-4 h-4 mr-2" />
                      Sell Item
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button variant="ghost" className="w-full justify-start hover:bg-white/10">
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/saved">
                    <Button variant="ghost" className="w-full justify-start hover:bg-white/10">
                      <Heart className="w-4 h-4 mr-2" />
                      Saved Items
                    </Button>
                  </Link>
                  <Link href="/chat">
                    <Button variant="ghost" className="w-full justify-start hover:bg-white/10">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Messages
                    </Button>
                  </Link>
                  <Button variant="ghost" className="w-full justify-start hover:bg-white/10" onClick={logout}>
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth">
                    <Button variant="ghost" className="w-full justify-start hover:bg-white/10">
                      Login
                    </Button>
                  </Link>
                  <Link href="/auth">
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}
