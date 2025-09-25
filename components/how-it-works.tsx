import Image from "next/image"
import { HandshakeIcon, Share2Icon, WalletIcon } from "lucide-react"

export function HowItWorks() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-teal-50 via-blue-50 to-cyan-50">
      {/* Ocean How-It-Works Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-100/30 via-blue-100/20 to-cyan-100/30"></div>
      <div className="absolute inset-0">
        {/* Process flow wave patterns */}
        <div className="absolute top-0 left-0 w-full h-28 bg-gradient-to-b from-teal-200/20 to-transparent animate-wave opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-full h-28 bg-gradient-to-t from-blue-200/20 to-transparent animate-wave" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating process elements */}
        <div className="absolute top-20 left-[5%] w-12 h-12 bg-gradient-to-br from-teal-200/40 to-blue-200/40 rounded-full animate-float opacity-60"></div>
        <div className="absolute top-36 right-[8%] w-16 h-16 bg-gradient-to-br from-blue-200/40 to-cyan-200/40 rounded-full animate-float opacity-50" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-24 left-[10%] w-14 h-14 bg-gradient-to-br from-cyan-200/30 to-teal-200/30 rounded-full animate-float opacity-40" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-40 right-[15%] w-10 h-10 bg-gradient-to-br from-teal-300/30 to-blue-300/30 rounded-full animate-float opacity-60" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Process step ripple effects */}
        <div className="absolute top-1/4 left-1/6 w-24 h-24 border-2 border-teal-200/30 rounded-full animate-ripple"></div>
        <div className="absolute top-1/2 right-1/5 w-20 h-20 border-2 border-blue-200/30 rounded-full animate-ripple" style={{ animationDelay: '2.5s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-26 h-26 border-2 border-cyan-200/30 rounded-full animate-ripple" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="container px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center relative">
        <div className="space-y-6 text-center lg:text-left">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-poppins">
            Start a Fundraiser in three simple steps
          </h2>
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary flex-shrink-0">
                <HandshakeIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Start your fundraiser</h3>
                <p className="text-gray-600">
                  It'll take only 2 minutes. Just tell us a few details about your medical or educational need.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary flex-shrink-0">
                <Share2Icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Share your fundraiser</h3>
                <p className="text-gray-600">
                  Share your campaign with friends and family across India to gather support.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary flex-shrink-0">
                <WalletIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Withdraw Funds</h3>
                <p className="text-gray-600">
                  The funds raised can be withdrawn without any hassle directly to your Indian bank account. It takes
                  only 5 minutes to withdraw funds on AIKYA.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative h-[400px] md:h-[500px] flex items-center justify-center">
          <Image
            src="/placeholder.svg?key=n6o6p"
            alt="Indian Mobile App"
            width={300}
            height={500}
            className="rounded-lg object-cover shadow-lg"
          />
        </div>
      </div>
    </section>
  )
}
