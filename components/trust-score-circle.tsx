interface TrustScoreCircleProps {
  score: number
}

export function TrustScoreCircle({ score }: TrustScoreCircleProps) {
  const circumference = 2 * Math.PI * 20 // r=20
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="relative w-12 h-12">
      <svg className="w-full h-full" viewBox="0 0 44 44">
        <circle
          className="text-gray-200" // Lighter gray for background
          strokeWidth="4"
          stroke="currentColor"
          fill="transparent"
          r="20"
          cx="22"
          cy="22"
        />
        <circle
          className="text-green-600" // More vibrant green for progress
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="20"
          cx="22"
          cy="22"
          transform="rotate(-90 22 22)"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold text-white">{score}%</span> {/* More prominent score */}
      </div>
    </div>
  )
}
