"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { FundraiserCard } from "@/components/fundraiser-card"
import { Search, Filter, TrendingUp, Clock, Heart, Users, Target, SlidersHorizontal, CheckCircle } from "lucide-react"



export default function BrowseFundraisersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("trending")
  const [locationFilter, setLocationFilter] = useState("")
  const [selectedAmountRange, setSelectedAmountRange] = useState<string>("all")
  const [urgentOnly, setUrgentOnly] = useState(false)
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  
  // API data state
  const [fundraisers, setFundraisers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch fundraisers from API
  useEffect(() => {
    const fetchFundraisers = async () => {
      try {
        setLoading(true)
        const params = new URLSearchParams()
        
        if (searchTerm) params.append('search', searchTerm)
        if (selectedCategory !== 'all') params.append('category', selectedCategory)
        if (sortBy) params.append('sortBy', sortBy)
        if (verifiedOnly) params.append('verified', 'true')
        
        const response = await fetch(`/api/fundraisers?${params.toString()}`)
        if (!response.ok) {
          throw new Error('Failed to fetch fundraisers')
        }
        
        const data = await response.json()
        setFundraisers(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        console.error('Error fetching fundraisers:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchFundraisers()
  }, [searchTerm, selectedCategory, sortBy, verifiedOnly])

  // Note: selectedType, locationFilter, selectedAmountRange, and urgentOnly are handled client-side

  const categories = ["all", "Medical", "Education", "Healthcare", "Disaster Relief", "Social Welfare"]
  
  // Client-side filtering for fields not handled by API (search, category, verified are handled by API)
  const filteredAndSortedFundraisers = fundraisers
    .filter((fundraiser) => {
      const matchesType = selectedType === "all" || fundraiser.type === selectedType
      const matchesLocation = !locationFilter || fundraiser.location.toLowerCase().includes(locationFilter.toLowerCase())
      
      const matchesAmountRange = (() => {
        if (selectedAmountRange === "all") return true
        if (selectedAmountRange === "under50k") return fundraiser.goal < 50000
        if (selectedAmountRange === "50k-200k") return fundraiser.goal >= 50000 && fundraiser.goal <= 200000
        if (selectedAmountRange === "200k-500k") return fundraiser.goal >= 200000 && fundraiser.goal <= 500000
        if (selectedAmountRange === "above500k") return fundraiser.goal > 500000
        return true
      })()
      
      const matchesUrgency = !urgentOnly || fundraiser.isUrgent
      
      return matchesType && matchesLocation && matchesAmountRange && matchesUrgency
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "trending":
          return b.donors - a.donors
        case "recent":
          return b.daysLeft - a.daysLeft // Sort by most recently created (fewer days left = more recent)
        case "goal_high":
          return b.goal - a.goal
        case "goal_low":
          return a.goal - b.goal
        case "urgent":
          return Number(b.isUrgent) - Number(a.isUrgent)
        default:
          return 0
      }
    })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Beautiful Header Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hearts" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1.5" fill="currentColor" />
                <path d="M10 6c0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.21-1.79 4-4 4-1.38 0-2.6-.7-3.31-1.76C10.17 7.3 10 6.67 10 6z" fill="currentColor" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#hearts)" />
          </svg>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 text-sm font-medium text-blue-700">
              <Heart className="h-4 w-4" />
              <span>Join thousands of compassionate supporters</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Discover Causes That 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Matter</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Support meaningful causes and make a real difference in people's lives. 
              Every contribution counts towards building a better tomorrow.
            </p>
            
            {/* Stats */}
            <div className="flex items-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-600">Live campaigns</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-500" />
                <span className="text-gray-600">Trusted by thousands</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-gray-600">Verified causes</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 right-20 w-16 h-16 bg-blue-200/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-40 w-12 h-12 bg-purple-200/20 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute top-40 right-60 w-8 h-8 bg-indigo-200/20 rounded-full blur-md animate-pulse delay-500"></div>
      </section>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Left Sidebar - Enhanced Filters */}
          <aside className="w-80 bg-white rounded-xl shadow-lg border border-gray-100 sticky top-8 max-h-[calc(100vh-2rem)] overflow-y-auto">
            <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Filters</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                  setSelectedType("all")
                  setLocationFilter("")
                  setSelectedAmountRange("all")
                  setUrgentOnly(false)
                  setVerifiedOnly(false)
                }}
                className="text-blue-600 hover:text-blue-700"
              >
                Clear All
              </Button>
            </div>
            
            {/* Search */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-800 mb-3">🔍 Search Campaigns</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search by title, organizer, location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              {searchTerm && (
                <div className="mt-2 text-xs text-blue-600 font-medium">
                  Searching for "{searchTerm}"
                </div>
              )}
            </div>

            {/* Quick Filters */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-800 mb-3">⚡ Quick Filters</label>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={urgentOnly ? "default" : "outline"}
                  className={`cursor-pointer transition-all ${urgentOnly ? 'bg-red-500 text-white' : 'hover:bg-red-50 hover:border-red-300'}`}
                  onClick={() => setUrgentOnly(!urgentOnly)}
                >
                  🚨 Urgent Only
                </Badge>
                <Badge
                  variant={verifiedOnly ? "default" : "outline"}
                  className={`cursor-pointer transition-all ${verifiedOnly ? 'bg-green-500 text-white' : 'hover:bg-green-50 hover:border-green-300'}`}
                  onClick={() => setVerifiedOnly(!verifiedOnly)}
                >
                  ✅ Verified Only
                </Badge>
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-800 mb-3">🏷️ Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Type Filter */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-800 mb-3">👥 Type</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select campaign type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Individual">👤 Personal</SelectItem>
                  <SelectItem value="NGO">🏢 NGO</SelectItem>
                  <SelectItem value="Campaign">👥 Community</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Location Filter */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-800 mb-3">📍 Location</label>
              <Input
                type="text"
                placeholder="Search by city or state..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Goal Amount Filter */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-800 mb-3">💰 Goal Amount</label>
              <Select value={selectedAmountRange} onValueChange={setSelectedAmountRange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select amount range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Amount</SelectItem>
                  <SelectItem value="under50k">Under ₹50K</SelectItem>
                  <SelectItem value="50k-200k">₹50K - ₹2L</SelectItem>
                  <SelectItem value="200k-500k">₹2L - ₹5L</SelectItem>
                  <SelectItem value="above500k">Above ₹5L</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Active Filters Summary */}
            {(searchTerm || selectedCategory !== "all" || selectedType !== "all" || locationFilter || selectedAmountRange !== "all" || urgentOnly || verifiedOnly) && (
              <div className="border-t pt-4">
                <div className="text-sm font-semibold text-gray-800 mb-2">Active Filters:</div>
                <div className="text-xs text-blue-600 space-y-1">
                  {searchTerm && <div>• Search: "{searchTerm}"</div>}
                  {selectedCategory !== "all" && <div>• Category: {selectedCategory}</div>}
                  {selectedType !== "all" && <div>• Type: {selectedType}</div>}
                  {locationFilter && <div>• Location: {locationFilter}</div>}
                  {selectedAmountRange !== "all" && <div>• Amount: {selectedAmountRange}</div>}
                  {urgentOnly && <div>• Urgent campaigns only</div>}
                  {verifiedOnly && <div>• Verified campaigns only</div>}
                </div>
              </div>
            )}
            </div>
          </aside>

          {/* Right Content Area */}
          <main className="flex-1">
            {/* Sort and Results Count */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-600">
                {filteredAndSortedFundraisers.length} campaigns found
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trending">Most Popular</SelectItem>
                  <SelectItem value="recent">Recently Added</SelectItem>
                  <SelectItem value="goal_high">Highest Goal</SelectItem>
                  <SelectItem value="goal_low">Lowest Goal</SelectItem>
                  <SelectItem value="urgent">Most Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Fundraisers Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
                    <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-16 bg-white rounded-lg border border-red-200">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                  <Search className="h-6 w-6 text-red-400" />
                </div>
                <h3 className="text-lg font-medium text-red-900 mb-2">Error loading campaigns</h3>
                <p className="text-red-600 mb-4">{error}</p>
                <Button 
                  onClick={() => window.location.reload()} 
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-50"
                >
                  Try Again
                </Button>
              </div>
            ) : filteredAndSortedFundraisers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAndSortedFundraisers.map((fundraiser) => (
                  <FundraiserCard key={fundraiser.id} fundraiser={fundraiser} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
