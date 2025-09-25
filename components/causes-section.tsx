import { HeartPulseIcon, BookTextIcon, HandHeartIcon, HomeIcon, TreePineIcon, UsersIcon } from "lucide-react"

export function CausesSection() {
  const causes = [
    { 
      icon: HeartPulseIcon, 
      name: "Medical Emergency", 
      description: "Life-saving treatments",
      color: "from-red-500 to-pink-600",
      bgColor: "bg-gradient-to-br from-red-50 to-pink-50",
      iconColor: "text-red-600",
      hoverColor: "group-hover:from-red-100 group-hover:to-pink-100"
    },
    { 
      icon: BookTextIcon, 
      name: "Education", 
      description: "Empowering through learning",
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
      iconColor: "text-blue-600",
      hoverColor: "group-hover:from-blue-100 group-hover:to-indigo-100"
    },
    { 
      icon: HandHeartIcon, 
      name: "Community Support", 
      description: "Building stronger communities",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
      iconColor: "text-green-600",
      hoverColor: "group-hover:from-green-100 group-hover:to-emerald-100"
    },
    { 
      icon: HomeIcon, 
      name: "Disaster Relief", 
      description: "Emergency aid & reconstruction",
      color: "from-orange-500 to-red-600",
      bgColor: "bg-gradient-to-br from-orange-50 to-red-50",
      iconColor: "text-orange-600",
      hoverColor: "group-hover:from-orange-100 group-hover:to-red-100"
    },
    { 
      icon: TreePineIcon, 
      name: "Environment", 
      description: "Protecting our planet",
      color: "from-teal-500 to-green-600",
      bgColor: "bg-gradient-to-br from-teal-50 to-green-50",
      iconColor: "text-teal-600",
      hoverColor: "group-hover:from-teal-100 group-hover:to-green-100"
    },
    { 
      icon: UsersIcon, 
      name: "Social Causes", 
      description: "Creating positive change",
      color: "from-purple-500 to-violet-600",
      bgColor: "bg-gradient-to-br from-purple-50 to-violet-50",
      iconColor: "text-purple-600",
      hoverColor: "group-hover:from-purple-100 group-hover:to-violet-100"
    },
  ]

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 relative overflow-hidden">
      {/* Ocean Causes Theme Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 via-cyan-50/40 to-blue-50/50"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/25 via-transparent to-teal-100/25"></div>
      
      {/* Cause category wave patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(20,184,166,0.06),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.06),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:120px_120px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]"></div>
      
      {/* Floating cause orbs */}
      <div className="absolute -top-16 left-16 w-80 h-80 bg-gradient-to-br from-teal-200/8 via-cyan-200/6 to-blue-200/8 rounded-full blur-3xl animate-[float_12s_ease-in-out_infinite]"></div>
      <div className="absolute top-1/2 -right-12 w-64 h-64 bg-gradient-to-br from-blue-200/7 via-teal-200/5 to-cyan-200/7 rounded-full blur-3xl animate-[float_16s_ease-in-out_infinite_reverse]"></div>
      <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-gradient-to-br from-cyan-200/6 via-teal-200/4 to-blue-200/6 rounded-full blur-3xl animate-[float_14s_ease-in-out_infinite]" style={{animationDelay: '4s'}}></div>
      
      {/* Subtle ripple effects for causes */}
      <div className="absolute top-1/4 right-1/4 w-24 h-24 border border-teal-200/20 rounded-full animate-[ripple_8s_ease-out_infinite]"></div>
      <div className="absolute bottom-1/3 left-1/5 w-32 h-32 border border-cyan-200/20 rounded-full animate-[ripple_10s_ease-out_infinite]" style={{animationDelay: '3s'}}></div>
      
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-20 bg-gradient-to-b from-teal-300/15 via-cyan-300/10 to-transparent rounded-full transform rotate-12"></div>
        <div className="absolute bottom-20 right-20 w-1.5 h-16 bg-gradient-to-b from-blue-300/15 via-teal-300/10 to-transparent rounded-full transform -rotate-12"></div>
      </div>
      
      <div className="container px-4 md:px-6 text-center relative z-10">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter font-poppins bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Causes You Can Support
          </h2>
          <p className="max-w-[800px] mx-auto text-gray-600 text-lg md:text-xl mt-4 leading-relaxed">
            Make a meaningful impact across diverse causes that matter most to our communities
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {causes.map((cause, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-2xl ${cause.bgColor} ${cause.hoverColor} shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group transform hover:-translate-y-2`}
            >
              <div className="p-8">
                <div className="relative">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${cause.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <cause.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800">
                    {cause.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700">
                    {cause.description}
                  </p>
                </div>
                
                {/* Decorative elements */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-r ${cause.color} opacity-10 rounded-full transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500`}></div>
                <div className={`absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-r ${cause.color} opacity-5 rounded-full transform -translate-x-6 translate-y-6 group-hover:scale-125 transition-transform duration-500`}></div>
              </div>
              
              {/* Hover border effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${cause.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>
        
        <div className="mt-12">
          <p className="text-gray-500 text-sm">
            Can't find your cause? <span className="text-primary font-semibold cursor-pointer hover:underline">Contact us</span> to explore more options
          </p>
        </div>
      </div>
    </section>
  )
}
