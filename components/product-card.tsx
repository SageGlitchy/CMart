"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Clock, TrendingUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface Product {
  id: string
  title: string
  price: number
  image: string
  category: string
  seller: string
  likes: number
  isBidding?: boolean
  currentBid?: number
  timeLeft?: string
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(product.likes)

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLiked(!isLiked)
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  return (
    <motion.div whileHover={{ y: -5, scale: 1.02 }} transition={{ duration: 0.3 }}>
      <Link href={`/product/${product.id}`}>
        <Card className="overflow-hidden glass hover:shadow-xl transition-all duration-300 group">
          <div className="relative">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              width={300}
              height={200}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Category Badge */}
            <Badge className="absolute top-3 left-3 bg-white/90 text-gray-800">{product.category}</Badge>

            {/* Like Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 bg-white/90 hover:bg-white text-gray-800 w-8 h-8"
              onClick={handleLike}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
            </Button>

            {/* Bidding Badge */}
            {product.isBidding && (
              <Badge className="absolute bottom-3 left-3 bg-green-500 text-white">
                <TrendingUp className="w-3 h-3 mr-1" />
                Bidding
              </Badge>
            )}
          </div>

          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.title}</h3>

            <div className="flex items-center justify-between mb-3">
              {product.isBidding ? (
                <div>
                  <p className="text-sm text-gray-500">Current bid</p>
                  <p className="text-xl font-bold text-green-600">${product.currentBid}</p>
                </div>
              ) : (
                <p className="text-2xl font-bold text-blue-600">${product.price}</p>
              )}

              <div className="text-right">
                <p className="text-sm text-gray-500">by {product.seller}</p>
                <div className="flex items-center text-sm text-gray-400">
                  <Heart className="w-3 h-3 mr-1" />
                  {likeCount}
                </div>
              </div>
            </div>

            {product.timeLeft && (
              <div className="flex items-center text-sm text-orange-500 mb-3">
                <Clock className="w-4 h-4 mr-1" />
                {product.timeLeft} left
              </div>
            )}

            <div className="flex gap-2">
              <Button className="flex-1" size="sm">
                {product.isBidding ? "Place Bid" : "Buy Now"}
              </Button>
              <Button variant="outline" size="sm">
                <MessageCircle className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  )
}
