import {
  AwardIcon,
  UsersIcon,
  SettingsIcon,
  CreditCardIcon,
  HeadsetIcon,
  BarChartIcon,
  ShieldCheckIcon,
  GlobeIcon,
} from "lucide-react"

export function WhyAikya() {
  const features = [
    {
      icon: AwardIcon,
      title: "India's Best Fundraising Success Rate",
      description: "Our platform is optimized to help you reach your medical and educational goals.",
    },
    {
      icon: UsersIcon,
      title: "Supported By Lakhs of Contributors",
      description: "Join a vast community of generous donors across India.",
    },
    {
      icon: SettingsIcon,
      title: "Easy-To-Manage Tools To Boost Results",
      description: "Intuitive tools to help you run successful campaigns for your cause.",
    },
    {
      icon: CreditCardIcon,
      title: "Receive contributions via all popular Indian payment modes",
      description: "Accept donations through UPI, Net Banking, and major Indian cards.",
    },
    {
      icon: HeadsetIcon,
      title: "Dedicated Expert Support 24/7",
      description: "Our team is always here to assist you with your fundraising journey.",
    },
    {
      icon: BarChartIcon,
      title: "A Dedicated Smart-Dashboard",
      description: "Track your campaign's performance with ease and transparency.",
    },
    {
      icon: ShieldCheckIcon,
      title: "Withdraw Funds Without Hassle",
      description: "Secure and straightforward fund withdrawal directly to your Indian bank account.",
    },
    {
      icon: GlobeIcon,
      title: "Global Support for Indian Causes",
      description: "Reach a global audience and receive international donations for your cause in India.",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-blue-50 via-cyan-50 to-teal-50">
      {/* Ocean Why-AIKYA Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-cyan-100/20 to-teal-100/30"></div>
      <div className="absolute inset-0">
        {/* Feature showcase wave patterns */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-200/20 to-transparent animate-wave opacity-60"></div>
        <div className="absolute bottom-0 right-0 w-full h-32 bg-gradient-to-t from-cyan-200/20 to-transparent animate-wave" style={{ animationDelay: '1.8s' }}></div>
        
        {/* Floating feature elements */}
        <div className="absolute top-16 left-[6%] w-18 h-18 bg-gradient-to-br from-blue-200/40 to-cyan-200/40 rounded-full animate-float opacity-50"></div>
        <div className="absolute top-28 right-[10%] w-14 h-14 bg-gradient-to-br from-cyan-200/40 to-teal-200/40 rounded-full animate-float opacity-60" style={{ animationDelay: '2.5s' }}></div>
        <div className="absolute bottom-20 left-[12%] w-16 h-16 bg-gradient-to-br from-teal-200/30 to-blue-200/30 rounded-full animate-float opacity-40" style={{ animationDelay: '3.5s' }}></div>
        <div className="absolute bottom-36 right-[18%] w-12 h-12 bg-gradient-to-br from-blue-300/30 to-cyan-300/30 rounded-full animate-float opacity-50" style={{ animationDelay: '1.2s' }}></div>
        
        {/* Feature highlight ripple effects */}
        <div className="absolute top-1/3 left-1/4 w-30 h-30 border-2 border-blue-200/30 rounded-full animate-ripple"></div>
        <div className="absolute top-1/2 right-1/3 w-22 h-22 border-2 border-cyan-200/30 rounded-full animate-ripple" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-26 h-26 border-2 border-teal-200/30 rounded-full animate-ripple" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      <div className="container px-4 md:px-6 text-center relative">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-poppins">Why AIKYA?</h2>
        <p className="max-w-[900px] mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
          Here's why AIKYA is the best choice for your medical and educational crowdfunding needs in India.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-sm">
              <feature.icon className="w-12 h-12 text-primary" />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
