import Link from "next/link"
import Image from "next/image"
import { LayoutDashboardIcon, WalletIcon, UsersIcon, RocketIcon } from "lucide-react"

export function ManageFundraisersOnTheGo() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-cyan-50 via-blue-50 to-teal-50">
      {/* Ocean Mobile Management Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/30 via-blue-100/20 to-teal-100/30"></div>
      <div className="absolute inset-0">
        {/* Mobile connectivity wave patterns */}
        <div className="absolute top-0 left-0 w-full h-30 bg-gradient-to-b from-cyan-200/20 to-transparent animate-wave opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-full h-30 bg-gradient-to-t from-teal-200/20 to-transparent animate-wave" style={{ animationDelay: '2.2s' }}></div>
        
        {/* Floating mobile elements */}
        <div className="absolute top-18 left-[7%] w-14 h-14 bg-gradient-to-br from-cyan-200/40 to-blue-200/40 rounded-full animate-float opacity-60"></div>
        <div className="absolute top-32 right-[9%] w-12 h-12 bg-gradient-to-br from-blue-200/40 to-teal-200/40 rounded-full animate-float opacity-50" style={{ animationDelay: '3.2s' }}></div>
        <div className="absolute bottom-22 left-[11%] w-16 h-16 bg-gradient-to-br from-teal-200/30 to-cyan-200/30 rounded-full animate-float opacity-40" style={{ animationDelay: '4.2s' }}></div>
        <div className="absolute bottom-38 right-[16%] w-10 h-10 bg-gradient-to-br from-cyan-300/30 to-blue-300/30 rounded-full animate-float opacity-60" style={{ animationDelay: '1.8s' }}></div>
        
        {/* Mobile management ripple effects */}
        <div className="absolute top-1/4 left-1/5 w-26 h-26 border-2 border-cyan-200/30 rounded-full animate-ripple"></div>
        <div className="absolute top-1/2 right-1/4 w-18 h-18 border-2 border-blue-200/30 rounded-full animate-ripple" style={{ animationDelay: '2.8s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-22 h-22 border-2 border-teal-200/30 rounded-full animate-ripple" style={{ animationDelay: '1.2s' }}></div>
      </div>
      
      <div className="container px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center relative">
        <div className="relative h-[400px] md:h-[500px] flex items-center justify-center">
          <Image
            src="/placeholder.svg?key=p7q7r"
            alt="Indian Mobile Dashboard"
            width={300}
            height={500}
            className="rounded-lg object-cover shadow-lg"
          />
        </div>
        <div className="space-y-6 text-center lg:text-left">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-poppins">
            Manage your fundraisers on the go
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left gap-2">
              <LayoutDashboardIcon className="w-10 h-10 text-primary" />
              <h3 className="text-xl font-semibold text-gray-900">Access a personalized dashboard</h3>
              <p className="text-gray-600">Track progress, donations, and donor insights.</p>
            </div>
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left gap-2">
              <WalletIcon className="w-10 h-10 text-primary" />
              <h3 className="text-xl font-semibold text-gray-900">Withdraw your funds faster</h3>
              <p className="text-gray-600">Quick and secure fund transfers to your Indian bank account.</p>
            </div>
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left gap-2">
              <UsersIcon className="w-10 h-10 text-primary" />
              <h3 className="text-xl font-semibold text-gray-900">Keep track of all your contributions received</h3>
              <p className="text-gray-600">Monitor every donation and supporter easily.</p>
            </div>
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left gap-2">
              <RocketIcon className="w-10 h-10 text-primary" />
              <h3 className="text-xl font-semibold text-gray-900">Start fundraisers within seconds</h3>
              <p className="text-gray-600">Launch new campaigns quickly and efficiently.</p>
            </div>
          </div>
          <div className="flex justify-center lg:justify-start gap-4 pt-6">
            <Link href="#">
              <Image
                src="/placeholder.svg?key=q8s8t"
                alt="Google Play"
                width={135}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <Link href="#">
              <Image src="/placeholder.svg?key=r9u9v" alt="App Store" width={120} height={40} className="h-10 w-auto" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
