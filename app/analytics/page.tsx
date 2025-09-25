"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users, 
  IndianRupee,
  Calendar,
  Target,
  Eye,
  Share2,
  Heart,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  MapPin,
  Filter,
  Download,
  RefreshCw
} from "lucide-react"

export default function AnalyticsPage() {
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d')

  // Redirect if not authenticated
  if (status === "unauthenticated") {
    redirect("/")
  }

  useEffect(() => {
    if (session?.user?.id) {
      // Simulate data loading
      setTimeout(() => setLoading(false), 1000)
    }
  }, [session, timeRange])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-300 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-xl p-6">
                  <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
                  <div className="h-8 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
              <p className="text-gray-600">Detailed insights into your campaign performance</p>
            </div>
            <div className="flex items-center gap-4">
              <Select value={timeRange} onValueChange={(value: '7d' | '30d' | '90d' | '1y') => setTimeRange(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        
        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold text-gray-900">24,387</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600">+12.5%</span>
                    <span className="text-sm text-gray-500">vs last {timeRange}</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">3.42%</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600">+0.8%</span>
                    <span className="text-sm text-gray-500">vs last {timeRange}</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Donation</p>
                  <p className="text-2xl font-bold text-gray-900">₹1,847</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingDown className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-red-600">-2.1%</span>
                    <span className="text-sm text-gray-500">vs last {timeRange}</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <IndianRupee className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Social Shares</p>
                  <p className="text-2xl font-bold text-gray-900">1,234</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600">+18.3%</span>
                    <span className="text-sm text-gray-500">vs last {timeRange}</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Share2 className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Analytics Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="donors">Donors</TabsTrigger>
            <TabsTrigger value="traffic">Traffic</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Donation Trends */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-500" />
                    Donation Trends
                  </CardTitle>
                  <CardDescription>Daily donation amounts over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                      <p>Chart visualization would go here</p>
                      <p className="text-sm">Showing {timeRange} data</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Performing Categories */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Categories</CardTitle>
                  <CardDescription>Categories by total donations received</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { category: 'Education', amount: 125000, percentage: 35, color: 'bg-blue-500' },
                    { category: 'Medical Emergency', amount: 98000, percentage: 28, color: 'bg-red-500' },
                    { category: 'Animal Welfare', amount: 67000, percentage: 19, color: 'bg-green-500' },
                    { category: 'Disaster Relief', amount: 45000, percentage: 13, color: 'bg-yellow-500' },
                    { category: 'Community Development', amount: 18000, percentage: 5, color: 'bg-purple-500' }
                  ].map((item) => (
                    <div key={item.category} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                        <span className="font-medium">{item.category}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{formatCurrency(item.amount)}</div>
                        <div className="text-sm text-gray-500">{item.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Campaign Success Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">68%</div>
                    <p className="text-sm text-gray-600 mt-1">of campaigns reach their goal</p>
                    <Progress value={68} className="mt-4" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Average Campaign Duration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">42</div>
                    <p className="text-sm text-gray-600 mt-1">days to complete</p>
                    <div className="flex items-center justify-center gap-1 mt-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>Median: 38 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Repeat Donor Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">24%</div>
                    <p className="text-sm text-gray-600 mt-1">donors contribute again</p>
                    <div className="flex items-center justify-center gap-1 mt-2 text-sm text-gray-500">
                      <Heart className="w-4 h-4" />
                      <span>Strong loyalty</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
                <CardDescription>Detailed breakdown of your campaign metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: 'Help Children Education in Rural Areas',
                      raised: 87500,
                      goal: 100000,
                      donors: 234,
                      views: 5670,
                      conversionRate: 4.1,
                      status: 'active'
                    },
                    {
                      title: 'Medical Emergency Fund for Cancer Patient',
                      raised: 156000,
                      goal: 200000,
                      donors: 189,
                      views: 8340,
                      conversionRate: 2.3,
                      status: 'active'
                    },
                    {
                      title: 'Animal Shelter Construction',
                      raised: 75000,
                      goal: 75000,
                      donors: 145,
                      views: 3290,
                      conversionRate: 4.4,
                      status: 'completed'
                    }
                  ].map((campaign, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-medium text-gray-900">{campaign.title}</h3>
                          <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                            <span>{formatCurrency(campaign.raised)} / {formatCurrency(campaign.goal)}</span>
                            <span>{campaign.donors} donors</span>
                            <span>{campaign.views.toLocaleString()} views</span>
                          </div>
                        </div>
                        <Badge variant={campaign.status === 'completed' ? 'default' : 'outline'}>
                          {campaign.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{Math.round((campaign.raised / campaign.goal) * 100)}%</span>
                        </div>
                        <Progress value={(campaign.raised / campaign.goal) * 100} />
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Conversion Rate: {campaign.conversionRate}%</span>
                          <span>Avg Donation: {formatCurrency(campaign.raised / campaign.donors)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="donors" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Donor Insights</CardTitle>
                  <CardDescription>Understanding your supporter base</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">847</div>
                      <div className="text-sm text-gray-600">Total Unique Donors</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">24%</div>
                      <div className="text-sm text-gray-600">Repeat Donors</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Donation Amount Distribution</h4>
                    <div className="space-y-2">
                      {[
                        { range: '₹100 - ₹500', percentage: 45, count: 380 },
                        { range: '₹501 - ₹1,000', percentage: 28, count: 237 },
                        { range: '₹1,001 - ₹5,000', percentage: 18, count: 152 },
                        { range: '₹5,001 - ₹10,000', percentage: 6, count: 51 },
                        { range: '₹10,000+', percentage: 3, count: 27 }
                      ].map((item) => (
                        <div key={item.range} className="flex items-center justify-between">
                          <span className="text-sm">{item.range}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${item.percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600 w-12">{item.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Donors</CardTitle>
                  <CardDescription>Your most generous supporters</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Rajesh Kumar', amount: 25000, donations: 8, avatar: 'RK' },
                      { name: 'Priya Sharma', amount: 18500, donations: 5, avatar: 'PS' },
                      { name: 'Anonymous', amount: 15000, donations: 3, avatar: '?' },
                      { name: 'Amit Patel', amount: 12000, donations: 6, avatar: 'AP' },
                      { name: 'Kavya Reddy', amount: 10500, donations: 4, avatar: 'KR' }
                    ].map((donor, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                            {donor.avatar}
                          </div>
                          <div>
                            <div className="font-medium">{donor.name}</div>
                            <div className="text-sm text-gray-600">{donor.donations} donations</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{formatCurrency(donor.amount)}</div>
                          <div className="text-sm text-gray-600">total</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="traffic" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                  <CardDescription>Where your visitors are coming from</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { source: 'Direct', visits: 8450, percentage: 35, icon: Globe },
                    { source: 'Social Media', visits: 6720, percentage: 28, icon: Share2 },
                    { source: 'Search Engines', visits: 4890, percentage: 20, icon: Globe },
                    { source: 'Email', visits: 2340, percentage: 10, icon: Heart },
                    { source: 'Referrals', visits: 1670, percentage: 7, icon: Users }
                  ].map((item) => (
                    <div key={item.source} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 text-gray-500" />
                        <span className="font-medium">{item.source}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-16">{item.visits.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Device Breakdown</CardTitle>
                  <CardDescription>Visitor device preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { device: 'Mobile', percentage: 62, icon: Smartphone, color: 'bg-blue-500' },
                    { device: 'Desktop', percentage: 28, icon: Monitor, color: 'bg-green-500' },
                    { device: 'Tablet', percentage: 10, icon: Smartphone, color: 'bg-purple-500' }
                  ].map((item) => (
                    <div key={item.device} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 text-gray-500" />
                        <span className="font-medium">{item.device}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className={`${item.color} h-2 rounded-full`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-12">{item.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="demographics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Geographic Distribution</CardTitle>
                  <CardDescription>Where your donors are located</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { location: 'Mumbai, Maharashtra', percentage: 24, donations: 203 },
                    { location: 'Delhi, NCR', percentage: 18, donations: 152 },
                    { location: 'Bangalore, Karnataka', percentage: 15, donations: 127 },
                    { location: 'Chennai, Tamil Nadu', percentage: 12, donations: 102 },
                    { location: 'Pune, Maharashtra', percentage: 9, donations: 76 },
                    { location: 'Hyderabad, Telangana', percentage: 8, donations: 68 },
                    { location: 'Other Cities', percentage: 14, donations: 119 }
                  ].map((item) => (
                    <div key={item.location} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{item.location}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-16">{item.donations} donors</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Age Demographics</CardTitle>
                  <CardDescription>Donor age distribution</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { ageGroup: '18-25', percentage: 15, color: 'bg-red-500' },
                    { ageGroup: '26-35', percentage: 32, color: 'bg-blue-500' },
                    { ageGroup: '36-45', percentage: 28, color: 'bg-green-500' },
                    { ageGroup: '46-55', percentage: 16, color: 'bg-yellow-500' },
                    { ageGroup: '56+', percentage: 9, color: 'bg-purple-500' }
                  ].map((item) => (
                    <div key={item.ageGroup} className="flex items-center justify-between">
                      <span className="font-medium">{item.ageGroup} years</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className={`${item.color} h-2 rounded-full`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-12">{item.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}