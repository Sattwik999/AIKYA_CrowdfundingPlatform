"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot, User, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

interface FAQ {
  question: string
  answer: string
  category: string
}

const faqs: FAQ[] = [
  // Website Usage
  {
    question: "How do I navigate the website?",
    answer: "Use the main navigation menu at the top to access different sections like Browse Fundraisers, How It Works, and your profile. The search function helps you find specific campaigns.",
    category: "website"
  },
  {
    question: "How do I create an account?",
    answer: "Click the 'Sign Up' button in the top right corner. You can register using your email or phone number. Verification is required for security.",
    category: "website"
  },
  {
    question: "Is my personal information secure?",
    answer: "Yes, we use bank-level encryption and follow strict data protection policies. Your information is never shared without consent.",
    category: "website"
  },

  // Creating Fundraisers
  {
    question: "How do I start a fundraiser?",
    answer: "Click 'Start a Fundraiser' and follow our 3-step process: 1) Tell your story, 2) Set your goal, 3) Share with others. It takes only 2 minutes to get started.",
    category: "fundraiser"
  },
  {
    question: "What documents do I need for a medical fundraiser?",
    answer: "You'll need medical reports, doctor's prescription, hospital estimates, and identity proof. Our verification team will guide you through the process.",
    category: "fundraiser"
  },
  {
    question: "What documents do I need for an educational fundraiser?",
    answer: "Provide admission letters, fee structure, academic records, and identity proof. Educational institution verification may be required.",
    category: "fundraiser"
  },
  {
    question: "How long does fundraiser approval take?",
    answer: "Most fundraisers are approved within 24-48 hours after document verification. Emergency medical cases are prioritized and can be approved faster.",
    category: "fundraiser"
  },
  {
    question: "Can I edit my fundraiser after publishing?",
    answer: "Yes, you can update your story, add photos, and post updates. However, the fundraising goal can only be increased, not decreased.",
    category: "fundraiser"
  },

  // Donations
  {
    question: "How do I donate to a fundraiser?",
    answer: "Visit any fundraiser page and click 'Donate Now'. Choose your amount, payment method, and complete the secure transaction. You'll receive instant confirmation.",
    category: "donation"
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept UPI, debit/credit cards, net banking, and digital wallets. All payments are processed through secure, RBI-approved gateways.",
    category: "donation"
  },
  {
    question: "Is there a minimum donation amount?",
    answer: "The minimum donation is ₹10. There's no maximum limit - every contribution, big or small, makes a difference.",
    category: "donation"
  },
  {
    question: "Can I donate anonymously?",
    answer: "Yes, you can choose to donate anonymously. Your name won't be displayed publicly, but the fundraiser organizer will still receive your support.",
    category: "donation"
  },
  {
    question: "How do I track my donations?",
    answer: "All your donations are listed in your profile under 'My Donations'. You'll receive email updates about the fundraisers you've supported.",
    category: "donation"
  },

  // Managing Fundraisers
  {
    question: "Where can I see all my fundraisers?",
    answer: "Go to your profile dashboard where you'll find 'My Fundraisers' section. Here you can view all your active and completed campaigns in one place.",
    category: "management"
  },
  {
    question: "How do I withdraw funds?",
    answer: "Once your fundraiser reaches 10% of the goal, you can withdraw funds. Go to your fundraiser dashboard and click 'Withdraw Funds'. Money is transferred within 3-5 business days.",
    category: "management"
  },
  {
    question: "How do I share my fundraiser?",
    answer: "Use the share buttons on your fundraiser page to post on WhatsApp, Facebook, Twitter, and Instagram. You can also copy the direct link to share via SMS or email.",
    category: "management"
  },
  {
    question: "Can I extend my fundraiser deadline?",
    answer: "Yes, you can extend your fundraiser duration from your dashboard. Most fundraisers can run for up to 365 days.",
    category: "management"
  },

  // Tax Benefits & Legal
  {
    question: "Do I get tax benefits for donations?",
    answer: "Yes! Donations to verified medical and educational fundraisers are eligible for 80G tax deductions. You'll receive a tax receipt within 48 hours of donation.",
    category: "tax"
  },
  {
    question: "What is 80G tax benefit?",
    answer: "Under Section 80G of the Income Tax Act, you can claim 50% tax deduction on donations to eligible causes. For a ₹1000 donation, you save ₹500 in taxes.",
    category: "tax"
  },
  {
    question: "How do I get my tax receipt?",
    answer: "Tax receipts are automatically generated and sent to your registered email within 48 hours. You can also download them from your profile's 'Tax Receipts' section.",
    category: "tax"
  },
  {
    question: "Is AIKYA registered for tax exemptions?",
    answer: "Yes, AIKYA is registered under Section 12A and 80G of the Income Tax Act. We're also registered under the Foreign Contribution Regulation Act (FCRA).",
    category: "tax"
  },
  {
    question: "Do fundraiser organizers pay taxes on received funds?",
    answer: "Medical fundraisers are generally tax-exempt as they're considered gifts for treatment. Educational fundraisers may have different tax implications. Consult a tax advisor for specific cases.",
    category: "tax"
  },

  // General Support
  {
    question: "What are your platform fees?",
    answer: "We charge a 5% platform fee + payment gateway charges (usually 2-3%). This helps us maintain the platform and provide support services.",
    category: "general"
  },
  {
    question: "How do I contact customer support?",
    answer: "You can reach us via email at support@aikya.org, phone at 1800-123-AIKYA, or use this chat. We're available 24/7 for urgent medical cases.",
    category: "general"
  },
  {
    question: "What if my fundraiser doesn't reach its goal?",
    answer: "You keep all the funds raised, even if you don't reach your goal. Every rupee goes toward your cause (minus platform fees).",
    category: "general"
  }
]

