"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  TrendingUp, 
  Heart, 
  Target, 
  Users, 
  Plus,
  Calendar,
  Star,
  Eye,
  Edit,
  BarChart3,
  Zap,
  AlertTriangle,
  ExternalLink,
  Search
} from "lucide-react"

interface Fundraiser {
  id: string
  title: string
  description: string
  goal: number
  raised: number
  category: string
  imageUrl: string | null
  trustScore: number
  isActive: boolean
  createdAt: string
  updatedAt: string
  _count: {
    contributions: number
  }
}

interface Contribution {
  id: string
  amount: number
  message: string | null
  isAnonymous: boolean
  createdAt: string
  fundraiser: {
    id: string
    title: string
    category: string
    imageUrl: string | null
  }
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [fundraisers, setFundraisers] = useState<Fundraiser[]>([])
  const [contributions, setContributions] = useState<Contribution[]>([])
  const [error, setError] = useState<string | null>(null)

  // Redirect if not authenticated
  if (status === "unauthenticated") {
    redirect("/")
  }

  useEffect(() => {
    if (session?.user?.id) {
      fetchDashboardData()
    }
  }, [session])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch user's fundraisers
      const fundraisersRes = await fetch('/api/fundraisers/my-campaigns')
      if (!fundraisersRes.ok) {
        const errorText = await fundraisersRes.text()
        throw new Error(`Failed to fetch campaigns: ${errorText}`)
      }
      const fundraisersData = await fundraisersRes.json()
      setFundraisers(Array.isArray(fundraisersData) ? fundraisersData : [])

