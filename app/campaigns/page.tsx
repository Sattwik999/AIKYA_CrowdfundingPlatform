"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Share2,
  Pause,
  Play,
  Trash2,
  TrendingUp,
  Users,
  Calendar,
  IndianRupee,
  Target,
  Clock,
  Star,
  MessageCircle,
  Download,
  Copy,
  ExternalLink
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Campaign {
  id: string
  title: string
  description: string
  goal: number
  raised: number
  donors: number
  category: string
  status: 'active' | 'paused' | 'completed' | 'draft'
  trustScore: number
  views: number
  shares: number
  imageUrl: string | null
  createdAt: string
  updatedAt: string
  endDate: string
  isUrgent: boolean
}

export default function CampaignsPage() {
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("newest")

  // Redirect if not authenticated
  if (status === "unauthenticated") {
    redirect("/")
  }

  useEffect(() => {
    if (session?.user?.id) {
      fetchCampaigns()
    }
  }, [session])

  useEffect(() => {
    filterAndSortCampaigns()
  }, [campaigns, searchTerm, statusFilter, categoryFilter, sortBy])

  const fetchCampaigns = async () => {
    try {
      setLoading(true)
      // Mock data - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockCampaigns: Campaign[] = [
        {
          id: '1',
          title: 'Help Children Education in Rural Areas',
          description: 'Supporting education for underprivileged children in rural communities across India.',
          goal: 100000,
          raised: 87500,
          donors: 234,
          category: 'Education',
          status: 'active',
          trustScore: 95,
          views: 5670,
          shares: 89,
          imageUrl: '/indian-children-studying-rural.jpg',
          createdAt: '2024-11-15T00:00:00Z',
          updatedAt: '2024-12-07T00:00:00Z',
          endDate: '2024-12-20T00:00:00Z',
          isUrgent: false
        },
        {
          id: '2',
          title: 'Medical Emergency Fund for Cancer Patient',
          description: 'Urgent medical fund needed for cancer treatment of a 45-year-old father of two.',
          goal: 200000,
          raised: 156000,
          donors: 189,
          category: 'Medical',
          status: 'active',
          trustScore: 88,
          views: 8340,
          shares: 156,
          imageUrl: '/indian-cancer-patient-hospital.jpg',
          createdAt: '2024-10-20T00:00:00Z',
          updatedAt: '2024-12-06T00:00:00Z',
          endDate: '2024-12-10T00:00:00Z',
          isUrgent: true
        },
        {
          id: '3',
          title: 'Animal Shelter Construction',
          description: 'Building a safe haven for rescued animals in Bangalore.',
          goal: 75000,
          raised: 75000,
          donors: 145,
          category: 'Animal Welfare',
          status: 'completed',
          trustScore: 92,
          views: 3290,
          shares: 67,
          imageUrl: '/placeholder.jpg',
          createdAt: '2024-09-01T00:00:00Z',
          updatedAt: '2024-11-30T00:00:00Z',
          endDate: '2024-11-30T00:00:00Z',
          isUrgent: false
        },
        {
          id: '4',
          title: 'Flood Relief for Kerala Villages',
          description: 'Emergency relief fund for flood-affected families in Kerala.',
          goal: 150000,
          raised: 32000,
          donors: 78,
          category: 'Disaster Relief',
          status: 'paused',
          trustScore: 85,
          views: 2100,
          shares: 34,
          imageUrl: '/placeholder.jpg',
          createdAt: '2024-11-01T00:00:00Z',
          updatedAt: '2024-12-01T00:00:00Z',
          endDate: '2024-12-31T00:00:00Z',
          isUrgent: true
        },
        {
          id: '5',
          title: 'Community Garden Project',
          description: 'Creating a sustainable community garden for local families.',
          goal: 50000,
          raised: 0,
          donors: 0,
          category: 'Community',
          status: 'draft',
          trustScore: 0,
          views: 0,
          shares: 0,
          imageUrl: null,
          createdAt: '2024-12-05T00:00:00Z',
          updatedAt: '2024-12-05T00:00:00Z',
          endDate: '2025-01-31T00:00:00Z',
          isUrgent: false
        }
      ]
      
      setCampaigns(mockCampaigns)
    } catch (err) {
      console.error("Failed to fetch campaigns:", err)
    } finally {
      setLoading(false)
    }
  }

  const filterAndSortCampaigns = () => {
    let filtered = campaigns.filter(campaign => {
      const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || campaign.status === statusFilter
      const matchesCategory = categoryFilter === "all" || campaign.category === categoryFilter
      
      return matchesSearch && matchesStatus && matchesCategory
    })

    // Sort campaigns
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case 'highest_raised':
          return b.raised - a.raised
        case 'most_donors':
          return b.donors - a.donors
        case 'ending_soon':
          return new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
        default:
          return 0
      }
    })

    setFilteredCampaigns(filtered)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getDaysLeft = (endDate: string) => {
    const now = new Date()
    const end = new Date(endDate)
    const diffTime = end.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: 'Active', variant: 'default' as const, color: 'bg-green-100 text-green-800' },
      paused: { label: 'Paused', variant: 'secondary' as const, color: 'bg-yellow-100 text-yellow-800' },
      completed: { label: 'Completed', variant: 'outline' as const, color: 'bg-blue-100 text-blue-800' },
      draft: { label: 'Draft', variant: 'outline' as const, color: 'bg-gray-100 text-gray-800' }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig]
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-300 rounded w-1/3"></div>
            <div className="grid gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl p-6">
                  <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const stats = {
    total: campaigns.length,
    active: campaigns.filter(c => c.status === 'active').length,
    completed: campaigns.filter(c => c.status === 'completed').length,
    totalRaised: campaigns.reduce((sum, c) => sum + c.raised, 0),
    totalDonors: campaigns.reduce((sum, c) => sum + c.donors, 0)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Campaigns</h1>
              <p className="text-gray-600">Manage and track your fundraising campaigns</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
              <Button size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Create Campaign
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Campaigns</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.active}</div>
              <div className="text-sm text-gray-600">Active</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.completed}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600">{formatCurrency(stats.totalRaised)}</div>
              <div className="text-sm text-gray-600">Total Raised</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.totalDonors}</div>
              <div className="text-sm text-gray-600">Total Donors</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search campaigns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Medical">Medical</SelectItem>
                    <SelectItem value="Animal Welfare">Animal Welfare</SelectItem>
                    <SelectItem value="Disaster Relief">Disaster Relief</SelectItem>
                    <SelectItem value="Community">Community</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="highest_raised">Highest Raised</SelectItem>
                    <SelectItem value="most_donors">Most Donors</SelectItem>
                    <SelectItem value="ending_soon">Ending Soon</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Campaigns List */}
        <div className="space-y-6">
          {filteredCampaigns.length > 0 ? (
            filteredCampaigns.map((campaign) => (
              <Card key={campaign.id} className="hover:shadow-lg transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-6">
                    {/* Campaign Image */}
                    <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      {campaign.imageUrl && (
                        <img
                          src={campaign.imageUrl}
                          alt={campaign.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    {/* Campaign Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 truncate">
                              {campaign.title}
                            </h3>
                            {campaign.isUrgent && (
                              <Badge className="bg-red-100 text-red-800 border-red-200">
                                Urgent
                              </Badge>
                            )}
                            {getStatusBadge(campaign.status)}
                          </div>
                          <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                            {campaign.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Target className="w-4 h-4" />
                              {campaign.category}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Created {formatDate(campaign.createdAt)}
                            </span>
                            {campaign.status === 'active' && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {getDaysLeft(campaign.endDate)} days left
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2">
                              <Eye className="w-4 h-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <Edit className="w-4 h-4" />
                              Edit Campaign
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <Share2 className="w-4 h-4" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <Copy className="w-4 h-4" />
                              Copy Link
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {campaign.status === 'active' ? (
                              <DropdownMenuItem className="gap-2">
                                <Pause className="w-4 h-4" />
                                Pause Campaign
                              </DropdownMenuItem>
                            ) : campaign.status === 'paused' ? (
                              <DropdownMenuItem className="gap-2">
                                <Play className="w-4 h-4" />
                                Resume Campaign
                              </DropdownMenuItem>
                            ) : null}
                            <DropdownMenuItem className="gap-2 text-red-600">
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Progress Section */}
                      {campaign.status !== 'draft' && (
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">
                              {formatCurrency(campaign.raised)} raised
                            </span>
                            <span className="text-gray-600">
                              Goal: {formatCurrency(campaign.goal)}
                            </span>
                          </div>
                          <Progress 
                            value={(campaign.raised / campaign.goal) * 100} 
                            className="h-2"
                          />
                          
                          {/* Stats Row */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {campaign.donors} donors
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {campaign.views.toLocaleString()} views
                              </span>
                              <span className="flex items-center gap-1">
                                <Share2 className="w-4 h-4" />
                                {campaign.shares} shares
                              </span>
                              <span className="flex items-center gap-1">
                                <Star className="w-4 h-4" />
                                {campaign.trustScore}% trust
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" className="gap-2">
                                <MessageCircle className="w-4 h-4" />
                                Update Donors
                              </Button>
                              <Button variant="outline" size="sm" className="gap-2">
                                <ExternalLink className="w-4 h-4" />
                                View Public Page
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {campaign.status === 'draft' && (
                        <div className="flex items-center gap-2 mt-3">
                          <Button size="sm" className="gap-2">
                            <Edit className="w-4 h-4" />
                            Continue Editing
                          </Button>
                          <Button variant="outline" size="sm">
                            Preview
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {campaigns.length === 0 ? "No campaigns yet" : "No matching campaigns"}
                </h3>
                <p className="text-gray-600 mb-4">
                  {campaigns.length === 0 
                    ? "Start your first fundraising campaign to make a difference."
                    : "Try adjusting your filters to see more campaigns."
                  }
                </p>
                {campaigns.length === 0 && (
                  <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    Create Your First Campaign
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}