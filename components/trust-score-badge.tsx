import { Shield, Star, CheckCircle } from "lucide-react"

interface TrustScoreBadgeProps {
  score: number
  variant?: 'star' | 'shield' | 'progress' | 'certificate'
  size?: 'sm' | 'md' | 'lg'
}

export function TrustScoreBadge({ score, variant = 'star', size = 'md' }: TrustScoreBadgeProps) {
  const getTrustLevel = (score: number) => {
    if (score >= 90) return { label: 'Excellent', color: 'emerald', textColor: 'text-emerald-600', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200' }
    if (score >= 80) return { label: 'Very Good', color: 'blue', textColor: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' }
    if (score >= 70) return { label: 'Good', color: 'green', textColor: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200' }
    if (score >= 60) return { label: 'Fair', color: 'yellow', textColor: 'text-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' }
    return { label: 'Needs Review', color: 'red', textColor: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' }
  }

  const trustLevel = getTrustLevel(score)
  const starCount = Math.floor(score / 20)
  const hasHalfStar = score % 20 >= 10

  if (variant === 'star') {
    return (
      <div className={`${trustLevel.bgColor} ${trustLevel.borderColor} rounded-lg p-2 border`}>
        <div className="flex items-center gap-1 mb-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`${size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} ${
                star <= starCount
                  ? 'text-yellow-400 fill-current'
                  : star === starCount + 1 && hasHalfStar
                  ? 'text-yellow-400 fill-current opacity-50'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <div className={`text-center ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
          <div className={`font-bold ${trustLevel.textColor}`}>
            {trustLevel.label}
          </div>
          <div className="text-gray-600 text-xs">{score}% Trusted</div>
        </div>
      </div>
    )
  }

  if (variant === 'shield') {
    return (
      <div className={`${trustLevel.bgColor} ${trustLevel.borderColor} rounded-lg p-3 border text-center`}>
        <div className="flex justify-center mb-2">
          <div className={`relative ${size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10'}`}>
            <Shield className={`w-full h-full ${trustLevel.textColor}`} />
            <CheckCircle className="absolute -top-1 -right-1 w-4 h-4 text-green-500 bg-white rounded-full" />
          </div>
        </div>
        <div className={`font-bold ${trustLevel.textColor} ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
          {trustLevel.label}
        </div>
        <div className="text-gray-600 text-xs">{score}% Trust Score</div>
      </div>
    )
  }

  if (variant === 'progress') {
    return (
      <div className={`${trustLevel.bgColor} ${trustLevel.borderColor} rounded-lg p-3 border`}>
        <div className="flex justify-between items-center mb-2">
          <span className={`font-medium ${trustLevel.textColor} ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
            Trust Level
          </span>
          <span className={`font-bold ${trustLevel.textColor} ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
            {score}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div 
            className={`bg-gradient-to-r from-${trustLevel.color}-400 to-${trustLevel.color}-600 h-2 rounded-full transition-all duration-300`}
            style={{ width: `${score}%` }}
          />
        </div>
        <div className={`text-center font-bold ${trustLevel.textColor} ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
          {trustLevel.label}
        </div>
      </div>
    )
  }

  if (variant === 'certificate') {
    return (
      <div className={`relative ${trustLevel.bgColor} ${trustLevel.borderColor} rounded-lg p-3 border overflow-hidden`}>
        {/* Certificate Ribbon */}
        <div className={`absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-b-[20px] border-b-${trustLevel.color}-500 transform rotate-90`} />
        
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <div className={`w-8 h-8 ${trustLevel.textColor} bg-white rounded-full flex items-center justify-center border-2 ${trustLevel.borderColor}`}>
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <div className={`font-bold ${trustLevel.textColor} ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
            {trustLevel.label}
          </div>
          <div className="text-gray-600 text-xs">Verified {score}%</div>
        </div>
      </div>
    )
  }

  return null
}