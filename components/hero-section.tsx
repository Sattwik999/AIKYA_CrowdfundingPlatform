import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import Link from "next/link"
import { Heart, Shield, Users, Target, ArrowRight, Star, CheckCircle } from "lucide-react"

export function HeroSection() {
  const trustIndicators = [
    { icon: Shield, text: "100% Secure" },
    { icon: CheckCircle, text: "Verified Campaigns" },
    { icon: Star, text: "4.8/5 Rating" }
  ]

  return (
    <section className="relative w-full py-6 md:py-12 lg:py-16 bg-gradient-to-br from-primary/10 via-blue-100/50 to-purple-50/70 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
      <div className="absolute top-10 right-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl hidden md:block"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl hidden md:block"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/5 to-blue-500/5 rounded-full blur-3xl -z-10 hidden md:block"></div>
      
      <div className="container px-3 md:px-6 grid lg:grid-cols-2 gap-6 md:gap-8 items-center">
        <div className="space-y-4 md:space-y-6 text-center lg:text-left">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">
            <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
            Built for India's Future
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 font-poppins text-balance leading-tight">
            Empowering India: 
            <span className="text-primary block mt-1 md:mt-2">
              Fund Hope, Save Lives
            </span>
          </h1>
          
          <p className="text-base md:text-lg lg:text-xl text-gray-600 text-balance leading-relaxed px-2 md:px-0">
            <strong>AIKYA</strong> - where <em>AI for Impact</em> meets <em>Kindness</em> through <em>Youth & Action</em>. We're building India's next-generation crowdfunding platform with <strong>0% Platform fees*</strong> ensuring every rupee counts towards changing lives.
          </p>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 md:gap-4 py-3 md:py-4">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-gray-600">
                <indicator.icon className="w-3 h-3 md:w-4 md:h-4 text-primary flex-shrink-0" />
                <span>{indicator.text}</span>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start px-4 md:px-0">
            <Button size="default" className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg group w-full sm:w-auto" asChild>
              <Link href="/start-fundraiser">
                <span className="hidden md:inline">Start a Fundraiser for FREE</span>
                <span className="md:hidden">Start Fundraiser</span>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="default"
              className="px-6 md:px-8 py-3 md:py-4 text-base md:text-lg border-primary text-primary hover:bg-primary/10 bg-transparent w-full sm:w-auto"
              asChild
            >
              <Link href="/browse-fundraisers">
                <Heart className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Donate Now
              </Link>
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-6 pt-6 md:pt-8">
            <div className="text-center lg:text-left">
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">0%</p>
              <p className="text-gray-600 text-xs md:text-sm">PLATFORM FEE*</p>
            </div>
            <div className="text-center lg:text-left">
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">24/7</p>
              <p className="text-gray-600 text-xs md:text-sm">Support</p>
            </div>
            <div className="text-center lg:text-left">
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">∞</p>
              <p className="text-gray-600 text-xs md:text-sm">Possibilities</p>
            </div>
          </div>
          
          <p className="text-xs text-gray-500 px-2 md:px-0">
            * 0% platform fee on donations. Payment gateway charges may apply.
          </p>
        </div>
        {/* AIKYA Logo with Overlays */}
        <div className="relative mt-6 lg:mt-0">
          <div className="relative flex items-center justify-center">
            <div className="text-center">
              <Image
                src="/aikya-logo.png"
                alt="AIKYA Logo"
                width={600}
                height={600}
                className="mx-auto mb-4 drop-shadow-lg"
                style={{
                  mixBlendMode: 'multiply',
                  filter: 'brightness(1.1) contrast(1.1)'
                }}
              />
              <div className="text-center space-y-1 md:space-y-2">
                <p className="text-xs md:text-sm lg:text-base text-gray-600 font-medium tracking-wide">
                  AI for Impact • Kindness • Youth & Action
                </p>
                <div className="mt-3 md:mt-4 flex items-center justify-center gap-1.5 md:gap-2 text-primary">
                  <Heart className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span className="text-xs md:text-sm font-semibold">एकत्वम् शक्ति:</span>
                  <span className="text-xs md:text-sm">Together We Rise</span>
                </div>
              </div>
            </div>
            
            {/* Floating Success Cards */}
            {/* <Card className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm shadow-lg border-0">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">₹2.5L Raised</p>
                    <p className="text-xs text-gray-600">for Arjun's surgery</p>
                  </div>
                </div>
              </CardContent>
            </Card> */}
            
            {/* <Card className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm shadow-lg border-0">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Target className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">1,247 Donors</p>
                    <p className="text-xs text-gray-600">joined this cause</p>
                  </div>
                </div>
              </CardContent>
            </Card> */}
          </div>
          
          {/* Feature highlights around the logo */}
          {/* <div className="absolute -top-4 -left-4 bg-primary text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
            🔥 Most Trusted
          </div>
          <div className="absolute -bottom-4 -right-4 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
            ✅ 100% Secure
          </div> */}
        </div>
      </div>
    </section>
  )
}
