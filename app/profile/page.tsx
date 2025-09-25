"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Shield, 
  Heart, 
  Target, 
  Users, 
  TrendingUp, 
  Edit,
  Save,
  X,
  Plus,
  MapPin,
  Camera,
  Star,
  Trophy,
  Activity,
  CreditCard,
  Settings,
  ChevronRight,
  Clock,
  IndianRupee
} from "lucide-react"

interface UserProfile {
  id: string
  name: string | null
  email: string
  image: string | null
  phone: string | null
  dob?: string | null
  pan?: string | null
  aadhaar?: string | null
  address?: string | null
  bio?: string | null
  isVerified: boolean
  createdAt: string
  updatedAt: string
}

interface UserStats {
  totalFundraisers: number
  totalRaised: number
  totalContributions: number
  totalDonated: number
  successfulCampaigns: number
  averageTrustScore: number
}

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
  contributionsCount: number
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
    imageUrl: string | null
  }
}

export default function MyProfilePage() {
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [stats, setStats] = useState<UserStats | null>(null)
  const [fundraisers, setFundraisers] = useState<Fundraiser[]>([])
  const [contributions, setContributions] = useState<Contribution[]>([])
  
  const [editForm, setEditForm] = useState({
    name: "",
    phone: "",
    dob: "",
    pan: "",
    aadhaar: "",
    address: "",
    bio: "",
  })

  // Redirect if not authenticated
  if (status === "unauthenticated") {
    redirect("/")
  }

  useEffect(() => {
    if (session?.user?.id) {
      fetchProfileData()
    }
  }, [session])

  const fetchProfileData = async () => {
    try {
      setLoading(true)
      
      // Fetch user profile
      const profileResponse = await fetch("/api/profile")
      if (!profileResponse.ok) throw new Error("Failed to fetch profile")
      const profileData = await profileResponse.json()
      
      setProfile(profileData.user)
      setStats(profileData.stats)
      setFundraisers(profileData.fundraisers)
      setContributions(profileData.contributions)
      
      // Set edit form with current data
      setEditForm({
        name: profileData.user.name || "",
        phone: profileData.user.phone || "",
        dob: profileData.user.dob ? profileData.user.dob.substring(0,10) : "",
        pan: profileData.user.pan || "",
        aadhaar: profileData.user.aadhaar || "",
        address: profileData.user.address || "",
        bio: profileData.user.bio || "",
      })
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleSaveProfile = async () => {
    try {
      setSaving(true)
      
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editForm),
      })
      
      if (!response.ok) throw new Error("Failed to update profile")
      
      await fetchProfileData()
      setIsEditing(false)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Loading skeleton */}
            <div className="space-y-6">
              <div className="h-8 bg-gray-300 rounded w-1/3 animate-pulse"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-lg p-6 animate-pulse">
                    <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
                    <div className="h-8 bg-gray-300 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <Alert className="max-w-md mx-auto border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  if (!profile || !stats) return null

  const getUserInitials = (name: string | null) => {
    if (!name) return "U"
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
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
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Header Section */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32 relative">
              <div className="absolute -bottom-16 left-8">
                <div className="relative">
                  <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                    <AvatarImage src={profile.image || ""} alt={profile.name || ""} />
                    <AvatarFallback className="text-2xl font-bold bg-blue-100 text-blue-600">
                      {getUserInitials(profile.name)}
                    </AvatarFallback>
                  </Avatar>
                  <Button 
                    size="sm" 
                    className="absolute bottom-2 right-2 rounded-full w-8 h-8 p-0 bg-white text-gray-600 shadow-md hover:bg-gray-50"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="pt-20 pb-6 px-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">
                      {profile.name || "Anonymous User"}
                    </h1>
                    {profile.isVerified && (
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        <Shield className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-600 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {profile.email}
                  </p>
                  {profile.phone && (
                    <p className="text-gray-600 flex items-center gap-2 mt-1">
                      <Phone className="w-4 h-4" />
                      {profile.phone}
                    </p>
                  )}
                  {profile.dob && (
                    <p className="text-gray-600 flex items-center gap-2 mt-1">
                      <Calendar className="w-4 h-4" />
                      DOB: {formatDate(profile.dob)}
                    </p>
                  )}
                  {profile.address && (
                    <p className="text-gray-600 flex items-center gap-2 mt-1">
                      <MapPin className="w-4 h-4" />
                      {profile.address}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 flex items-center gap-2 mt-2">
                    <Calendar className="w-4 h-4" />
                    Member since {formatDate(profile.createdAt)}
                  </p>
                </div>
                
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant={isEditing ? "outline" : "default"}
                  className="gap-2"
                >
                  {isEditing ? (
                    <>
                      <X className="w-4 h-4" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <Edit className="w-4 h-4" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Edit Profile Form */}
          {isEditing && (
            <Card>
              <CardHeader>
                <CardTitle>Edit Profile Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={editForm.dob}
                      onChange={(e) => setEditForm({ ...editForm, dob: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={editForm.address}
                      onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                      placeholder="Street, City, State"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pan">PAN (Optional)</Label>
                    <Input
                      id="pan"
                      value={editForm.pan}
                      onChange={(e) => setEditForm({ ...editForm, pan: e.target.value.toUpperCase() })}
                      placeholder="ABCDE1234F"
                    />
                  </div>
                  <div>
                    <Label htmlFor="aadhaar">Aadhaar (Optional)</Label>
                    <Input
                      id="aadhaar"
                      value={editForm.aadhaar}
                      onChange={(e) => setEditForm({ ...editForm, aadhaar: e.target.value })}
                      placeholder="XXXX XXXX XXXX"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bio">Bio (Optional)</Label>
                  <Textarea
                    id="bio"
                    value={editForm.bio}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    placeholder="Tell us about yourself..."
                    rows={3}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSaveProfile} disabled={saving} className="gap-2">
                    <Save className="w-4 h-4" />
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Campaigns Created</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalFundraisers}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-2">
                  <Badge variant="outline" className="text-xs">
                    {stats.successfulCampaigns} successful
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Raised</p>
                    <p className="text-2xl font-bold text-green-600">{formatCurrency(stats.totalRaised)}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Donated</p>
                    <p className="text-2xl font-bold text-purple-600">{formatCurrency(stats.totalDonated)}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-2">
                  <Badge variant="outline" className="text-xs">
                    {stats.totalContributions} donations
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Trust Score</p>
                    <p className="text-2xl font-bold text-orange-600">{stats.averageTrustScore}%</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <Progress value={stats.averageTrustScore} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="campaigns" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="campaigns">My Campaigns</TabsTrigger>
              <TabsTrigger value="donations">My Donations</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="campaigns" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">My Fundraising Campaigns</h2>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create New Campaign
                </Button>
              </div>

              {fundraisers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {fundraisers.map((fundraiser) => (
                    <Card key={fundraiser.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                            {fundraiser.imageUrl && (
                              <img
                                src={fundraiser.imageUrl}
                                alt={fundraiser.title}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-semibold text-gray-900 truncate">{fundraiser.title}</h3>
                              <Badge 
                                variant={fundraiser.isActive ? "default" : "outline"}
                                className="ml-2 flex-shrink-0"
                              >
                                {fundraiser.isActive ? "Active" : "Inactive"}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{fundraiser.description}</p>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Raised: {formatCurrency(fundraiser.raised)}</span>
                                <span>Goal: {formatCurrency(fundraiser.goal)}</span>
                              </div>
                              <Progress value={(fundraiser.raised / fundraiser.goal) * 100} />
                              
                              <div className="flex justify-between items-center pt-2">
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                  <span className="flex items-center gap-1">
                                    <Users className="w-4 h-4" />
                                    {fundraiser.contributionsCount} donors
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Star className="w-4 h-4" />
                                    {fundraiser.trustScore}%
                                  </span>
                                </div>
                                <Button variant="outline" size="sm" className="gap-1">
                                  View Details
                                  <ChevronRight className="w-3 h-3" />
                                </Button>
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
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns yet</h3>
                    <p className="text-gray-600 mb-4">Start your first fundraising campaign to make a difference.</p>
                    <Button className="gap-2">
                      <Plus className="w-4 h-4" />
                      Create Your First Campaign
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="donations" className="space-y-4">
              <h2 className="text-xl font-semibold">My Donation History</h2>

              {contributions.length > 0 ? (
                <div className="space-y-4">
                  {contributions.map((contribution) => (
                    <Card key={contribution.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                            {contribution.fundraiser.imageUrl && (
                              <img
                                src={contribution.fundraiser.imageUrl}
                                alt={contribution.fundraiser.title}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium text-gray-900">{contribution.fundraiser.title}</h3>
                              <div className="text-right">
                                <p className="font-semibold text-green-600">{formatCurrency(contribution.amount)}</p>
                                <p className="text-xs text-gray-500">{formatDate(contribution.createdAt)}</p>
                              </div>
                            </div>
                            {contribution.message && (
                              <p className="text-sm text-gray-600 italic">"{contribution.message}"</p>
                            )}
                            <div className="flex items-center gap-2 mt-2">
                              {contribution.isAnonymous && (
                                <Badge variant="outline" className="text-xs">Anonymous</Badge>
                              )}
                              <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {formatDate(contribution.createdAt)}
                              </span>
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
                    <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No donations yet</h3>
                    <p className="text-gray-600 mb-4">Start supporting causes you care about.</p>
                    <Button className="gap-2">
                      <Heart className="w-4 h-4" />
                      Browse Campaigns
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              <h2 className="text-xl font-semibold">Recent Activity</h2>
              <Card>
                <CardContent className="p-12 text-center">
                  <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Activity Feed Coming Soon</h3>
                  <p className="text-gray-600">We're working on bringing you a detailed activity feed.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <h2 className="text-xl font-semibold">Account Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Security
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Two-Factor Authentication
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Login Sessions
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      Notification Settings
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Privacy Controls
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Data Export
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}