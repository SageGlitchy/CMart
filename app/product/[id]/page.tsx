"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Heart, MessageCircle, Share2, Clock, MapPin, TrendingUp, User, Star, Flag, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock product data
const product = {
  id: "1",
  title: 'MacBook Pro 13" 2021 - Excellent Condition',
  price: 899,
  images: [
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
  ],
  category: "Electronics",
  description: `Selling my MacBook Pro 13" from 2021 in excellent condition. Used primarily for college coursework and light programming. 

Features:
- Apple M1 chip with 8-core CPU
- 8GB unified memory
- 256GB SSD storage
- 13.3-inch Retina display
- Touch Bar and Touch ID
- Two Thunderbolt/USB 4 ports

Includes original charger and box. No scratches or dents. Battery health is at 92%. Perfect for students!

Reason for selling: Upgrading to a larger screen for design work.`,
  seller: {
    name: "Lakshita",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.8,
    totalSales: 12,
    joinedDate: "September 2023",
    isVerified: true,
  },
  location: "Campus Dorms, Building A",
  postedDate: "2 days ago",
  views: 156,
  likes: 24,
  isBidding: true,
  currentBid: 850,
  bidCount: 8,
  timeLeft: "2d 5h 23m",
  condition: "Excellent",
  tags: ["laptop", "apple", "macbook", "student", "programming"],
}

const relatedProducts = [
  {
    id: "2",
    title: "iPad Air 4th Gen",
    price: 450,
    image: "/placeholder.svg?height=150&width=150",
    seller: "Madhav",
  },
  {
    id: "3",
    title: "AirPods Pro 2nd Gen",
    price: 180,
    image: "/placeholder.svg?height=150&width=150",
    seller: "Lakshita",
  },
]

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [bidAmount, setBidAmount] = useState("")
  const [message, setMessage] = useState("")

  const handleBid = () => {
    // Handle bid submission
    console.log("Bid placed:", bidAmount)
  }

  const handleMessage = () => {
    // Handle message sending
    console.log("Message sent:", message)
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
            <Button variant="ghost" onClick={() => router.back()} className="hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Marketplace
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Product Images */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  className="object-cover"
                />

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="bg-white/90 hover:bg-white"
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                  <Button variant="secondary" size="icon" className="bg-white/90 hover:bg-white">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>

                {/* Bidding Badge */}
                {product.isBidding && (
                  <Badge className="absolute bottom-4 left-4 bg-green-500 text-white">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Live Bidding
                  </Badge>
                )}
              </div>

              {/* Thumbnail Images */}
              <div className="flex gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? "border-blue-500" : "border-transparent"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Product image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              {/* Title and Category */}
              <div>
                <Badge variant="secondary" className="mb-2">
                  {product.category}
                </Badge>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.title}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {product.postedDate}
                  </span>
                  <span>{product.views} views</span>
                  <span>{product.likes} likes</span>
                </div>
              </div>

              {/* Price/Bidding Info */}
              <Card className="p-6 glass">
                {product.isBidding ? (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Current Bid</p>
                        <p className="text-3xl font-bold text-green-600">${product.currentBid}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">{product.bidCount} bids</p>
                        <p className="text-sm font-medium text-orange-500">
                          <Clock className="w-4 h-4 inline mr-1" />
                          {product.timeLeft} left
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Input
                          placeholder={`Min bid: $${product.currentBid + 5}`}
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                          type="number"
                        />
                        <Button onClick={handleBid} className="whitespace-nowrap">
                          Place Bid
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500">Minimum bid increment: ₹500</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="text-3xl font-bold text-blue-600">${product.price}</p>
                    </div>
                    <Button size="lg" className="px-8">
                      Buy Now
                    </Button>
                  </div>
                )}
              </Card>

              {/* Seller Info */}
              <Card className="p-6 glass">
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={product.seller.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{product.seller.name.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{product.seller.name}</h3>
                      {product.seller.isVerified && (
                        <Badge variant="secondary" className="text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {product.seller.rating}
                      </div>
                      <span>{product.seller.totalSales} sales</span>
                      <span>Joined {product.seller.joinedDate}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                      <MapPin className="w-4 h-4" />
                      {product.location}
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/profile/${product.seller.name}`}>
                        <Button variant="outline" size="sm">
                          <User className="w-4 h-4 mr-2" />
                          View Profile
                        </Button>
                      </Link>
                      <Link href={`/chat?user=${product.seller.name}`}>
                        <Button size="sm">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Message
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quick Message */}
              <Card className="p-6 glass">
                <h3 className="font-semibold mb-3">Send a Message</h3>
                <div className="space-y-3">
                  <Textarea
                    placeholder="Hi! I'm interested in this item..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                  />
                  <Button onClick={handleMessage} className="w-full">
                    Send Message
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8"
          >
            {/* Description */}
            <div className="lg:col-span-2">
              <Card className="p-6 glass">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  {product.description.split("\n").map((paragraph, index) => (
                    <p key={index} className="mb-3">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <Separator className="my-6" />

                <div className="space-y-3">
                  <h3 className="font-semibold">Item Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Condition:</span>
                      <span className="ml-2 font-medium">{product.condition}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Category:</span>
                      <span className="ml-2 font-medium">{product.category}</span>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div>
                  <h3 className="font-semibold mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* Related Products */}
            <div>
              <Card className="p-6 glass">
                <h3 className="font-semibold mb-4">Related Items</h3>
                <div className="space-y-4">
                  {relatedProducts.map((item) => (
                    <Link key={item.id} href={`/product/${item.id}`}>
                      <div className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          width={60}
                          height={60}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm line-clamp-2">{item.title}</h4>
                          <p className="text-blue-600 font-semibold">${item.price}</p>
                          <p className="text-xs text-gray-500">by {item.seller}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>

              {/* Report Item */}
              <Card className="p-6 glass mt-4">
                <Button variant="ghost" className="w-full text-red-500 hover:text-red-600 hover:bg-red-50">
                  <Flag className="w-4 h-4 mr-2" />
                  Report this item
                </Button>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
