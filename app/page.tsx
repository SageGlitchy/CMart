"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Search, Users, Shield, Zap } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { ProductCard } from "@/components/product-card"

const featuredProducts = [
  {
    id: "1",
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
    id: "2",
    title: "Calculus Textbook",
    price: 45,
    image: "/placeholder.svg?height=200&width=200",
    category: "Books",
    seller: "Mike R.",
    likes: 8,
    isBidding: false,
  },
  {
    id: "3",
    title: "Dorm Mini Fridge",
    price: 120,
    image: "/placeholder.svg?height=200&width=200",
    category: "Furniture",
    seller: "Emma L.",
    likes: 15,
    isBidding: true,
    currentBid: 95,
  },
]

const features = [
  {
    icon: Users,
    title: "Campus Community",
    description: "Connect with students from your college",
  },
  {
    icon: Shield,
    title: "Safe Trading",
    description: "Verified student accounts for secure transactions",
  },
  {
    icon: Zap,
    title: "Instant Chat",
    description: "Real-time messaging with buyers and sellers",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10" />

        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute top-40 right-20 w-24 h-24 bg-purple-400/20 rounded-full blur-xl"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
          />
          <motion.div
            className="absolute bottom-20 left-1/3 w-40 h-40 bg-pink-400/20 rounded-full blur-xl"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="gradient-text">CMART</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4">Buy, Sell, Chat.</p>
              <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-8">All within campus.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link href="/marketplace">
                <Button size="lg" className="text-lg px-8 py-6 rounded-full">
                  Browse Listings
                </Button>
              </Link>
              <Link href="/post">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-full glass">
                  Post Your Item
                </Button>
              </Link>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-md mx-auto mb-16"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search for textbooks, electronics..."
                  className="pl-10 py-6 text-lg rounded-full glass"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trending Items</h2>
            <p className="text-gray-600 dark:text-gray-300">Popular items from your campus</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50/50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose CMART?</h2>
            <p className="text-gray-600 dark:text-gray-300">Built specifically for college students</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 text-center glass hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Trading?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of students already using CMART to buy and sell items on campus.
            </p>
            <Link href="/auth">
              <Button size="lg" className="text-lg px-8 py-6 rounded-full">
                Get Started Free
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
