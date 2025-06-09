"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, Grid, List, SlidersHorizontal } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const categories = ["All Categories", "Electronics", "Books", "Furniture", "Clothing", "Sports", "Other"]

const mockProducts = [
  {
    id: "1",
    title: 'MacBook Pro 13" 2021',
    price: 899,
    image: "/placeholder.svg?height=200&width=200",
    category: "Electronics",
    seller: "Lakshita",
    likes: 24,
    isBidding: true,
    currentBid: 850,
    timeLeft: "2d 5h",
  },
  {
    id: "2",
    title: "Calculus Early Transcendentals",
    price: 45,
    image: "/placeholder.svg?height=200&width=200",
    category: "Books",
    seller: "Madhav",
    likes: 8,
    isBidding: false,
  },
  {
    id: "3",
    title: "Mini Fridge - Perfect for Dorm",
    price: 120,
    image: "/placeholder.svg?height=200&width=200",
    category: "Furniture",
    seller: "Lakshita",
    likes: 15,
    isBidding: true,
    currentBid: 95,
    timeLeft: "1d 12h",
  },
  {
    id: "4",
    title: "iPhone 13 Pro - Unlocked",
    price: 650,
    image: "/placeholder.svg?height=200&width=200",
    category: "Electronics",
    seller: "Lakshita",
    likes: 32,
    isBidding: false,
  },
  {
    id: "5",
    title: "Study Desk with Drawers",
    price: 80,
    image: "/placeholder.svg?height=200&width=200",
    category: "Furniture",
    seller: "Lakshita",
    likes: 12,
    isBidding: true,
    currentBid: 65,
    timeLeft: "3d 8h",
  },
  {
    id: "6",
    title: "Nike Air Force 1 - Size 9",
    price: 75,
    image: "/placeholder.svg?height=200&width=200",
    category: "Clothing",
    seller: "Lakshita",
    likes: 18,
    isBidding: false,
  },
]

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [sortBy, setSortBy] = useState("newest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filteredProducts, setFilteredProducts] = useState(mockProducts)

  useEffect(() => {
    const filtered = mockProducts.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

      return matchesSearch && matchesCategory && matchesPrice
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "popular":
          return b.likes - a.likes
        default:
          return 0
      }
    })

    setFilteredProducts(filtered)
  }, [searchQuery, selectedCategory, priceRange, sortBy])

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Marketplace</h1>
            <p className="text-gray-600 dark:text-gray-300">Discover amazing deals from your fellow students</p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <Card className="p-6 glass">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search for items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Category Filter */}
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>

                {/* Mobile Filters */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <SlidersHorizontal className="w-4 h-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                      <SheetDescription>Refine your search results</SheetDescription>
                    </SheetHeader>
                    <div className="py-6">
                      <div className="space-y-6">
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Price Range: ${priceRange[0]} - ${priceRange[1]}
                          </label>
                          <Slider
                            value={priceRange}
                            onValueChange={setPriceRange}
                            max={1000}
                            step={10}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Desktop Price Filter */}
                <div className="hidden lg:block w-64">
                  <label className="text-sm font-medium mb-2 block">
                    Price: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <Slider value={priceRange} onValueChange={setPriceRange} max={1000} step={10} className="w-full" />
                </div>

                {/* View Mode Toggle */}
                <div className="flex border rounded-lg p-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Active Filters */}
          {(selectedCategory !== "All Categories" || searchQuery) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 flex flex-wrap gap-2"
            >
              {searchQuery && (
                <Badge variant="secondary" className="px-3 py-1">
                  Search: "{searchQuery}"
                  <button onClick={() => setSearchQuery("")} className="ml-2 hover:text-red-500">
                    ×
                  </button>
                </Badge>
              )}
              {selectedCategory !== "All Categories" && (
                <Badge variant="secondary" className="px-3 py-1">
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory("All Categories")} className="ml-2 hover:text-red-500">
                    ×
                  </button>
                </Badge>
              )}
            </motion.div>
          )}

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <p className="text-gray-600 dark:text-gray-300">Showing {filteredProducts.length} results</p>
          </motion.div>

          {/* Products Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={
              viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
            }
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>

          {/* No Results */}
          {filteredProducts.length === 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No items found</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Try adjusting your search criteria or browse all categories
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("All Categories")
                  setPriceRange([0, 1000])
                }}
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
