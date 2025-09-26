import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrustScoreBadge } from "@/components/trust-score-badge"
import { MapPin, Users, Clock, AlertCircle, CheckCircle, Heart, Share, X, CreditCard, Wallet, Building2, Smartphone, Shield, Info } from "lucide-react"

interface Fundraiser {
  id: string
  title: string
  description: string
  image: string
  raised: number
  goal: number
  daysLeft: number
  type: "Individual" | "Campaign" | "NGO"
  category: string
  trustScore: number
  donors: number
  isUrgent: boolean
  isVerified: boolean
  location: string
  organizer: string
}

interface FundraiserCardProps {
  fundraiser: Fundraiser
}

export function FundraiserCard({ fundraiser }: FundraiserCardProps) {
  const progress = (fundraiser.raised / fundraiser.goal) * 100

  // Function to handle sharing
  const handleShare = async (fundraiser: Fundraiser) => {
    const shareData = {
      title: `${fundraiser.title} - Help Support This Campaign`,
      text: `Check out this fundraising campaign: ${fundraiser.title}. Goal: ₹${fundraiser.goal.toLocaleString()}, Raised: ₹${fundraiser.raised.toLocaleString()}. ${fundraiser.description}`,
      url: `${window.location.origin}/fundraiser/${fundraiser.id}`
    }

    // Check if native sharing is supported
    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        console.log('Error sharing:', error)
        fallbackShare(fundraiser)
      }
    } else {
      // Fallback to custom share options
      fallbackShare(fundraiser)
    }
  }

  // Fallback share function with multiple options
  const fallbackShare = (fundraiser: Fundraiser) => {
    const shareText = `Check out this fundraising campaign: ${fundraiser.title}. Goal: ₹${fundraiser.goal.toLocaleString()}, Raised: ₹${fundraiser.raised.toLocaleString()}.`
    const shareUrl = `${window.location.origin}/fundraiser/${fundraiser.id}`
    
    // Create share options with original company icons
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

    // Create and show share dialog with better styling
    const shareDialog = document.createElement('div')
    shareDialog.className = 'fixed inset-0 flex items-center justify-center z-50 p-4'
    shareDialog.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'
    shareDialog.innerHTML = `
      <div class="bg-white rounded-2xl shadow-2xl max-w-sm w-full border border-gray-200 animate-in fade-in-0 zoom-in-95 duration-200">
        <div class="p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-1">Share Campaign</h3>
          <p class="text-sm text-gray-500 mb-6">Help spread the word about ${fundraiser.title}</p>
          <div class="space-y-3">
            ${shareOptions.map((option, index) => `
              <button 
                class="w-full flex items-center p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 group"
                onclick="handleShareOption(${index})"
                style="border-color: ${option.color}20;"
              >
                <div class="w-10 h-10 rounded-lg flex items-center justify-center mr-4" style="background-color: ${option.color}15;">
                  ${option.icon}
                </div>
                <span class="font-medium text-gray-700 group-hover:text-gray-900">${option.name}</span>
              </button>
            `).join('')}
          </div>
          <button 
            class="w-full mt-6 p-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium text-gray-700 transition-colors duration-200"
            onclick="closeShareDialog()"
          >
            Cancel
          </button>
        </div>
      </div>
    `

    // Add event handlers
    ;(window as any).handleShareOption = (index: number) => {
      const option = shareOptions[index]
      if (option.url) {
        window.open(option.url, '_blank')
      } else if (option.action) {
        option.action()
      }
      document.body.removeChild(shareDialog)
    }

    ;(window as any).closeShareDialog = () => {
      document.body.removeChild(shareDialog)
    }

    // Close dialog when clicking outside
    shareDialog.addEventListener('click', (e) => {
      if (e.target === shareDialog) {
        document.body.removeChild(shareDialog)
      }
    })

    document.body.appendChild(shareDialog)
  }

  // Function to handle payment/contribution
  const handleContribute = (fundraiser: Fundraiser) => {
    const paymentDialog = document.createElement('div')
    paymentDialog.className = 'fixed inset-0 flex items-center justify-center z-50 p-4'
    paymentDialog.style.backgroundColor = 'rgba(0, 0, 0, 0.15)'
    
    paymentDialog.innerHTML = `
      <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-gray-200 animate-in fade-in-0 zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-100">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Heart class="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Support C
              <svg width="20" height="20" fill="white" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Support Campaign</h3>
              <p class="text-sm text-gray-500">Secure payment powered by Razorpay</p>
            </div>
          </div>
          <button onclick="closePaymentDialog()" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>

        <!-- Campaign Info -->
        <div class="p-6 border-b border-gray-100 bg-gray-50">
          <div class="flex items-start gap-4">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
              ${fundraiser.title.charAt(0)}
            </div>
            <div class="flex-1">
              <h4 class="font-semibold text-gray-900 mb-1 line-clamp-2">${fundraiser.title}</h4>
              <p class="text-sm text-gray-600 mb-2">by ${fundraiser.organizer}</p>
              <div class="flex items-center gap-4 text-xs text-gray-500">
                <span>₹${fundraiser.raised.toLocaleString()} raised</span>
                <span>•</span> 
                <span>₹${fundraiser.goal.toLocaleString()} goal</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Amount Selection -->
        <div class="p-6 border-b border-gray-100">
          <label class="block text-sm font-medium text-gray-700 mb-3">Choose Amount</label>
          <div class="grid grid-cols-3 gap-2 mb-4">
            <button class="amount-btn p-3 border border-gray-300 rounded-lg text-center hover:border-blue-500 hover:bg-blue-50 transition-all" data-amount="500">
              <div class="font-semibold">₹500</div>
            </button>
            <button class="amount-btn p-3 border border-gray-300 rounded-lg text-center hover:border-blue-500 hover:bg-blue-50 transition-all" data-amount="1000">
              <div class="font-semibold">₹1,000</div>
            </button>
            <button class="amount-btn p-3 border border-gray-300 rounded-lg text-center hover:border-blue-500 hover:bg-blue-50 transition-all" data-amount="2000">
              <div class="font-semibold">₹2,000</div>
            </button>
            <button class="amount-btn p-3 border border-gray-300 rounded-lg text-center hover:border-blue-500 hover:bg-blue-50 transition-all" data-amount="5000">
              <div class="font-semibold">₹5,000</div>
            </button>
            <button class="amount-btn p-3 border border-gray-300 rounded-lg text-center hover:border-blue-500 hover:bg-blue-50 transition-all" data-amount="10000">
              <div class="font-semibold">₹10,000</div>
            </button>
            <button class="amount-btn p-3 border border-gray-300 rounded-lg text-center hover:border-blue-500 hover:bg-blue-50 transition-all" onclick="toggleCustomAmount()">
              <div class="font-semibold text-sm">Other</div>
            </button>
          </div>
          
          <!-- Custom Amount Input -->
          <div id="customAmountSection" class="hidden mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Enter Custom Amount</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
              <input 
                type="number" 
                id="customAmount" 
                class="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Enter amount"
                min="1"
              />
            </div>
          </div>
          
          <!-- Total Display -->
          <div class="bg-blue-50 rounded-lg p-4">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Total Amount</span>
              <span id="totalAmount" class="text-xl font-bold text-blue-600">₹0</span>
            </div>
          </div>
        </div>

        <!-- Payment Methods -->
        <div class="p-6 border-b border-gray-100">
          <label class="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
          <div class="space-y-2">
            <button class="payment-method w-full flex items-center p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left" data-method="upi">
              <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <svg width="20" height="20" fill="currentColor" class="text-green-600" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
              <div>
                <div class="font-medium text-gray-900">UPI</div>
                <div class="text-sm text-gray-500">Pay using any UPI app</div>
              </div>
              <div class="ml-auto">
                <div class="w-5 h-5 border-2 border-gray-300 rounded-full payment-radio"></div>
              </div>
            </button>
            
            <button class="payment-method w-full flex items-center p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left" data-method="card">
              <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <svg width="20" height="20" fill="currentColor" class="text-blue-600" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                </svg>
              </div>
              <div>
                <div class="font-medium text-gray-900">Debit/Credit Card</div>
                <div class="text-sm text-gray-500">Visa, Mastercard, RuPay</div>
              </div>
              <div class="ml-auto">
                <div class="w-5 h-5 border-2 border-gray-300 rounded-full payment-radio"></div>
              </div>
            </button>
            
            <button class="payment-method w-full flex items-center p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left" data-method="netbanking">
              <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <svg width="20" height="20" fill="currentColor" class="text-purple-600" viewBox="0 0 24 24">
                  <path d="M5 5h2v3h10V5h2v5h2V4h-8V2h-2v2H3v6h2V5zm2 8v6h10v-6H7zm2 4v-2h6v2H9z"/>
                </svg>
              </div>
              <div>
                <div class="font-medium text-gray-900">Net Banking</div>
                <div class="text-sm text-gray-500">All major banks supported</div>
              </div>
              <div class="ml-auto">
                <div class="w-5 h-5 border-2 border-gray-300 rounded-full payment-radio"></div>
              </div>
            </button>
            
            <button class="payment-method w-full flex items-center p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left" data-method="wallet">
              <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                <svg width="20" height="20" fill="currentColor" class="text-orange-600" viewBox="0 0 24 24">
                  <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                </svg>
              </div>
              <div>
                <div class="font-medium text-gray-900">Wallets</div>
                <div class="text-sm text-gray-500">Paytm, PhonePe, Amazon Pay</div>
              </div>
              <div class="ml-auto">
                <div class="w-5 h-5 border-2 border-gray-300 rounded-full payment-radio"></div>
              </div>
            </button>
          </div>
        </div>

        <!-- Security Badge -->
        <div class="p-6 border-b border-gray-100">
          <div class="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
            <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <svg width="16" height="16" fill="currentColor" class="text-green-600" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="flex-1">
              <div class="text-sm font-medium text-green-800">Secure Payment</div>
              <div class="text-xs text-green-600">256-bit SSL encryption • PCI DSS compliant</div>
            </div>
          </div>
        </div>

        <!-- Footer Action -->
        <div class="p-6">
          <button 
            id="proceedBtn"
            onclick="proceedPayment()"
            disabled
            class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200"
          >
            Proceed to Pay ₹0
          </button>
          <p class="text-xs text-gray-500 text-center mt-3">
            By proceeding, you agree to our Terms & Conditions and Privacy Policy
          </p>
        </div>
      </div>
    `

    // Add event handlers for payment dialog
    let selectedAmount = 0
    let selectedMethod = ''

    // Amount selection handlers
    const amountBtns = paymentDialog.querySelectorAll('.amount-btn')
    amountBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault()
        const amount = parseInt((btn as HTMLElement).dataset.amount || '0')
        if (amount > 0) {
          selectedAmount = amount
          updateAmountSelection(btn)
          updateTotal()
          updateProceedButton()
        }
      })
    })

    // Payment method handlers
    const paymentMethods = paymentDialog.querySelectorAll('.payment-method')
    paymentMethods.forEach(method => {
      method.addEventListener('click', (e) => {
        e.preventDefault()
        selectedMethod = (method as HTMLElement).dataset.method || ''
        updatePaymentMethodSelection(method)
        updateProceedButton()
      })
    })

    // Custom amount handler
    const customAmountInput = paymentDialog.querySelector('#customAmount')
    if (customAmountInput) {
      customAmountInput.addEventListener('input', (e) => {
        const amount = parseInt((e.target as HTMLInputElement).value || '0')
        if (amount > 0) {
          selectedAmount = amount
          clearAmountSelection()
          updateTotal()
          updateProceedButton()
        }
      })
    }

    function updateAmountSelection(selectedBtn: Element) {
      amountBtns.forEach(btn => {
        btn.classList.remove('border-blue-500', 'bg-blue-50')
        btn.classList.add('border-gray-300')
      })
      selectedBtn.classList.remove('border-gray-300')
      selectedBtn.classList.add('border-blue-500', 'bg-blue-50')
      
      // Clear custom amount
      const customInput = paymentDialog.querySelector('#customAmount') as HTMLInputElement
      if (customInput) customInput.value = ''
    }

    function clearAmountSelection() {
      amountBtns.forEach(btn => {
        btn.classList.remove('border-blue-500', 'bg-blue-50')
        btn.classList.add('border-gray-300')
      })
    }

    function updatePaymentMethodSelection(selectedMethod: Element) {
      paymentMethods.forEach(method => {
        const radio = method.querySelector('.payment-radio')
        if (radio) {
          radio.classList.remove('bg-blue-600', 'border-blue-600')
          radio.classList.add('border-gray-300')
          radio.innerHTML = ''
        }
        method.classList.remove('border-blue-500', 'bg-blue-50')
        method.classList.add('border-gray-300')
      })
      
      selectedMethod.classList.remove('border-gray-300')
      selectedMethod.classList.add('border-blue-500', 'bg-blue-50')
      
      const radio = selectedMethod.querySelector('.payment-radio')
      if (radio) {
        radio.classList.remove('border-gray-300')
        radio.classList.add('bg-blue-600', 'border-blue-600')
        radio.innerHTML = '<div class="w-2 h-2 bg-white rounded-full"></div>'
      }
    }

    function updateTotal() {
      const totalElement = paymentDialog.querySelector('#totalAmount')
      if (totalElement) {
        totalElement.textContent = `₹${selectedAmount.toLocaleString()}`
      }
    }

    function updateProceedButton() {
      const proceedBtn = paymentDialog.querySelector('#proceedBtn') as HTMLButtonElement
      if (proceedBtn) {
        if (selectedAmount > 0 && selectedMethod) {
          proceedBtn.disabled = false
          proceedBtn.textContent = `Proceed to Pay ₹${selectedAmount.toLocaleString()}`
        } else {
          proceedBtn.disabled = true
          proceedBtn.textContent = 'Proceed to Pay ₹0'
        }
      }
    }

    // Global functions for onclick handlers
    ;(window as any).toggleCustomAmount = () => {
      const section = paymentDialog.querySelector('#customAmountSection')
      if (section) {
        section.classList.toggle('hidden')
        if (!section.classList.contains('hidden')) {
          const input = section.querySelector('#customAmount') as HTMLInputElement
          if (input) input.focus()
        }
      }
    }

    ;(window as any).proceedPayment = () => {
      if (selectedAmount > 0 && selectedMethod) {
        alert(`Processing payment of ₹${selectedAmount.toLocaleString()} via ${selectedMethod}...\nThis is a demo. In production, this would integrate with Razorpay API.`)
        document.body.removeChild(paymentDialog)
      }
    }

    ;(window as any).closePaymentDialog = () => {
      document.body.removeChild(paymentDialog)
    }

    // Close dialog when clicking outside
    paymentDialog.addEventListener('click', (e) => {
      if (e.target === paymentDialog) {
        document.body.removeChild(paymentDialog)
      }
    })

    document.body.appendChild(paymentDialog)
  }

  return (
    <Card className="group flex flex-col overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border bg-white hover:border-blue-200 max-w-sm">
      {/* Header Section */}
      <div className="p-4 pb-3">
        {/* Trust Score & Badges Row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {/* Trust Score Badge with Hover Effect */}
            <div className="relative group">
              <TrustScoreBadge 
                score={fundraiser.trustScore} 
                variant="shield" 
                size="sm" 
              />
              
              {/* Hover Overlay - Circular Trust Score */}
              <div className="absolute inset-0 bg-white rounded-lg border-2 border-blue-500 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center z-10">
                <div className="text-center">
                  <div className="relative w-12 h-12 mx-auto mb-1">
                    {/* Circular Progress Ring */}
                    <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                      {/* Background Circle */}
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#f3f4f6"
                        strokeWidth="2"
                      />
                      {/* Progress Circle */}
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={
                          fundraiser.trustScore >= 85 ? '#10b981' :
                          fundraiser.trustScore >= 70 ? '#3b82f6' :
                          fundraiser.trustScore >= 50 ? '#f59e0b' : '#ef4444'
                        }
                        strokeWidth="2"
                        strokeDasharray={`${fundraiser.trustScore}, 100`}
                        strokeLinecap="round"
                      />
                    </svg>

                    {/* Percentage in Center */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold text-gray-900">{fundraiser.trustScore}%</span>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-blue-600">Trust Score</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-1">
            {fundraiser.isUrgent && (
              <Badge className="bg-red-100 text-red-700 text-xs font-medium px-2 py-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                URGENT
              </Badge>
            )}
            {fundraiser.isVerified && (
              <Badge className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                VERIFIED
              </Badge>
            )}
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors duration-200">
          {fundraiser.title}
        </h3>
        
        {/* Meta Info */}
        <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span className="truncate max-w-20">{fundraiser.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{fundraiser.daysLeft}d left</span>
          </div>
        </div>
        
        {/* Fundraising Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="font-semibold text-gray-900">
              ₹{fundraiser.raised.toLocaleString()}
            </span>
            <span className="text-gray-600 text-xs">
              of ₹{fundraiser.goal.toLocaleString()}
            </span>
          </div>
          
          <Progress 
            value={progress} 
            className="h-2"
          />
          
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center gap-1 text-gray-600">
              <Users className="h-3 w-3" />
              <span className="font-medium">{fundraiser.donors}</span> supporters
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
          <Link href={`/fundraiser/${fundraiser.id}`}>
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
            onClick={() => handleShare(fundraiser)}
          >
            <Share className="h-3 w-3 mr-1" />
            Share
          </Button>
          <Button 
            size="sm" 
            className="w-full text-xs bg-blue-600 hover:bg-blue-700 group-hover:shadow-lg transition-all duration-200"
            onClick={() => handleContribute(fundraiser)}
          >
            <Heart className="h-3 w-3 mr-1 group-hover:scale-110 transition-transform duration-200" />
            Contribute
          </Button>
        </div>
      </div>
    </Card>
  )
}