"use client"

import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Progress } from "./ui/progress"
import { Clock, Users, Target, Heart, Share, MapPin, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

interface EmergencyFund {
  id: string
  title: string
  category: string
  goal: number
  raised: number
  donors: number
  timeLeft: string
  image: string
  isUrgent: boolean
  description: string
  trustScore: number
  location: string
  organizer: string
  type: "Individual" | "Campaign" | "NGO"
  daysLeft: number
  isVerified: boolean
}

export function EmergencyFunds() {
  // Professional dummy data for demo
  const [emergencyFunds] = useState<EmergencyFund[]>([
    {
      id: "1",
      title: "Critical Heart Surgery for 8-Year-Old Priya",
      category: "Medical Emergency",
      goal: 750000,
      raised: 486000,
      donors: 1834,
      timeLeft: "3 days",
      image: "",
      isUrgent: true,
      description: "Urgent cardiac surgery required to save young life",
      trustScore: 92,
      location: "Mumbai, Maharashtra",
      organizer: "Priya's Family",
      type: "Individual",
      daysLeft: 3,
      isVerified: true
    },
    {
      id: "2",
      title: "Education Fund for Orphaned Children",
      category: "Education",
      goal: 450000,
      raised: 298000,
      donors: 1247,
      timeLeft: "8 days",
      image: "",
      isUrgent: true,
      description: "Providing quality education to children who lost parents",
      trustScore: 88,
      location: "Delhi, NCR",
      organizer: "Hope Foundation",
      type: "NGO",
      daysLeft: 8,
      isVerified: true
    },
    {
      id: "3",
      title: "Emergency Relief for Flood Victims",
      category: "Disaster Relief",
      goal: 1200000,
      raised: 867000,
      donors: 3421,
      timeLeft: "5 days",
      image: "",
      isUrgent: true,
      description: "Immediate aid for families affected by recent floods",
      trustScore: 95,
      location: "Kerala, India",
      organizer: "Disaster Relief Committee",
      type: "Campaign",
      daysLeft: 5,
      isVerified: true
    },
    {
      id: "4",
      title: "Cancer Treatment for Young Mother",
      category: "Medical Emergency",
      goal: 850000,
      raised: 623000,
      donors: 2156,
      timeLeft: "6 days",
      image: "",
      isUrgent: true,
      description: "Chemotherapy treatment for 28-year-old mother of two",
      trustScore: 90,
      location: "Bangalore, Karnataka",
      organizer: "Rajesh Kumar",
      type: "Individual",
      daysLeft: 6,
      isVerified: true
    },
    {
      id: "5",
      title: "Rural School Infrastructure Development",
      category: "Education",
      goal: 600000,
      raised: 387000,
      donors: 1542,
      timeLeft: "12 days",
      image: "",
      isUrgent: false,
      description: "Building classrooms and facilities for rural education",
      trustScore: 85,
      location: "Rajasthan, India",
      organizer: "Rural Education Trust",
      type: "NGO",
      daysLeft: 12,
      isVerified: true
    },
    {
      id: "6",
      title: "Medical Equipment for Community Clinic",
      category: "Medical Emergency",
      goal: 950000,
      raised: 712000,
      donors: 2834,
      timeLeft: "4 days",
      image: "",
      isUrgent: true,
      description: "Essential medical equipment for underserved community",
      trustScore: 87,
      location: "Kolkata, West Bengal",
      organizer: "Community Health Initiative",
      type: "Campaign",
      daysLeft: 4,
      isVerified: true
    }
  ])
  const [loading] = useState(false)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Function to handle sharing
  const handleShare = async (fund: EmergencyFund) => {
    const shareData = {
      title: `${fund.title} - Help Support This Emergency Campaign`,
      text: `Check out this urgent fundraising campaign: ${fund.title}. Goal: ₹${fund.goal.toLocaleString()}, Raised: ₹${fund.raised.toLocaleString()}. ${fund.description}`,
      url: `${window.location.origin}/fundraiser/${fund.id}`
    }

    // Check if native sharing is supported
    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        console.log('Error sharing:', error)
        fallbackShare(fund)
      }
    } else {
      // Fallback to custom share options
      fallbackShare(fund)
    }
  }

  // Function to handle contribute button click
  const handleContribute = (fund: EmergencyFund) => {
    // Create payment modal
    const modal = document.createElement('div')
    modal.className = 'fixed inset-0 flex items-center justify-center z-50 p-4'
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
    modal.innerHTML = `
      <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-gray-200 animate-in fade-in-0 zoom-in-95 duration-200">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-bold text-gray-900">Support ${fund.title}</h3>
            <button class="close-modal text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <div class="mb-6">
            <div class="flex justify-between text-sm text-gray-600 mb-2">
              <span>Goal: ₹${fund.goal.toLocaleString()}</span>
              <span>Raised: ₹${fund.raised.toLocaleString()}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-blue-600 h-2 rounded-full" style="width: ${(fund.raised / fund.goal) * 100}%"></div>
            </div>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Choose Amount</label>
              <div class="grid grid-cols-3 gap-2 mb-3">
                <button class="amount-btn p-3 border border-gray-300 rounded-lg text-center hover:border-blue-500 hover:bg-blue-50" data-amount="500">₹500</button>
                <button class="amount-btn p-3 border border-gray-300 rounded-lg text-center hover:border-blue-500 hover:bg-blue-50" data-amount="1000">₹1,000</button>
                <button class="amount-btn p-3 border border-gray-300 rounded-lg text-center hover:border-blue-500 hover:bg-blue-50" data-amount="2000">₹2,000</button>
              </div>
              <input type="number" id="custom-amount" placeholder="Enter custom amount" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
              <div class="space-y-2">
                <label class="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input type="radio" name="payment" value="upi" class="mr-3" />
                  <span class="font-medium">UPI Payment</span>
                </label>
                <label class="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input type="radio" name="payment" value="card" class="mr-3" />
                  <span class="font-medium">Credit/Debit Card</span>
                </label>
                <label class="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input type="radio" name="payment" value="netbanking" class="mr-3" />
                  <span class="font-medium">Net Banking</span>
                </label>
              </div>
            </div>

            <button class="donate-btn w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200">
              Donate Now
            </button>
          </div>
        </div>
      </div>
    `

    document.body.appendChild(modal)

    // Add event listeners
    modal.querySelector('.close-modal')?.addEventListener('click', () => {
      document.body.removeChild(modal)
    })

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal)
      }
    })

    // Amount button handlers
    modal.querySelectorAll('.amount-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const amount = (e.target as HTMLElement).dataset.amount
        const customInput = modal.querySelector('#custom-amount') as HTMLInputElement
        customInput.value = amount || ''
        
        // Update active state
        modal.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('border-blue-500', 'bg-blue-50'))
        btn.classList.add('border-blue-500', 'bg-blue-50')
      })
    })

    // Donate button handler
    modal.querySelector('.donate-btn')?.addEventListener('click', () => {
      const customAmount = (modal.querySelector('#custom-amount') as HTMLInputElement).value
      const selectedPayment = (modal.querySelector('input[name="payment"]:checked') as HTMLInputElement)?.value
      
      if (!customAmount || !selectedPayment) {
        alert('Please select an amount and payment method')
        return
      }

      alert(`Thank you for your contribution of ₹${customAmount} via ${selectedPayment}! This is a demo implementation.`)
      document.body.removeChild(modal)
    })
  }

  // Fallback share function with multiple options
  const fallbackShare = (fund: EmergencyFund) => {
    const shareText = `Check out this urgent fundraising campaign: ${fund.title}. Goal: ₹${fund.goal.toLocaleString()}, Raised: ₹${fund.raised.toLocaleString()}.`
    const shareUrl = `${window.location.origin}/fundraiser/${fund.id}`
    
    // Create share options
    const shareOptions = [
      {
        name: 'WhatsApp',
        url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg>`,
        color: '#25D366'
      },
      {
        name: 'Twitter',
        url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="#1DA1F2"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>`,
        color: '#1DA1F2'
      },
      {
        name: 'Facebook',
        url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
        color: '#1877F2'
      },
      {
        name: 'Copy Link',
        action: () => {
          navigator.clipboard.writeText(shareUrl)
          alert('Campaign link copied to clipboard!')
        },
        icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="#6B7280"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>`,
        color: '#6B7280'
      }
    ]

    // Create and show share dialog
    const shareDialog = document.createElement('div')
    shareDialog.className = 'fixed inset-0 flex items-center justify-center z-50 p-4'
    shareDialog.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'
    shareDialog.innerHTML = `
      <div class="bg-white rounded-2xl shadow-2xl max-w-sm w-full border border-gray-200 animate-in fade-in-0 zoom-in-95 duration-200">
        <div class="p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-1">Share Campaign</h3>
          <p class="text-sm text-gray-500 mb-6">Help spread the word about ${fund.title}</p>
          <div class="grid grid-cols-2 gap-3">
            ${shareOptions.map(option => `
              <button class="share-option flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all duration-200 hover:scale-105" data-url="${option.url || ''}" data-action="${option.action ? 'copy' : 'link'}">
                <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background-color: ${option.color}15;">
                  ${option.icon}
                </div>
                <span class="font-medium text-gray-900 text-sm">${option.name}</span>
              </button>
            `).join('')}
          </div>
          <button class="close-share-dialog w-full mt-4 p-3 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    `

    document.body.appendChild(shareDialog)

    // Add event listeners
    shareDialog.querySelectorAll('.share-option').forEach(button => {
      button.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement
        const url = target.dataset.url
        const action = target.dataset.action
        
        if (action === 'copy') {
          navigator.clipboard.writeText(shareUrl)
          alert('Campaign link copied to clipboard!')
        } else if (url) {
          window.open(url, '_blank', 'width=600,height=400')
        }
        
        document.body.removeChild(shareDialog)
      })
    })

    shareDialog.querySelector('.close-share-dialog')?.addEventListener('click', () => {
      document.body.removeChild(shareDialog)
    })

    shareDialog.addEventListener('click', (e) => {
      if (e.target === shareDialog) {
        document.body.removeChild(shareDialog)
      }
    })
  }

  return (
    <section className="relative w-full py-12 md:py-16 lg:py-20 overflow-hidden">
      {/* Ocean Emergency Theme Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/40 via-blue-50/30 to-teal-50/40"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/20 via-transparent to-cyan-100/20"></div>
      
      {/* Urgent wave patterns */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-red-50/30 via-orange-50/20 to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(239,68,68,0.04),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(6,182,212,0.05),transparent_60%)]"></div>
      
      {/* Floating emergency orbs */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-red-200/8 via-orange-200/6 to-yellow-200/8 rounded-full blur-3xl animate-[float_10s_ease-in-out_infinite]"></div>
      <div className="absolute top-1/3 -left-16 w-48 h-48 bg-gradient-to-br from-cyan-200/6 via-blue-200/4 to-teal-200/6 rounded-full blur-3xl animate-[float_14s_ease-in-out_infinite_reverse]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-blue-200/5 via-cyan-200/3 to-teal-200/5 rounded-full blur-3xl animate-[float_12s_ease-in-out_infinite]" style={{animationDelay: '3s'}}></div>
      
      <div className="relative container px-4 md:px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Clock className="w-4 h-4" />
          Urgent Appeals
        </div>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-poppins mb-4">
          Emergency Funds Need Your Help
        </h2>
        <p className="max-w-[900px] mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mb-8">
          These critical campaigns need immediate support. Your donation can make a life-changing difference.
        </p>
        
        {/* Professional horizontal scroll container */}
        <div className="relative">
          <div className="overflow-x-auto scrollbar-hide pb-4">
            <div className="flex gap-6 px-4 min-w-max">
              {loading ? (
                // Loading skeleton
                Array.from({ length: 3 }).map((_, index) => (
                  <Card key={index} className="flex-shrink-0 w-80 bg-white/90 backdrop-blur-sm overflow-hidden animate-pulse border border-gray-100">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                        <div className="h-10 bg-gray-200 rounded w-full"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : emergencyFunds.length === 0 ? (
                // No data state
                <div className="w-full text-center py-12">
                  <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Emergency Appeals</h3>
                  <p className="text-gray-600">Check back later for urgent campaigns that need your support.</p>
                </div>
              ) : (
                emergencyFunds.map((fund, index) => {
                  const progress = (fund.raised / fund.goal) * 100;
                  // Low-key gradient colors for cards
                  const gradients = [
                    "from-blue-50/40 to-indigo-50/30",
                    "from-emerald-50/40 to-teal-50/30", 
                    "from-purple-50/40 to-pink-50/30",
                    "from-orange-50/40 to-amber-50/30",
                    "from-slate-50/40 to-gray-50/30",
                    "from-rose-50/40 to-red-50/30"
                  ];
                  const gradientClass = gradients[index % gradients.length];
                  
                  return (
            <Card key={fund.id} className={`group flex-shrink-0 w-80 flex flex-col overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border bg-gradient-to-br ${gradientClass} hover:border-blue-200`}>
              {/* Header Section */}
              <div className="p-4 pb-3">
                {/* Trust Score & Badges Row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {/* Trust Score Badge - Simple Clean Design */}
                    <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 shadow-sm flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-xs font-bold text-blue-600">{fund.trustScore}%</div>
                        <div className="text-xs text-gray-500">Trust</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    {fund.isUrgent && (
                      <Badge className="bg-red-100 text-red-700 text-xs font-medium px-2 py-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        URGENT
                      </Badge>
                    )}
                    {fund.isVerified && (
                      <Badge className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        VERIFIED
                      </Badge>
                    )}
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors duration-200">
                  {fund.title}
                </h3>
                
                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate max-w-20">{fund.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{fund.daysLeft}d left</span>
                  </div>
                </div>
                
                {/* Fundraising Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-semibold text-gray-900">
                      ₹{fund.raised.toLocaleString()}
                    </span>
                    <span className="text-gray-600 text-xs">
                      of ₹{fund.goal.toLocaleString()}
                    </span>
                  </div>
                  
                  <Progress 
                    value={progress} 
                    className="h-2"
                  />
                  
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Users className="h-3 w-3" />
                      <span className="font-medium">{fund.donors}</span> supporters
                    </div>
                    <div className="font-medium text-blue-600">
                      {progress.toFixed(0)}% funded
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-4 pb-4 mt-auto">
                <div className="grid grid-cols-3 gap-2">
                  <Link href="/browse-fundraisers">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-xs hover:bg-gray-50 border-gray-300"
                    >
                      Know More
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-xs hover:bg-gray-50 border-gray-300"
                    onClick={() => handleShare(fund)}
                  >
                    <Share className="h-3 w-3 mr-1" />
                    Share
                  </Button>
                  <Button 
                    size="sm" 
                    className="w-full text-xs bg-blue-600 hover:bg-blue-700 group-hover:shadow-lg transition-all duration-200"
                    onClick={() => handleContribute(fund)}
                  >
                    <Heart className="h-3 w-3 mr-1 group-hover:scale-110 transition-transform duration-200" />
                    Contribute
                  </Button>
                </div>
              </div>
            </Card>
                  );
                })
              )}
            </div>
          </div>
          
          {/* Scroll indicators */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-l from-white to-transparent w-8 h-full pointer-events-none"></div>
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-white to-transparent w-8 h-full pointer-events-none"></div>
        </div>
        
        <div className="text-center mt-6">
          <Button variant="outline" size="lg" className="hover:bg-primary hover:text-white transition-all duration-300" asChild>
            <Link href="/browse-fundraisers?filter=urgent">
              View All Emergency Appeals
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}