const quickActions = [
  { text: "Start a Fundraiser", category: "fundraiser" },
  { text: "How to Donate", category: "donation" },
  { text: "Tax Benefits", category: "tax" },
  { text: "My Fundraisers", category: "management" },
  { text: "Contact Support", category: "general" }
]

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm AIKYA. I can help you with fundraisers, donations, tax benefits, and more. How can I assist you today?",
      isBot: true,
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const findBestAnswer = (userMessage: string): string => {
    const lowercaseMessage = userMessage.toLowerCase()
    
    // Find exact or partial matches
    const matchedFAQ = faqs.find(faq => 
      lowercaseMessage.includes(faq.question.toLowerCase()) ||
      faq.question.toLowerCase().includes(lowercaseMessage) ||
      faq.answer.toLowerCase().includes(lowercaseMessage)
    )

    if (matchedFAQ) {
      return matchedFAQ.answer
    }

    // Keyword-based matching
    const keywords = {
      fundraiser: ["start", "create", "fundraiser", "campaign", "begin"],
      donation: ["donate", "payment", "contribute", "give", "support"],
      tax: ["tax", "80g", "benefit", "receipt", "deduction", "exemption"],
      management: ["manage", "withdraw", "funds", "dashboard", "my fundraiser"],
      website: ["navigate", "account", "sign up", "register", "login"],
      general: ["fee", "cost", "support", "help", "contact"]
    }

    for (const [category, words] of Object.entries(keywords)) {
      if (words.some(word => lowercaseMessage.includes(word))) {
        const categoryFAQs = faqs.filter(faq => faq.category === category)
        if (categoryFAQs.length > 0) {
          return categoryFAQs[0].answer
        }
      }
    }

    // Default response with helpful suggestions
    return "I'd be happy to help! Here are some common topics I can assist with:\n\n• Creating and managing fundraisers\n• Making donations and payment methods\n• Tax benefits and receipts\n• Account and website navigation\n• Platform fees and policies\n\nPlease ask me about any specific topic, or try one of the quick action buttons below!"
  }

  const handleSend = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: findBestAnswer(inputValue),
        isBot: true,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000)
  }

  const handleQuickAction = (action: string) => {
    if (!action.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: action,
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: findBestAnswer(action),
        isBot: true,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-12 h-12 md:w-16 md:h-16 rounded-full shadow-lg bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 hover:from-blue-600 hover:via-cyan-600 hover:to-teal-600 transition-all duration-300 hover:scale-110 z-50"
          size="lg"
        >
          <MessageCircle className="w-6 h-6 md:w-8 md:h-8 text-white" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-[calc(100vw-2rem)] max-w-sm md:w-96 h-[calc(100vh-6rem)] max-h-[500px] md:h-[500px] shadow-2xl z-50 bg-white/95 backdrop-blur-sm border border-blue-200/50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 text-white rounded-t-lg flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
                <img 
                  src="/placeholder-logo.svg" 
                  alt="AIKYA Logo" 
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div>
                <h3 className="font-semibold">AIKYA</h3>
                <p className="text-xs opacity-90">Always here to help</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 w-8 h-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 min-h-0 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isBot
                        ? "bg-blue-50 text-gray-800 border border-blue-100"
                        : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {message.isBot && (
                        <img 
                          src="/placeholder-logo.svg" 
                          alt="AIKYA" 
                          className="w-4 h-4 mt-0.5 flex-shrink-0 object-contain"
                        />
                      )}
                      <div className="flex-1">
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                        <p className={`text-xs mt-1 ${message.isBot ? "text-gray-500" : "text-blue-100"}`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      {!message.isBot && (
                        <User className="w-4 h-4 mt-0.5 text-blue-100 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <img 
                        src="/placeholder-logo.svg" 
                        alt="AIKYA" 
                        className="w-4 h-4 object-contain"
                      />
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Quick Actions */}
          <div className="px-4 py-2 border-t flex-shrink-0">
            <div className="flex flex-wrap gap-1">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAction(action.text)}
                  className="text-xs h-7 px-2 bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 hover:from-blue-100 hover:to-cyan-100"
                >
                  {action.text}
                </Button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t flex-shrink-0">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about AIKYA..."
                className="flex-1 border-blue-200 focus:border-blue-400"
              />
              <Button 
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  )
}