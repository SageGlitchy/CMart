"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload, X, Plus, Check, AlertCircle, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/components/auth-provider"
import Link from "next/link"
import Image from "next/image"
import { ProductCard } from "@/components/product-card"

const categories = ["Electronics", "Books", "Furniture", "Clothing", "Sports", "Kitchen", "Decor", "Other"]

interface FormData {
  title: string
  category: string
  price: string
  description: string
  isBidding: boolean
  condition: string
  location: string
  tags: string
}

interface FormErrors {
  title?: string
  category?: string
  price?: string
  description?: string
  images?: string
}

export default function PostItemPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState<FormData>({
    title: "",
    category: "",
    price: "",
    description: "",
    isBidding: false,
    condition: "Good",
    location: "Campus Dorms",
    tags: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [images, setImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user selects
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isBidding: checked }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    // Clear image error if it exists
    if (errors.images) {
      setErrors((prev) => ({ ...prev, images: undefined }))
    }

    // Limit to 5 images
    if (images.length + files.length > 5) {
      toast({
        title: "Too many images",
        description: "You can upload a maximum of 5 images",
        variant: "destructive",
      })
      return
    }

    // Create preview URLs
    const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
    setImages((prev) => [...prev, ...newImages])
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const validateForm = () => {
    const newErrors: FormErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.category) {
      newErrors.category = "Category is required"
    }

    if (!formData.price.trim()) {
      newErrors.price = "Price is required"
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "Price must be a positive number"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    } else if (formData.description.length < 20) {
      newErrors.description = "Description must be at least 20 characters"
    }

    if (images.length === 0) {
      newErrors.images = "At least one image is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: "Form validation failed",
        description: "Please check the form for errors",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Item posted successfully!",
        description: "Your item has been listed on the marketplace.",
      })

      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Error posting item",
        description: "There was a problem posting your item. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const togglePreview = () => {
    if (!previewMode && !validateForm()) {
      toast({
        title: "Cannot preview",
        description: "Please fill out all required fields first",
        variant: "destructive",
      })
      return
    }
    setPreviewMode(!previewMode)
  }

  // Create preview product
  const previewProduct = {
    id: "preview",
    title: formData.title || "Your Item Title",
    price: Number(formData.price) || 0,
    image: images[0] || "/placeholder.svg?height=200&width=200",
    category: formData.category || "Category",
    seller: user?.name || "You",
    likes: 0,
    isBidding: formData.isBidding,
    currentBid: formData.isBidding ? Number(formData.price) * 0.9 : undefined,
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in to post items</h2>
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
          {/* Back Button */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
            <Button variant="ghost" onClick={() => router.back()} className="hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </motion.div>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Post Your Item</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Fill out the details below to list your item on the marketplace
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`lg:col-span-2 ${previewMode ? "hidden lg:block" : ""}`}
            >
              <Card className="p-6 glass">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Image Upload */}
                  <div className="space-y-2">
                    <Label>
                      Item Images <span className="text-red-500">*</span>
                    </Label>
                    <div
                      className={`border-2 border-dashed rounded-lg p-4 text-center ${
                        errors.images ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                      }`}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        className="hidden"
                        accept="image/*"
                        multiple
                      />

                      {images.length > 0 ? (
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-3">
                            {images.map((image, index) => (
                              <div key={index} className="relative w-24 h-24">
                                <Image
                                  src={image || "/placeholder.svg"}
                                  alt={`Upload preview ${index + 1}`}
                                  fill
                                  className="object-cover rounded-lg"
                                />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                  className="absolute -top-2 -right-2 w-6 h-6"
                                  onClick={() => removeImage(index)}
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            ))}
                            {images.length < 5 && (
                              <Button
                                type="button"
                                variant="outline"
                                className="w-24 h-24 flex flex-col gap-1"
                                onClick={() => fileInputRef.current?.click()}
                              >
                                <Plus className="w-5 h-5" />
                                <span className="text-xs">Add More</span>
                              </Button>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">
                            {images.length}/5 images uploaded. First image will be the cover.
                          </p>
                        </div>
                      ) : (
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full py-8 flex flex-col gap-2"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload className="w-6 h-6" />
                          <span>Click to upload images</span>
                          <span className="text-xs text-gray-500">Upload up to 5 images (PNG, JPG, WEBP)</span>
                        </Button>
                      )}

                      {errors.images && (
                        <p className="text-red-500 text-sm mt-2 flex items-center justify-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.images}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Basic Info */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">
                        Item Title <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="title"
                        name="title"
                        placeholder="e.g., MacBook Pro 2021 - Excellent Condition"
                        value={formData.title}
                        onChange={handleChange}
                        className={errors.title ? "border-red-500" : ""}
                      />
                      {errors.title && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.title}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">
                          Category <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => handleSelectChange("category", value)}
                        >
                          <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.category && (
                          <p className="text-red-500 text-sm flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.category}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="condition">Condition</Label>
                        <Select
                          value={formData.condition}
                          onValueChange={(value) => handleSelectChange("condition", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="New">New</SelectItem>
                            <SelectItem value="Like New">Like New</SelectItem>
                            <SelectItem value="Excellent">Excellent</SelectItem>
                            <SelectItem value="Good">Good</SelectItem>
                            <SelectItem value="Fair">Fair</SelectItem>
                            <SelectItem value="Poor">Poor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">
                          Price ($) <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                          value={formData.price}
                          onChange={handleChange}
                          className={errors.price ? "border-red-500" : ""}
                        />
                        {errors.price && (
                          <p className="text-red-500 text-sm flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.price}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Select
                          value={formData.location}
                          onValueChange={(value) => handleSelectChange("location", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Campus Dorms">Campus Dorms</SelectItem>
                            <SelectItem value="North Campus">North Campus</SelectItem>
                            <SelectItem value="South Campus">South Campus</SelectItem>
                            <SelectItem value="Off Campus">Off Campus</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="bidding" checked={formData.isBidding} onCheckedChange={handleSwitchChange} />
                      <Label htmlFor="bidding">Allow bidding on this item</Label>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">
                      Description <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe your item in detail. Include condition, features, and reason for selling."
                      rows={6}
                      value={formData.description}
                      onChange={handleChange}
                      className={errors.description ? "border-red-500" : ""}
                    />
                    {errors.description ? (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.description}
                      </p>
                    ) : (
                      <p className="text-xs text-gray-500">
                        {formData.description.length}/1000 characters (minimum 20)
                      </p>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (optional)</Label>
                    <Input
                      id="tags"
                      name="tags"
                      placeholder="e.g., laptop, apple, electronics (comma separated)"
                      value={formData.tags}
                      onChange={handleChange}
                    />
                    <p className="text-xs text-gray-500">Add relevant tags to help buyers find your item</p>
                  </div>

                  <Separator />

                  {/* Submit Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button type="button" variant="outline" className="flex-1" onClick={togglePreview}>
                      {previewMode ? "Edit Listing" : "Preview Listing"}
                    </Button>
                    <Button type="submit" className="flex-1" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Posting...
                        </>
                      ) : (
                        "Post Item"
                      )}
                    </Button>
                  </div>
                </form>
              </Card>
            </motion.div>

            {/* Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={previewMode ? "lg:col-span-1" : "hidden lg:block lg:col-span-1"}
            >
              <div className="sticky top-24">
                <h3 className="text-lg font-semibold mb-4">{previewMode ? "Listing Preview" : "Live Preview"}</h3>

                {/* Preview Card */}
                <div className="mb-6">
                  <ProductCard product={previewProduct} />
                </div>

                {/* Preview Details */}
                {previewMode && (
                  <Card className="p-6 glass">
                    <h3 className="font-semibold mb-3">Listing Details</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Description</p>
                        <p className="text-sm">{formData.description || "No description provided"}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-gray-500">Condition</p>
                          <p>{formData.condition}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Location</p>
                          <p>{formData.location}</p>
                        </div>
                      </div>

                      {formData.tags && (
                        <div>
                          <p className="text-sm text-gray-500">Tags</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {formData.tags.split(",").map((tag, index) => (
                              <span key={index} className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                #{tag.trim()}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <Button className="w-full mt-4 lg:hidden" onClick={() => setPreviewMode(false)}>
                      Back to Edit
                    </Button>
                  </Card>
                )}

                {/* Tips */}
                {!previewMode && (
                  <Card className="p-4 glass">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      Tips for a great listing
                    </h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      <li>• Use clear, well-lit photos</li>
                      <li>• Write a detailed description</li>
                      <li>• Set a fair price</li>
                      <li>• Be honest about condition</li>
                      <li>• Respond to messages quickly</li>
                    </ul>
                  </Card>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
