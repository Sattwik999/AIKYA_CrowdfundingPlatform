import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import Image from "next/image"
import { ArrowLeftIcon, ArrowRightIcon, Share2Icon, ClockIcon } from "lucide-react"

export function TrendingFundraisers() {
  const fundraisers = [
    {
      id: 1,
      image: "/placeholder.svg?key=j212k",
      title: "Urgent: Help My Father's Heart Surgery",
      raised: "₹3,78,500",
      goal: "₹4,54,540",
      supporters: 4006,
      daysLeft: 31,
      author: "Alok R.",
      type: "Individual",
    },
    {
      id: 2,
      image: "/placeholder.svg?key=k3l3m",
      title: "Educate Rural Children: Build a School in Bihar",
      raised: "₹3,30,610",
      goal: "₹3,40,900",
      supporters: 1421,
      daysLeft: 25,
      author: "Anurag S.",
      type: "Campaign",
    },
    {
      id: 3,
      image: "/placeholder.svg?key=l4m4n",
      title: "Support Free Medical Camps by Seva NGO",
      raised: "₹2,50,140",
      goal: "₹2,84,090",
      supporters: 1229,
      daysLeft: 31,
      author: "Seva NGO",
      type: "NGO",
    },
    {
      id: 4,
      image: "/placeholder.svg?key=m5n5o",
      title: "Life-Saving Treatment for My Mother",
      raised: "₹1,50,000",
      goal: "₹2,00,000",
      supporters: 800,
      daysLeft: 40,
      author: "Priya S.",
      type: "Individual",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-blue-50 via-cyan-50 to-teal-50">
      {/* Ocean Trending Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-cyan-100/20 to-teal-100/30"></div>
      <div className="absolute inset-0">
        {/* Trending wave patterns */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-200/20 to-transparent animate-wave opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-full h-32 bg-gradient-to-t from-cyan-200/20 to-transparent animate-wave" style={{ animationDelay: '1s' }}></div>
        
        {/* Floating trending elements */}
        <div className="absolute top-20 left-[10%] w-16 h-16 bg-gradient-to-br from-blue-200/40 to-cyan-200/40 rounded-full animate-float opacity-60"></div>
        <div className="absolute top-32 right-[15%] w-12 h-12 bg-gradient-to-br from-cyan-200/40 to-teal-200/40 rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-24 left-[20%] w-20 h-20 bg-gradient-to-br from-teal-200/30 to-blue-200/30 rounded-full animate-float opacity-40" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-40 right-[25%] w-14 h-14 bg-gradient-to-br from-blue-300/30 to-cyan-300/30 rounded-full animate-float opacity-60" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Trending ripple effects */}
        <div className="absolute top-1/2 left-1/4 w-32 h-32 border-2 border-blue-200/30 rounded-full animate-ripple"></div>
        <div className="absolute top-1/3 right-1/3 w-24 h-24 border-2 border-cyan-200/30 rounded-full animate-ripple" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 left-1/2 w-28 h-28 border-2 border-teal-200/30 rounded-full animate-ripple" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-poppins">Trending Fundraisers</h2>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            View the fundraisers that are most active right now.
          </p>
        </div>
        <div className="relative mt-10">
          <div className="flex overflow-x-auto scrollbar-hide gap-6 py-4">
            {fundraisers.map((fundraiser) => (
              <Card key={fundraiser.id} className="min-w-[300px] max-w-[350px] flex-shrink-0 shadow-lg">
                <CardHeader className="p-0">
                  <Image
                    src={fundraiser.image || "/placeholder.svg"}
                    alt={fundraiser.title}
                    width={350}
                    height={200}
                    className="rounded-t-lg object-cover w-full h-[200px]"
                  />
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <span className="inline-flex items-center rounded-md bg-accent/10 px-2 py-1 text-xs font-medium text-accent ring-1 ring-inset ring-accent/20">
                    {fundraiser.type}
                  </span>
                  <CardTitle className="text-lg font-semibold text-gray-800">{fundraiser.title}</CardTitle>
                  <p className="text-sm text-gray-600">by {fundraiser.author}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-primary h-2.5 rounded-full"
                      style={{
                        width: `${(Number.parseFloat(fundraiser.raised.replace("₹", "").replace(/,/g, "")) / Number.parseFloat(fundraiser.goal.replace("₹", "").replace(/,/g, ""))) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-700">
                    <span>
                      <span className="font-bold">{fundraiser.raised}</span> raised out of {fundraiser.goal}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 flex justify-between items-center border-t">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <ClockIcon className="w-4 h-4" />
                    <span>{fundraiser.daysLeft} Days Left</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-gray-500 hover:text-primary">
                      <Share2Icon className="w-5 h-5" />
                      <span className="sr-only">Share</span>
                    </Button>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Contribute</Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md hover:bg-gray-100"
          >
            <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
            <span className="sr-only">Previous</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md hover:bg-gray-100"
          >
            <ArrowRightIcon className="w-6 h-6 text-gray-700" />
            <span className="sr-only">Next</span>
          </Button>
        </div>
      </div>
    </section>
  )
}
