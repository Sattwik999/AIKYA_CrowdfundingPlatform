"use client"

import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Progress } from "./ui/progress"
import { MapPin, Users, Heart, Target, Zap, Award, Globe, TrendingUp } from "lucide-react"
import Link from "next/link"

export function CommunityImpact() {
  const impactStats = [
    {
      value: "28 States",
      label: "Coverage Across India",
      icon: Globe,
      color: "text-blue-600"
    },
    {
      value: "₹50+ Crores",
      label: "This Year Alone",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      value: "5 Lakh+",
      label: "Families Helped",
      icon: Heart,
      color: "text-red-600"
    },
    {
      value: "15,000+",
      label: "Active Fundraisers",
      icon: Users,
      color: "text-purple-600"
    }
  ]

  const impactCategories = [
    {
      category: "Medical Emergency",
      percentage: 45,
      amount: "₹225 Crores",
      beneficiaries: "2.3 Lakh+",
      color: "bg-red-500",
      lightColor: "bg-red-50 text-red-700",
      description: "Life-saving treatments and surgeries"
    },
    {
      category: "Education Support",
      percentage: 25,
      amount: "₹125 Crores",
      beneficiaries: "1.5 Lakh+",
      color: "bg-blue-500",
      lightColor: "bg-blue-50 text-blue-700",
      description: "School fees, supplies, and scholarships"
    },
    {
      category: "Disaster Relief",
      percentage: 15,
      amount: "₹75 Crores",
      beneficiaries: "80,000+",
      color: "bg-orange-500",
      lightColor: "bg-orange-50 text-orange-700",
      description: "Emergency aid and rehabilitation"
    },
    {
      category: "Community Development",
      percentage: 10,
      amount: "₹50 Crores",
      beneficiaries: "50,000+",
      color: "bg-green-500",
      lightColor: "bg-green-50 text-green-700",
      description: "Infrastructure and social programs"
    },
    {
      category: "Animal Welfare",
      percentage: 5,
      amount: "₹25 Crores",
      beneficiaries: "25,000+",
      color: "bg-purple-500",
      lightColor: "bg-purple-50 text-purple-700",
      description: "Animal rescue and care"
    }
  ]

  const recentMilestones = [
    {
      title: "Reached ₹500 Crore Milestone",
      date: "September 2024",
      description: "Total funds raised crossed the historic ₹500 crore mark"
    },
    {
      title: "1 Million+ Donors Joined",
      date: "August 2024",
      description: "Our community of generous donors reached 1 million members"
    },
    {
      title: "All-India Presence Achieved",
      date: "July 2024",
      description: "Successfully operational in all 28 states and 8 union territories"
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Award className="w-4 h-4" />
            Community Impact
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Transforming Lives Across India
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how our community's collective efforts are creating positive change in every corner of the country
          </p>
        </div>
        
        {/* Impact Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {impactStats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <stat.icon className={`w-10 h-10 ${stat.color} mx-auto mb-3`} />
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm text-gray-600">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Impact Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Impact by Category
            </h3>
            <div className="space-y-6">
              {impactCategories.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">
                      {category.category}
                    </span>
                    <Badge className={category.lightColor}>
                      {category.percentage}%
                    </Badge>
                  </div>
                  <Progress 
                    value={category.percentage} 
                    className="h-3"
                    style={{
                      backgroundColor: '#f3f4f6'
                    }}
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{category.amount} raised</span>
                    <span>{category.beneficiaries} beneficiaries</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {category.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Recent Milestones
            </h3>
            <div className="space-y-6">
              {recentMilestones.map((milestone, index) => (
                <Card key={index} className="border-l-4 border-l-primary">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">
                        {milestone.title}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        {milestone.date}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {milestone.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-6 h-6 text-primary" />
                <h4 className="text-lg font-semibold text-gray-900">
                  Join the Movement
                </h4>
              </div>
              <p className="text-gray-600 mb-4">
                Be part of India's largest crowdfunding community and help create positive change.
              </p>
              <div className="flex gap-3">
                <Button size="sm" asChild>
                  <Link href="/browse-fundraisers">
                    <Heart className="w-4 h-4 mr-2" />
                    Start Donating
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/campaigns/new">
                    <Target className="w-4 h-4 mr-2" />
                    Start Fundraising
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Geographic Impact Map Placeholder */}
        <div className="text-center bg-gray-50 rounded-2xl p-8">
          <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Pan-India Presence
          </h3>
          <p className="text-gray-600 mb-4">
            From Kashmir to Kanyakumari, from Gujarat to Assam - we're creating impact everywhere
          </p>
          <Button variant="outline">
            <Globe className="w-4 h-4 mr-2" />
            Explore Impact Map
          </Button>
        </div>
      </div>
    </section>
  )
}