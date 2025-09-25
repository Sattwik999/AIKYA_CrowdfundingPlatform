"use client"

import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Quote, Star, Heart, Target, CheckCircle } from "lucide-react"

export function SuccessStories() {
  const successStories = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai, Maharashtra",
      avatar: "/placeholder-user.jpg",
      story: "Thanks to AIKYA, my daughter received life-saving heart surgery. The platform made it so easy to share our story and connect with generous donors across India.",
      campaignTitle: "Help Save Little Ananya's Heart",
      amountRaised: 450000,
      goal: 500000,
      category: "Medical",
      outcome: "Surgery Successful",
      testimonialDate: "August 2024"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      location: "Bangalore, Karnataka",
      avatar: "/placeholder-user.jpg",
      story: "My startup dream became reality through AIKYA's platform. The community support was incredible, and I was able to fund my education technology project.",
      campaignTitle: "Rural Education Tech Initiative",
      amountRaised: 800000,
      goal: 750000,
      category: "Education",
      outcome: "Project Launched",
      testimonialDate: "September 2024"
    },
    {
      id: 3,
      name: "Dr. Meera Patel",
      location: "Ahmedabad, Gujarat",
      avatar: "/placeholder-user.jpg",
      story: "Our medical camp for tribal areas was fully funded through AIKYA. We were able to provide free healthcare to over 2,000 people in remote villages.",
      campaignTitle: "Free Medical Camp for Tribal Areas",
      amountRaised: 300000,
      goal: 250000,
      category: "Healthcare",
      outcome: "2000+ Beneficiaries",
      testimonialDate: "July 2024"
    }
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <CheckCircle className="w-4 h-4" />
            Success Stories
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Dreams Turned into Reality
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real stories from people whose lives were transformed through the power of community support
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {successStories.map((story, index) => (
            <Card key={story.id} className="hover:shadow-xl transition-all duration-300 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <div className="relative mb-6">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-gray-300" />
                  <p className="text-gray-700 italic pl-6 leading-relaxed">
                    "{story.story}"
                  </p>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={story.avatar} alt={story.name} />
                      <AvatarFallback>
                        {story.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-900">{story.name}</p>
                      <p className="text-sm text-gray-600">{story.location}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <p className="font-medium text-gray-900 text-sm">
                      {story.campaignTitle}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <Badge variant="outline" className="text-xs">
                        {story.category}
                      </Badge>
                      <span>{story.testimonialDate}</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">Amount Raised:</span>
                      <span className="font-semibold text-green-600">
                        {formatCurrency(story.amountRaised)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Outcome:</span>
                      <span className="font-semibold text-blue-600">
                        {story.outcome}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" variant="outline">
            Read More Success Stories
          </Button>
        </div>
      </div>
    </section>
  )
}