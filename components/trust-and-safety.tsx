"use client"

import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Shield, Lock, Eye, CheckCircle, Award, Users, FileText, Phone } from "lucide-react"

export function TrustAndSafety() {
  const trustFeatures = [
    {
      icon: Shield,
      title: "Verified Campaigns",
      description: "Every campaign is manually reviewed and verified by our expert team",
      color: "text-blue-600 bg-blue-50"
    },
    {
      icon: Lock,
      title: "Secure Payments",
      description: "Bank-grade encryption and secure payment gateways protect your donations",
      color: "text-green-600 bg-green-50"
    },
    {
      icon: Eye,
      title: "Full Transparency",
      description: "Track exactly how your donations are being used with regular updates",
      color: "text-purple-600 bg-purple-50"
    },
    {
      icon: CheckCircle,
      title: "Identity Verification",
      description: "All fundraisers undergo comprehensive identity and document verification",
      color: "text-emerald-600 bg-emerald-50"
    },
    {
      icon: Award,
      title: "Trust Score System",
      description: "Our proprietary algorithm assigns trust scores based on multiple factors",
      color: "text-orange-600 bg-orange-50"
    },
    {
      icon: Users,
      title: "Community Oversight",
      description: "Community reporting and feedback help maintain platform integrity",
      color: "text-red-600 bg-red-50"
    }
  ]

  const certifications = [
    { name: "ISO 27001", description: "Information Security" },
    { name: "PCI DSS", description: "Payment Security" },
    { name: "SSL Certified", description: "Data Encryption" },
    { name: "GDPR Compliant", description: "Data Privacy" }
  ]

  return (
    <section className="relative py-10 md:py-12 overflow-hidden">
      {/* Deep Ocean Trust Theme Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-cyan-50/50 to-teal-50/60"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-100/30 via-transparent to-blue-100/30"></div>
      
      {/* Security shield patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.04),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(6,182,212,0.04),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(20,184,166,0.04),transparent_50%)]"></div>
      
      {/* Protective barrier effects */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-300/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent"></div>
      
      {/* Trust floating elements */}
      <div className="absolute -top-10 -right-10 w-56 h-56 bg-gradient-to-br from-blue-200/6 via-cyan-200/4 to-slate-200/6 rounded-full blur-3xl animate-[float_15s_ease-in-out_infinite]"></div>
      <div className="absolute top-1/2 -left-8 w-40 h-40 bg-gradient-to-br from-teal-200/5 via-blue-200/3 to-cyan-200/5 rounded-full blur-3xl animate-[float_18s_ease-in-out_infinite_reverse]"></div>
      <div className="absolute bottom-1/4 right-1/3 w-32 h-32 bg-gradient-to-br from-cyan-200/4 via-teal-200/3 to-blue-200/4 rounded-full blur-3xl animate-[float_12s_ease-in-out_infinite]" style={{animationDelay: '5s'}}></div>
      
      {/* Security grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.015)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_50%_60%_at_50%_50%,black,transparent)]"></div>
      
      <div className="relative container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-3">
            <Shield className="w-4 h-4" />
            Trust & Safety
          </div>
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
            Your Security is Our Priority
          </h2>
          <p className="text-base text-gray-600 max-w-xl mx-auto">
            Multiple layers of security ensure your donations reach the right hands
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {trustFeatures.map((feature, index) => {
            const colors = [
              { bg: "bg-gradient-to-br from-blue-50 to-blue-100", icon: "text-blue-600", border: "border-blue-200" },
              { bg: "bg-gradient-to-br from-green-50 to-green-100", icon: "text-green-600", border: "border-green-200" },
              { bg: "bg-gradient-to-br from-purple-50 to-purple-100", icon: "text-purple-600", border: "border-purple-200" },
              { bg: "bg-gradient-to-br from-red-50 to-red-100", icon: "text-red-600", border: "border-red-200" },
              { bg: "bg-gradient-to-br from-orange-50 to-orange-100", icon: "text-orange-600", border: "border-orange-200" },
              { bg: "bg-gradient-to-br from-teal-50 to-teal-100", icon: "text-teal-600", border: "border-teal-200" }
            ];
            const colorScheme = colors[index % colors.length];
            
            return (
              <Card key={index} className={`hover:shadow-md transition-all duration-300 border-2 ${colorScheme.border} ${colorScheme.bg} hover:scale-105`}>
                <CardContent className="p-4 text-center">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${colorScheme.icon} mb-3`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-tight">
                    {feature.description.split(' ').slice(0, 8).join(' ')}...
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Verification Process with Flow */}
        <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 mb-8 relative overflow-hidden border border-gray-200">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100/30 to-slate-100/30"></div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-gray-900 text-center mb-6">
              Our 5-Step Verification Process
            </h3>
            <div className="flex flex-col md:flex-row items-center justify-between relative">
              {/* Flow line - Black and White */}
              <div className="hidden md:block absolute top-6 left-0 right-0 h-1 bg-gradient-to-r from-gray-800 via-gray-600 via-gray-500 via-gray-400 to-gray-300 rounded-full opacity-60"></div>
              
              {[
                { step: "1", title: "Identity Check", icon: FileText, bgClass: "bg-black" },
                { step: "2", title: "Document Verification", icon: CheckCircle, bgClass: "bg-gray-800" },
                { step: "3", title: "Story Validation", icon: Eye, bgClass: "bg-gray-600" },
                { step: "4", title: "Contact Verification", icon: Phone, bgClass: "bg-gray-400" },
                { step: "5", title: "Final Approval", icon: Award, bgClass: "bg-gray-300" }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center relative z-10 mb-4 md:mb-0">
                  <div className={`w-12 h-12 ${item.bgClass} rounded-xl flex items-center justify-center mb-2 shadow-lg hover:scale-110 transition-transform duration-300 border border-gray-300`}>
                    <item.icon className={`w-6 h-6 ${index > 3 ? 'text-black' : 'text-white'}`} />
                  </div>
                  <div className={`${item.bgClass} ${index > 3 ? 'text-black' : 'text-white'} rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mb-2 shadow-md border border-gray-300`}>
                    {item.step}
                  </div>
                  <p className="font-medium text-gray-900 text-sm">{item.title}</p>
                  
                  {/* Mobile flow arrows */}
                  {index < 4 && (
                    <div className="md:hidden mt-2 mb-2">
                      <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-gray-500"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Compact Trust Badge */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <div className="text-left">
              <span className="text-base font-bold text-green-800 block">
                100% Secure Platform
              </span>
              <span className="text-sm text-green-700">
                ₹500+ Crores safely processed
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}