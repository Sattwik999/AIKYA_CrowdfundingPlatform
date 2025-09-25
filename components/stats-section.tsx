"use client"

import { Card, CardContent } from "./ui/card"
import { TrendingUp, Users, Heart, Target, IndianRupee, Globe } from "lucide-react"

export function StatsSection() {
  const stats = [
    {
      icon: IndianRupee,
      value: "₹500+ Crores",
      label: "Funds Raised",
      description: "Total amount raised for various causes",
      color: "text-green-600 bg-green-50"
    },
    {
      icon: Users,
      value: "72 Lakh+",
      label: "Contributors",
      description: "People who have donated to causes",
      color: "text-blue-600 bg-blue-50"
    },
    {
      icon: Target,
      value: "3.2 Lakh+",
      label: "Fundraisers",
      description: "Successful fundraising campaigns",
      color: "text-purple-600 bg-purple-50"
    },
    {
      icon: Heart,
      value: "10 Lakh+",
      label: "Lives Impacted",
      description: "People whose lives were changed",
      color: "text-red-600 bg-red-50"
    },
    {
      icon: Globe,
      value: "650+ Cities",
      label: "Pan India Reach",
      description: "Cities where we've made an impact",
      color: "text-orange-600 bg-orange-50"
    },
    {
      icon: TrendingUp,
      value: "95%",
      label: "Success Rate",
      description: "Campaigns that reached their goals",
      color: "text-emerald-600 bg-emerald-50"
    }
  ]

  return (
    <section className="py-16 relative overflow-hidden bg-gradient-to-b from-cyan-50 via-teal-50 to-blue-50">
      {/* Ocean Stats Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/30 via-teal-100/20 to-blue-100/30"></div>
      <div className="absolute inset-0">
        {/* Achievement wave patterns */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-cyan-200/20 to-transparent animate-wave opacity-60"></div>
        <div className="absolute bottom-0 right-0 w-full h-24 bg-gradient-to-t from-teal-200/20 to-transparent animate-wave" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Floating achievement elements */}
        <div className="absolute top-16 left-[8%] w-14 h-14 bg-gradient-to-br from-cyan-200/40 to-teal-200/40 rounded-full animate-float opacity-50"></div>
        <div className="absolute top-24 right-[12%] w-10 h-10 bg-gradient-to-br from-teal-200/40 to-blue-200/40 rounded-full animate-float opacity-60" style={{ animationDelay: '2.5s' }}></div>
        <div className="absolute bottom-20 left-[15%] w-16 h-16 bg-gradient-to-br from-blue-200/30 to-cyan-200/30 rounded-full animate-float opacity-40" style={{ animationDelay: '3.5s' }}></div>
        <div className="absolute bottom-32 right-[20%] w-12 h-12 bg-gradient-to-br from-cyan-300/30 to-teal-300/30 rounded-full animate-float opacity-50" style={{ animationDelay: '1s' }}></div>
        
        {/* Stats ripple effects */}
        <div className="absolute top-1/3 left-1/5 w-28 h-28 border-2 border-cyan-200/30 rounded-full animate-ripple"></div>
        <div className="absolute top-1/2 right-1/4 w-20 h-20 border-2 border-teal-200/30 rounded-full animate-ripple" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-24 h-24 border-2 border-blue-200/30 rounded-full animate-ripple" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Making a Real Difference
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See the incredible impact our community has made together across India
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${stat.color} mb-4`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </h3>
                <p className="text-lg font-semibold text-gray-800 mb-2">
                  {stat.label}
                </p>
                <p className="text-sm text-gray-600">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500">
            * Statistics updated as of {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>
    </section>
  )
}