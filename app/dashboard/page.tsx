"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Eye, Heart, MessageCircle, Package, Edit, Trash2, MoreVertical } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"

const myListings = [
  {
    id: "1",
    title: "iPhone 12 Pro - Excellent Condition",
    price: 650,
    image: "/placeholder.svg?height=200&width=200",
    category: "Electronics",
    seller: "You",
    likes: 18,
    views: 124,
    messages: 5,
    status: "active",
    postedDate: "3 days ago",
  },
  {
    id: "2",
    title: "Organic Chemistry Textbook",
    price: 85,
    image: "/placeholder.svg?height=200&width=200",
    category: "Books",
    seller: "You",
    likes: 7,
    views: 45,
    messages: 2,
    status: "active",
    postedDate: "1 week ago",
  },
]

const savedItems = [
  {
    id: "3",
    title: 'MacBook Pro 13"',
    price: 899,
    image: "/placeholder.svg?height=200&width=200",
    category: "Electronics",
    seller: "Sarah M.",
    likes: 24,
    isBidding: true,
    currentBid: 850,
  },
  {
    id: "4",
    title: "Study Desk with Drawers",
    price: 80,
    image: "/placeholder.svg?height=200&width=200",
    category: "Furniture",
    seller: "Lisa P.",
    likes: 12,
    isBidding: true,
    currentBid: 65,
  },
]

const recentActivity = [
  {
    id: "1",
    type: "like",
    message: "Lakshita liked your iPhone 12 Pro",
    time: "2 hours ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "2",
    type: "message",
    message: "New message from Madhav about Organic Chemistry Textbook",
    time: "4 hours ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "3",
    type: "bid",
    message: 'You were outbid on MacBook Pro 13"',
    time: "1 day ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export default function DashboardPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in to access your dashboard</h2>
          <Link href="/auth/login">
            <Button>Log In</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, {user.name.split(" ")[0]}! 👋</h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Here's what's happening with your marketplace activity
                </p>
              </div>
              <Link href="/post">
                <Button className="rounded-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Post Item
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <Card className="p-6 glass">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Active Listings</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6 glass">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Total Views</p>
                  <p className="text-2xl font-bold">169</p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <Eye className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6 glass">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Messages</p>
                  <p className="text-2xl font-bold">7</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6 glass">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Saved Items</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="listings">My Listings</TabsTrigger>
                <TabsTrigger value="saved">Saved Items</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Recent Activity */}
                  <div className="lg:col-span-2">
                    <Card className="p-6 glass">
                      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                      <div className="space-y-4">
                        {recentActivity.map((activity) => (
                          <div
                            key={activity.id}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          >
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={activity.avatar || "/placeholder.svg"} />
                              <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="text-sm">{activity.message}</p>
                              <p className="text-xs text-gray-500">{activity.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>

                  {/* Quick Actions */}
                  <div>
                    <Card className="p-6 glass">
                      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                      <div className="space-y-3">
                        <Link href="/post">
                          <Button className="w-full justify-start">
                            <Plus className="w-4 h-4 mr-2" />
                            Post New Item
                          </Button>
                        </Link>
                        <Link href="/chat">
                          <Button variant="outline" className="w-full justify-start">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            View Messages
                          </Button>
                        </Link>
                        <Link href="/marketplace">
                          <Button variant="outline" className="w-full justify-start">
                            <Eye className="w-4 h-4 mr-2" />
                            Browse Items
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="listings" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">My Listings ({myListings.length})</h3>
                  <Link href="/post">
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add New
                    </Button>
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myListings.map((item) => (
                    <Card key={item.id} className="overflow-hidden glass">
                      <div className="relative">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-48 object-cover"
                        />
                        <Badge className="absolute top-3 left-3 bg-green-500 text-white">{item.status}</Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-3 right-3 bg-white/90 hover:bg-white"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="p-4">
                        <h4 className="font-semibold mb-2 line-clamp-1">{item.title}</h4>
                        <p className="text-2xl font-bold text-blue-600 mb-3">${item.price}</p>

                        <div className="grid grid-cols-3 gap-4 text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {item.views}
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {item.likes}
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" />
                            {item.messages}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-500 hover:text-red-600">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="saved" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Saved Items ({savedItems.length})</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedItems.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="activity" className="space-y-6">
                <h3 className="text-xl font-semibold">Activity History</h3>

                <Card className="p-6 glass">
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={activity.avatar || "/placeholder.svg"} />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium">{activity.message}</p>
                          <p className="text-sm text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
