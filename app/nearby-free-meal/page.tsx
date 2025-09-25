"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Clock, Users, Plus, Search, Filter, Navigation, CheckCircle, AlertCircle, Share } from "lucide-react"
import { mealCenters, type MealCenter } from "../../lib/meal-centers-data"

export default function NearbyFreeMealPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedRange, setSelectedRange] = useState<number>(30)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [filteredCenters, setFilteredCenters] = useState<MealCenter[]>(mealCenters)
  const [isAddingMeal, setIsAddingMeal] = useState(false)

  // Function to open Google Maps with directions
  const openGoogleMaps = (center: MealCenter) => {
    const destination = `${center.lat},${center.lng}`
    const query = encodeURIComponent(center.address)
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}&destination_place_id=${query}`
    window.open(googleMapsUrl, '_blank')
  }

  // Function to handle sharing
  const handleShare = async (center: MealCenter) => {
    const shareData = {
      title: `${center.name} - Free Meal Center`,
      text: `Check out this free meal center: ${center.name} at ${center.address}. Timings: ${center.timings}`,
      url: window.location.href
    }

    // Check if native sharing is supported
    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        console.log('Error sharing:', error)
        fallbackShare(center)
      }
    } else {
      // Fallback to custom share options
      fallbackShare(center)
    }
  }

  // Fallback share function with multiple options
  const fallbackShare = (center: MealCenter) => {
    const shareText = `Check out this free meal center: ${center.name} at ${center.address}. Timings: ${center.timings}`
    const shareUrl = window.location.href
    
    // Create share options with original company icons
    const shareOptions = [
      {
        name: 'WhatsApp',
        url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg>`,
        color: '#25D366'
      },
      {
        name: 'Twitter',
        url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="#1DA1F2"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>`,
        color: '#1DA1F2'
      },
      {
        name: 'Facebook',
        url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
        color: '#1877F2'
      },
      {
        name: 'Copy Link',
        action: () => {
          navigator.clipboard.writeText(shareUrl)
          alert('Link copied to clipboard!')
        },
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="#6B7280"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>`,
        color: '#6B7280'
      }
    ]

    // Create and show share dialog with better styling
    const shareDialog = document.createElement('div')
    shareDialog.className = 'fixed inset-0 flex items-center justify-center z-50 p-4'
    shareDialog.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'
    shareDialog.innerHTML = `
      <div class="bg-white rounded-2xl shadow-2xl max-w-sm w-full border border-gray-200 animate-in fade-in-0 zoom-in-95 duration-200">
        <div class="p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-1">Share ${center.name}</h3>
          <p class="text-sm text-gray-500 mb-6">Choose how you'd like to share this meal center</p>
          <div class="space-y-3">
            ${shareOptions.map((option, index) => `
              <button 
                class="w-full flex items-center p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 group"
                onclick="handleShareOption(${index})"
                style="border-color: ${option.color}20;"
              >
                <div class="w-10 h-10 rounded-lg flex items-center justify-center mr-4" style="background-color: ${option.color}15;">
                  ${option.icon}
                </div>
                <span class="font-medium text-gray-700 group-hover:text-gray-900">${option.name}</span>
              </button>
            `).join('')}
          </div>
          <button 
            class="w-full mt-6 p-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium text-gray-700 transition-colors duration-200"
            onclick="closeShareDialog()"
          >
            Cancel
          </button>
        </div>
      </div>
    `

    // Add event handlers
    ;(window as any).handleShareOption = (index: number) => {
      const option = shareOptions[index]
      if (option.url) {
        window.open(option.url, '_blank')
      } else if (option.action) {
        option.action()
      }
      document.body.removeChild(shareDialog)
    }

    ;(window as any).closeShareDialog = () => {
      document.body.removeChild(shareDialog)
    }

    // Close dialog when clicking outside
    shareDialog.addEventListener('click', (e) => {
      if (e.target === shareDialog) {
        document.body.removeChild(shareDialog)
      }
    })

    document.body.appendChild(shareDialog)
  }
  
  // Form states
  const [currentStep, setCurrentStep] = useState(1)
  const [isCapturingLocation, setIsCapturingLocation] = useState(false)
  const [formLocation, setFormLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.log("Location access denied", error)
          // Set default location (Delhi, India)
          setUserLocation({ lat: 28.6139, lng: 77.2090 })
        }
      )
    } else {
      // Set default location (Delhi, India)
      setUserLocation({ lat: 28.6139, lng: 77.2090 })
    }
  }, [])

  // Calculate distance between two points
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371 // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLng = (lng2 - lng1) * Math.PI / 180
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    const d = R * c // Distance in kilometers
    return Math.round(d * 10) / 10 // Round to 1 decimal place
  }

  // Filter and sort centers within selected range
  useEffect(() => {
    let filtered = mealCenters.filter((center: MealCenter) => {
      const matchesSearch = center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           center.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           center.type.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = selectedType === "all" || center.type === selectedType
      return matchesSearch && matchesType
    })

    // Sort by distance if user location is available and filter within selected range
    if (userLocation) {
      filtered = filtered.map((center: MealCenter) => ({
        ...center,
        distance: calculateDistance(userLocation.lat, userLocation.lng, center.lat, center.lng)
      })).filter((center: MealCenter) => (center.distance || 0) <= selectedRange)
        .sort((a: MealCenter, b: MealCenter) => (a.distance || 0) - (b.distance || 0))
    }

    setFilteredCenters(filtered)
  }, [searchTerm, selectedType, selectedRange, userLocation])

  // Capture current location for form
  const captureCurrentLocation = () => {
    setIsCapturingLocation(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
          setIsCapturingLocation(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          setIsCapturingLocation(false)
          alert("Unable to get location. Please enter coordinates manually.")
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      )
    } else {
      setIsCapturingLocation(false)
      alert("Geolocation is not supported by this browser.")
    }
  }



  const handleAddMealCenter = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData(event.currentTarget)
    
    const newCenter: MealCenter = {
      id: mealCenters.length + 1,
      name: formData.get('name') as string,
      type: formData.get('type') as string,
      address: formData.get('address') as string,
      lat: formLocation?.lat || parseFloat(formData.get('lat') as string) || (userLocation?.lat || 28.6139),
      lng: formLocation?.lng || parseFloat(formData.get('lng') as string) || (userLocation?.lng || 77.2090),
      timings: formData.get('timings') as string,
      contact: formData.get('contact') as string,
      description: formData.get('description') as string,
      capacity: parseInt(formData.get('capacity') as string) || 100,
      isActive: true
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    // In a real app, this would be sent to a backend API
    console.log('New meal center:', newCenter)
    
    setIsSubmitting(false)
    setIsAddingMeal(false)
    setCurrentStep(1)
    setFormLocation(null)
    
    // Show success message
    alert("Meal center added successfully! It will be reviewed and published soon.")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Beautiful Header Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-16 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="meals" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1.5" fill="currentColor" />
                <path d="M8 8h4v1H8V8zm0 2h4v1H8v-1zm0 2h4v1H8v-1z" fill="currentColor" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#meals)" />
          </svg>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 text-sm font-medium text-green-700">
              <MapPin className="h-4 w-4" />
              <span>Serving communities with compassion</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Find Nearby 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600"> Free Meals</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Discover free meal centers, langars, and community kitchens near you. 
              Connect with your community to share meals and spread kindness.
            </p>
            
            {/* Stats */}
            <div className="flex items-center gap-8 text-sm mb-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-600">Active centers</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-green-500" />
                <span className="text-gray-600">Community driven</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-gray-600">Free for all</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Dialog open={isAddingMeal} onOpenChange={(open) => {
                setIsAddingMeal(open)
                if (!open) {
                  setCurrentStep(1)
                  setFormLocation(null)
                }
              }}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl transition-all duration-200">
                    <Plus className="mr-2 h-5 w-5" />
                    Add Free Meal Center
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-6">
                  <div className="space-y-4 overflow-hidden">
                  <DialogHeader className="text-center pb-6">
                    <DialogTitle className="text-2xl font-bold text-green-700">Add a New Free Meal Center</DialogTitle>
                    <DialogDescription className="text-lg">
                      Help your community by sharing information about a free meal center
                    </DialogDescription>
                    
                    {/* Progress Steps */}
                    <div className="flex justify-center mt-6 px-4">
                      <div className="flex items-center space-x-2 sm:space-x-4 max-w-full overflow-x-auto">
                        <div className={`flex items-center space-x-1 sm:space-x-2 flex-shrink-0 ${currentStep >= 1 ? 'text-green-600' : 'text-gray-400'}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${currentStep >= 1 ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
                            1
                          </div>
                          <span className="text-xs sm:text-sm font-medium whitespace-nowrap">Basic Info</span>
                        </div>
                        <div className={`w-4 sm:w-8 h-1 flex-shrink-0 ${currentStep >= 2 ? 'bg-green-600' : 'bg-gray-200'}`}></div>
                        <div className={`flex items-center space-x-1 sm:space-x-2 flex-shrink-0 ${currentStep >= 2 ? 'text-green-600' : 'text-gray-400'}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${currentStep >= 2 ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
                            2
                          </div>
                          <span className="text-xs sm:text-sm font-medium whitespace-nowrap">Location</span>
                        </div>

                      </div>
                    </div>
                  </DialogHeader>

                  <form onSubmit={handleAddMealCenter} className="space-y-6">
                    {/* Step 1: Basic Information */}
                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                          <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                            <CheckCircle className="mr-2 h-5 w-5" />
                            Basic Information
                          </h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="name" className="text-sm font-medium flex items-center">
                                <Users className="mr-2 h-4 w-4" />
                                Center Name *
                              </Label>
                              <Input 
                                id="name" 
                                name="name" 
                                placeholder="e.g., Golden Temple Langar, Local Community Kitchen" 
                                required 
                                className="border-green-300 focus:border-green-500"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="type" className="text-sm font-medium">Type of Center *</Label>
                              <Select name="type" required>
                                <SelectTrigger className="border-green-300 focus:border-green-500">
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Gurudwara">🏛️ Gurudwara</SelectItem>
                                  <SelectItem value="ISKCON Temple">🕉️ ISKCON Temple</SelectItem>
                                  <SelectItem value="Hindu Temple">🛕 Hindu Temple</SelectItem>
                                  <SelectItem value="Mosque">🕌 Mosque</SelectItem>
                                  <SelectItem value="Church">⛪ Church</SelectItem>
                                  <SelectItem value="Community Kitchen">🍲 Community Kitchen</SelectItem>
                                  <SelectItem value="NGO">🤝 NGO</SelectItem>
                                  <SelectItem value="Government Center">🏛️ Government Center</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="timings" className="text-sm font-medium flex items-center">
                                <Clock className="mr-2 h-4 w-4" />
                                Meal Timings *
                              </Label>
                              <Input 
                                id="timings" 
                                name="timings" 
                                placeholder="e.g., 12:00 PM - 2:00 PM, 7:00 PM - 9:00 PM" 
                                required 
                                className="border-green-300 focus:border-green-500"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="contact" className="text-sm font-medium">Contact Number</Label>
                              <Input 
                                id="contact" 
                                name="contact" 
                                placeholder="+91 XXXXXXXXXX" 
                                className="border-green-300 focus:border-green-500"
                              />
                            </div>
                          </div>

                          <div className="mt-6 space-y-2">
                            <Label htmlFor="capacity" className="text-sm font-medium">Daily Capacity (approximate)</Label>
                            <Input 
                              id="capacity" 
                              name="capacity" 
                              type="number" 
                              placeholder="e.g., 100 people per day" 
                              className="border-green-300 focus:border-green-500"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <Button 
                            type="button" 
                            onClick={() => setCurrentStep(2)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Next: Location
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Location */}
                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                          <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                            <MapPin className="mr-2 h-5 w-5" />
                            Location Information
                          </h3>

                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="address" className="text-sm font-medium">Full Address *</Label>
                              <Textarea 
                                id="address" 
                                name="address" 
                                placeholder="Complete address with landmarks, city, state, and pincode"
                                required 
                                rows={3}
                                className="border-blue-300 focus:border-blue-500"
                              />
                            </div>

                            <div className="bg-white p-4 rounded-lg border border-blue-200">
                              <div className="flex items-center justify-between mb-4">
                                <h4 className="font-medium text-blue-800">GPS Coordinates</h4>
                                <Button
                                  type="button"
                                  onClick={captureCurrentLocation}
                                  disabled={isCapturingLocation}
                                  className="bg-blue-600 hover:bg-blue-700 text-sm"
                                  size="sm"
                                >
                                  {isCapturingLocation ? (
                                    <>
                                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                                      Getting Location...
                                    </>
                                  ) : (
                                    <>
                                      <Navigation className="mr-2 h-4 w-4" />
                                      Capture Current Location
                                    </>
                                  )}
                                </Button>
                              </div>

                              {formLocation && (
                                <div className="mb-4 p-3 bg-green-100 rounded-lg border border-green-300">
                                  <p className="text-sm text-green-800 font-medium">✅ Location Captured Successfully!</p>
                                  <p className="text-xs text-green-600">
                                    Lat: {formLocation.lat.toFixed(6)}, Lng: {formLocation.lng.toFixed(6)}
                                  </p>
                                </div>
                              )}

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="lat" className="text-sm font-medium">Latitude</Label>
                                  <Input 
                                    id="lat" 
                                    name="lat" 
                                    type="number" 
                                    step="any" 
                                    placeholder="28.6139"
                                    value={formLocation?.lat || ''}
                                    onChange={(e) => setFormLocation(prev => prev ? {...prev, lat: parseFloat(e.target.value)} : null)}
                                    className="border-blue-300 focus:border-blue-500"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="lng" className="text-sm font-medium">Longitude</Label>
                                  <Input 
                                    id="lng" 
                                    name="lng" 
                                    type="number" 
                                    step="any" 
                                    placeholder="77.2090"
                                    value={formLocation?.lng || ''}
                                    onChange={(e) => setFormLocation(prev => prev ? {...prev, lng: parseFloat(e.target.value)} : null)}
                                    className="border-blue-300 focus:border-blue-500"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between">
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => setCurrentStep(1)}
                          >
                            Previous
                          </Button>
                          <Button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="bg-green-600 hover:bg-green-700 min-w-[140px]"
                          >
                            {isSubmitting ? (
                              <>
                                <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                                Submitting...
                              </>
                            ) : (
                              <>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Add Meal Center
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    )}
                  </form>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 right-20 w-16 h-16 bg-green-200/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-40 w-12 h-12 bg-teal-200/20 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute top-40 right-60 w-8 h-8 bg-emerald-200/20 rounded-full blur-md animate-pulse delay-500"></div>
      </section>

      {/* Location Status Banner */}
      {userLocation && (
        <section className="py-3 bg-green-100 border-b border-green-200">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-2 text-green-800">
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-medium">
                📍 Location detected - Showing meal centers within {selectedRange}km radius
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Search and Filter Section */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md w-full lg:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name, location, or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-600" />
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Gurudwara">Gurudwara</SelectItem>
                    <SelectItem value="ISKCON Temple">ISKCON Temple</SelectItem>
                    <SelectItem value="Hindu Temple">Hindu Temple</SelectItem>
                    <SelectItem value="Mosque">Mosque</SelectItem>
                    <SelectItem value="Church">Church</SelectItem>
                    <SelectItem value="Community Kitchen">Community Kitchen</SelectItem>
                    <SelectItem value="NGO">NGO</SelectItem>
                    <SelectItem value="Government Center">Government Center</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-600" />
                <Select value={selectedRange.toString()} onValueChange={(value) => setSelectedRange(Number(value))}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 km</SelectItem>
                    <SelectItem value="10">10 km</SelectItem>
                    <SelectItem value="15">15 km</SelectItem>
                    <SelectItem value="20">20 km</SelectItem>
                    <SelectItem value="30">30 km</SelectItem>
                    <SelectItem value="50">50 km</SelectItem>
                    <SelectItem value="100">100 km</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary" className="text-sm">
                  {filteredCenters.length} centers found
                </Badge>
                <Badge variant="outline" className="text-sm bg-green-50 text-green-700 border-green-300">
                  Within {selectedRange}km
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meal Centers Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCenters.map((center) => (
              <Card key={center.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{center.name}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {center.address}
                      </CardDescription>
                    </div>
                    <Badge 
                      variant={center.isActive ? "default" : "secondary"}
                      className={center.isActive ? "bg-emerald-500 hover:bg-emerald-600" : ""}
                    >
                      {center.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{center.type}</Badge>
                      {center.distance && (
                        <span className="text-sm text-gray-600 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {center.distance} km away
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      {center.timings}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      Serves ~{center.capacity} people daily
                    </div>
                    
                    {center.description && (
                      <p className="text-sm text-gray-700 line-clamp-2">
                        {center.description}
                      </p>
                    )}
                    
                    {center.contact && (
                      <div className="pt-2 border-t">
                        <p className="text-sm font-medium">Contact: {center.contact}</p>
                      </div>
                    )}
                    
                    <div className="flex gap-2 pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 border-green-300 text-green-700 hover:bg-green-50"
                        onClick={() => openGoogleMaps(center)}
                      >
                        <Navigation className="h-4 w-4 mr-1" />
                        Get Directions
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-green-300 text-green-700 hover:bg-green-50"
                        onClick={() => handleShare(center)}
                      >
                        <Share className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredCenters.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No meal centers found matching your criteria.</p>
              <p className="text-gray-500 mt-2">Try adjusting your search or filter settings.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}