      // Fetch user's contributions
      const contributionsRes = await fetch('/api/contributions/my-donations')
      if (!contributionsRes.ok) {
        const errorText = await contributionsRes.text()
        throw new Error(`Failed to fetch donations: ${errorText}`)
      }
      const contributionsData = await contributionsRes.json()
      setContributions(Array.isArray(contributionsData) ? contributionsData : [])

    } catch (err) {
      console.error("Dashboard data fetch error:", err)
      setError(err instanceof Error ? err.message : "Failed to load dashboard data")
      // Set empty arrays on error so the dashboard still shows
      setFundraisers([])
      setContributions([])
    } finally {
      setLoading(false)
    }
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

  // Calculate stats
  const stats = {
    totalCampaigns: fundraisers.length,
    activeCampaigns: fundraisers.filter(f => f.isActive).length,
    totalRaised: fundraisers.reduce((sum, f) => sum + f.raised, 0),
    totalGoal: fundraisers.reduce((sum, f) => sum + f.goal, 0),
    totalDonations: contributions.length,
    totalDonated: contributions.reduce((sum, c) => sum + c.amount, 0),
    totalDonors: fundraisers.reduce((sum, f) => sum + f._count.contributions, 0),
    averageTrustScore: fundraisers.length > 0 
      ? Math.round(fundraisers.reduce((sum, f) => sum + f.trustScore, 0) / fundraisers.length)
      : 0
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-300 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-xl p-6 h-32"></div>
              ))}
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white rounded-xl p-6 h-96"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
          <div className="mt-4">
            <Button onClick={fetchDashboardData}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {session?.user?.name || 'User'}!
              </h1>
              <p className="text-gray-600 mt-1">
                Here's your fundraising and donation overview
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/analytics">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Link>
              </Button>
              <Button asChild>
                <Link href="/campaigns">
                  <Plus className="w-4 h-4 mr-2" />
                  New Campaign
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 mb-1">My Campaigns</p>
                  <p className="text-2xl font-bold text-blue-900">{stats.totalCampaigns}</p>
                  <p className="text-xs text-blue-700">
                    {stats.activeCampaigns} active
                  </p>
                </div>
                <Target className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600 mb-1">Total Raised</p>
                  <p className="text-2xl font-bold text-green-900">{formatCurrency(stats.totalRaised)}</p>
                  <p className="text-xs text-green-700">
                    of {formatCurrency(stats.totalGoal)} goal
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600 mb-1">My Donations</p>
                  <p className="text-2xl font-bold text-purple-900">{stats.totalDonations}</p>
                  <p className="text-xs text-purple-700">
                    {formatCurrency(stats.totalDonated)} donated
                  </p>
                </div>
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600 mb-1">Total Donors</p>
                  <p className="text-2xl font-bold text-orange-900">{stats.totalDonors}</p>
                  <p className="text-xs text-orange-700">
                    {stats.averageTrustScore}% avg trust
                  </p>
                </div>
                <Users className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="campaigns" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="campaigns">My Campaigns</TabsTrigger>
            <TabsTrigger value="donations">My Donations</TabsTrigger>
          </TabsList>

          {/* My Campaigns Tab */}
          <TabsContent value="campaigns" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">My Campaigns</h2>
              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <Link href="/campaigns">
                    <Eye className="w-4 h-4 mr-2" />
                    View All
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/campaigns/new">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Campaign
                  </Link>
                </Button>
              </div>
            </div>

            {fundraisers.length > 0 ? (
              <div className="grid gap-6">
                {fundraisers.slice(0, 3).map((fundraiser) => (
                  <Card key={fundraiser.id} className="hover:shadow-lg transition-all duration-200">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          {fundraiser.imageUrl && (
                            <img
                              src={fundraiser.imageUrl}
                              alt={fundraiser.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                {fundraiser.title}
                              </h3>
                              <div className="flex items-center gap-3 text-sm text-gray-600">
                                <Badge variant="outline">{fundraiser.category}</Badge>
                                <span className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-500" />
                                  {fundraiser.trustScore}% trust
                                </span>
                                <span className={`flex items-center gap-1 ${fundraiser.isActive ? 'text-green-600' : 'text-red-600'}`}>
                                  <div className={`w-2 h-2 rounded-full ${fundraiser.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                  {fundraiser.isActive ? 'Active' : 'Inactive'}
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/fundraisers/${fundraiser.id}`}>
                                  <ExternalLink className="w-4 h-4" />
                                </Link>
                              </Button>
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/campaigns/${fundraiser.id}/edit`}>
                                  <Edit className="w-4 h-4" />
                                </Link>
                              </Button>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">
                                {formatCurrency(fundraiser.raised)} raised
                              </span>
                              <span className="text-gray-600">
                                Goal: {formatCurrency(fundraiser.goal)}
                              </span>
                            </div>
                            <Progress 
                              value={(fundraiser.raised / fundraiser.goal) * 100} 
                              className="h-2"
                            />
                            <div className="flex items-center justify-between text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {fundraiser._count.contributions} donors
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                Created {formatDate(fundraiser.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No campaigns yet
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Start your first fundraising campaign to make a difference.
                  </p>
                  <Button asChild>
                    <Link href="/campaigns/new">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Your First Campaign
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* My Donations Tab */}
          <TabsContent value="donations" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">My Donations</h2>
              <Button variant="outline" asChild>
                <Link href="/browse-fundraisers">
                  <Heart className="w-4 h-4 mr-2" />
                  Find More Causes
                </Link>
              </Button>
            </div>

            {contributions.length > 0 ? (
              <div className="space-y-4">
                {contributions.slice(0, 5).map((contribution) => (
                  <Card key={contribution.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          {contribution.fundraiser.imageUrl && (
                            <img
                              src={contribution.fundraiser.imageUrl}
                              alt={contribution.fundraiser.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-1">
                                {contribution.fundraiser.title}
                              </h4>
                              <div className="flex items-center gap-3 text-sm text-gray-600">
                                <Badge variant="outline">{contribution.fundraiser.category}</Badge>
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {formatDate(contribution.createdAt)}
                                </span>
                              </div>
                              {contribution.message && (
                                <p className="text-sm text-gray-600 mt-2 italic">
                                  "{contribution.message}"
                                </p>
                              )}
                            </div>
                            
                            <div className="text-right">
                              <p className="text-lg font-bold text-green-600">
                                {formatCurrency(contribution.amount)}
                              </p>
                              {contribution.isAnonymous && (
                                <Badge variant="secondary" className="text-xs">
                                  Anonymous
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {contributions.length > 5 && (
                  <div className="text-center">
                    <Button variant="outline" asChild>
                      <Link href="/donations/history">
                        View All Donations ({contributions.length})
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No donations yet
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Start supporting causes you care about by making your first donation.
                  </p>
                  <Button asChild>
                    <Link href="/browse-fundraisers">
                      <Heart className="w-4 h-4 mr-2" />
                      Explore Fundraisers
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" asChild>
                <Link href="/campaigns/new">
                  <Plus className="w-6 h-6" />
                  <span>Create Campaign</span>
                </Link>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" asChild>
                <Link href="/browse-fundraisers">
                  <Search className="w-6 h-6" />
                  <span>Browse Causes</span>
                </Link>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" asChild>
                <Link href="/campaigns">
                  <Target className="w-6 h-6" />
                  <span>Manage Campaigns</span>
                </Link>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" asChild>
                <Link href="/profile">
                  <Users className="w-6 h-6" />
                  <span>Edit Profile</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}