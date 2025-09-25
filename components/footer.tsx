import Link from "next/link"
import { Heart, Shield, Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 text-gray-300 py-12 px-4 md:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gray-600/3 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-slate-600/3 rounded-full blur-3xl"></div>
      
      <div className="relative container mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* AIKYA Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg flex items-center justify-center border border-slate-500/30">
                <Heart className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white font-poppins">AIKYA</h3>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white font-medium">AI for Impact, Kindness, Youth & Action</span><br />
              Empowering every Indian dream through transparent, secure crowdfunding.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4 text-slate-300" />
              <span className="text-slate-300">100% Secure</span>
              <span className="mx-2 text-slate-400">•</span>
              <span className="text-slate-300">Zero Platform Fee</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Get Started</h4>
            <div className="space-y-3">
              <Link 
                href="/start-fundraiser" 
                className="flex items-center gap-2 text-sm hover:text-white transition-colors group"
              >
                <div className="w-2 h-2 bg-slate-400 rounded-full group-hover:scale-125 group-hover:bg-white transition-all"></div>
                Start Your Fundraiser
              </Link>
              <Link 
                href="/browse-fundraisers" 
                className="flex items-center gap-2 text-sm hover:text-white transition-colors group"
              >
                <div className="w-2 h-2 bg-slate-400 rounded-full group-hover:scale-125 group-hover:bg-white transition-all"></div>
                Browse & Donate
              </Link>
              <Link 
                href="/how-it-works" 
                className="flex items-center gap-2 text-sm hover:text-white transition-colors group"
              >
                <div className="w-2 h-2 bg-slate-400 rounded-full group-hover:scale-125 group-hover:bg-white transition-all"></div>
                How AIKYA Works
              </Link>
              <Link 
                href="/success-stories" 
                className="flex items-center gap-2 text-sm hover:text-white transition-colors group"
              >
                <div className="w-2 h-2 bg-slate-400 rounded-full group-hover:scale-125 group-hover:bg-white transition-all"></div>
                Success Stories
              </Link>
            </div>
          </div>

          {/* Contact & Trust */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Support & Trust</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-slate-400" />
                <span>24/7 Support: <span className="text-white">+91-AIKYA-123</span></span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-slate-400" />
                <span>help@aikya.in</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-slate-400" />
                <span>Made in India with ❤️</span>
              </div>
              <div className="pt-2">
                <Link 
                  href="/trust-safety" 
                  className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
                >
                  <Shield className="h-4 w-4" />
                  Trust & Safety Center
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-gray-800/50">
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            © 2025 AIKYA. Changing lives, one rupee at a time.
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
              Terms
            </Link>
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
