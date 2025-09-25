import { HeroSection } from "@/components/hero-section"
import { TrendingFundraisers } from "@/components/trending-fundraisers"
import { HowItWorks } from "@/components/how-it-works"
import { ManageFundraisersOnTheGo } from "@/components/manage-fundraisers-on-the-go"
import { CausesSection } from "@/components/causes-section"
import { WhyAikya } from "@/components/why-aikya"
import { Footer } from "@/components/footer"
// import { StatsSection } from "@/components/stats-section"
// import { SuccessStories } from "@/components/success-stories"
import { EmergencyFunds } from "@/components/emergency-funds"
import { TrustAndSafety } from "@/components/trust-and-safety"
// import { CommunityImpact } from "@/components/community-impact"

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <HeroSection />
        
        {/* Modern Ocean-Inspired Background System */}
        <div className="relative overflow-hidden">
          {/* Ocean wave gradient foundation */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Primary ocean gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/60 via-blue-50/40 to-teal-50/60"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/30 via-transparent to-cyan-100/30"></div>
            
            {/* Flowing wave patterns */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/15 to-cyan-100/25"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(56,189,248,0.06),transparent_70%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(20,184,166,0.06),transparent_70%)]"></div>
            
            {/* Modern hexagonal grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.03)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(6,182,212,0.04)_2px,transparent_2px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_100%,black,transparent)]"></div>
            
            {/* Flowing ocean orbs */}
            <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-gradient-to-br from-blue-300/12 via-cyan-300/8 to-teal-300/10 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite]"></div>
            <div className="absolute top-1/4 -left-24 w-[320px] h-[320px] bg-gradient-to-br from-teal-300/10 via-cyan-300/6 to-blue-300/8 rounded-full blur-3xl animate-[float_12s_ease-in-out_infinite_reverse]"></div>
            <div className="absolute bottom-1/3 right-1/5 w-[280px] h-[280px] bg-gradient-to-br from-cyan-300/8 via-blue-300/5 to-teal-300/7 rounded-full blur-3xl animate-[float_10s_ease-in-out_infinite]" style={{animationDelay: '3s'}}></div>
            <div className="absolute top-2/3 left-1/4 w-[200px] h-[200px] bg-gradient-to-br from-blue-200/6 via-cyan-200/4 to-teal-200/5 rounded-full blur-3xl animate-[float_15s_ease-in-out_infinite]" style={{animationDelay: '6s'}}></div>
            
            {/* Ocean current lines */}
            <div className="absolute top-16 left-12 w-3 h-40 bg-gradient-to-b from-cyan-400/20 via-blue-400/12 to-transparent rounded-full transform rotate-12"></div>
            <div className="absolute top-1/3 right-16 w-2 h-32 bg-gradient-to-b from-teal-400/18 via-cyan-400/10 to-transparent rounded-full transform -rotate-12"></div>
            <div className="absolute bottom-40 left-1/3 w-4 h-24 bg-gradient-to-b from-blue-400/15 via-teal-400/8 to-transparent rounded-full transform rotate-6"></div>
            
            {/* Floating water droplets */}
            <div className="absolute top-1/5 left-1/2 w-2 h-2 bg-cyan-300/50 rounded-full animate-[bubble_6s_ease-in-out_infinite]" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-2/5 right-1/4 w-1.5 h-1.5 bg-blue-300/50 rounded-full animate-[bubble_8s_ease-in-out_infinite]" style={{animationDelay: '3s'}}></div>
            <div className="absolute bottom-2/5 left-1/5 w-1 h-1 bg-teal-300/50 rounded-full animate-[bubble_7s_ease-in-out_infinite]" style={{animationDelay: '5s'}}></div>
            
            {/* Ocean depth texture */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/15 via-transparent to-teal-50/15 opacity-40"></div>
            
            {/* Ripple effects */}
            <div className="absolute top-1/4 left-1/3 w-32 h-32 border border-cyan-200/30 rounded-full animate-[ripple_4s_ease-out_infinite]"></div>
            <div className="absolute bottom-1/3 right-1/3 w-24 h-24 border border-blue-200/30 rounded-full animate-[ripple_6s_ease-out_infinite]" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-1/2 left-1/6 w-16 h-16 border border-teal-200/30 rounded-full animate-[ripple_5s_ease-out_infinite]" style={{animationDelay: '4s'}}></div>
          </div>
          
          {/* Content sections with enhanced visual flow */}
          <div className="relative z-10">
            {/* Section 1: Emergency Funds */}
            <div className="relative">
              {/* <StatsSection /> */}
              <EmergencyFunds />
              
              {/* Visual separator */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
            </div>

            {/* Section 2: Causes with ocean current background */}
            <div className="relative">
              {/* Ocean current section background */}
              <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 w-[400px] h-[400px] bg-gradient-to-br from-cyan-300/10 via-blue-300/6 to-teal-300/8 rounded-full blur-3xl animate-[float_10s_ease-in-out_infinite]"></div>
              <div className="absolute top-16 -right-16 w-[280px] h-[280px] bg-gradient-to-br from-teal-300/8 via-cyan-300/5 to-blue-300/7 rounded-full blur-3xl animate-[float_14s_ease-in-out_infinite_reverse]"></div>
              
              <CausesSection />
              
              {/* Ocean wave visual separator */}
              <div className="flex items-center justify-center py-12 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-50/60 to-transparent"></div>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-blue-200/30"></div>
                <div className="mx-6 relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-white via-cyan-50/50 to-white rounded-full flex items-center justify-center shadow-lg border border-cyan-200/40 animate-[float_6s_ease-in-out_infinite]">
                    <div className="w-4 h-4 bg-gradient-to-br from-cyan-400/70 to-teal-500/70 rounded-full animate-pulse"></div>
                  </div>
                  <div className="absolute inset-0 w-14 h-14 border border-cyan-200/30 rounded-full animate-[ripple_4s_ease-out_infinite]"></div>
                </div>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent via-cyan-300/50 to-blue-200/30"></div>
              </div>
            </div>

            {/* Section 3: Trust & Safety with deep ocean accent */}
            <div className="relative">
              {/* Deep ocean section background */}
              <div className="absolute -top-20 right-1/4 w-[320px] h-[320px] bg-gradient-to-br from-blue-300/8 via-cyan-300/5 to-teal-300/7 rounded-full blur-3xl animate-[float_12s_ease-in-out_infinite]"></div>
              <div className="absolute top-1/3 -left-20 w-[240px] h-[240px] bg-gradient-to-br from-teal-300/6 via-blue-300/4 to-cyan-300/5 rounded-full blur-3xl animate-[float_16s_ease-in-out_infinite_reverse]" style={{animationDelay: '3s'}}></div>
              
              <TrustAndSafety />
              
              {/* Ocean depth bottom accent */}
              <div className="absolute bottom-0 left-0 right-0">
                <div className="h-32 bg-gradient-to-t from-cyan-100/30 via-blue-50/15 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-300/30 to-transparent"></div>
                
                {/* Subtle ocean floor texture */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.03)_0%,transparent_70%)]"></div>
              </div>
            </div>

            {/* Optional sections for future use */}
            {/* <CommunityImpact /> */}
            {/* <ManageFundraisersOnTheGo /> */}
            {/* <WhyAikya /> */}
          </div>
        </div>

        {/* Ocean to shore footer transition */}
        <div className="relative h-24 bg-gradient-to-b from-transparent via-cyan-50/30 to-blue-100/40">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.04)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:linear-gradient(0deg,transparent,black_60%,transparent)]"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent"></div>
          
          {/* Ocean waves at footer */}
          <div className="absolute bottom-2 left-1/4 w-8 h-1 bg-gradient-to-r from-cyan-200/40 to-blue-200/40 rounded-full animate-[wave_3s_ease-in-out_infinite]"></div>
          <div className="absolute bottom-4 right-1/3 w-6 h-1 bg-gradient-to-r from-teal-200/40 to-cyan-200/40 rounded-full animate-[wave_4s_ease-in-out_infinite]" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-3 left-1/2 w-4 h-1 bg-gradient-to-r from-blue-200/40 to-teal-200/40 rounded-full animate-[wave_5s_ease-in-out_infinite]" style={{animationDelay: '2s'}}></div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
