import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy') || 'recent'
    const goalRange = searchParams.get('goalRange')

    // Build where clause
    const where: any = {}
    
    if (category && category !== 'all') {
      where.category = category
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (goalRange) {
      const [min, max] = goalRange.split('-').map(Number)
      where.goal = {
        gte: min,
        ...(max ? { lte: max } : {})
      }
    }

    // Build orderBy clause
    let orderBy: any = { createdAt: 'desc' } // default to recent

    switch (sortBy) {
      case 'goal-high':
        orderBy = { goal: 'desc' }
        break
      case 'goal-low':
        orderBy = { goal: 'asc' }
        break
      case 'raised-high':
        orderBy = { raised: 'desc' }
        break
      case 'raised-low':
        orderBy = { raised: 'asc' }
        break
      case 'trust-score':
        orderBy = { trustScore: 'desc' }
        break
      case 'recent':
      default:
        orderBy = { createdAt: 'desc' }
        break
    }

    const fundraisers = await db.fundraiser.findMany({
      where,
      orderBy,
      include: {
        user: {
          select: {
            name: true,
            isVerified: true
          }
        },
        contributions: {
          select: {
            amount: true
          }
        }
      }
    })

    // Transform data to match the frontend format
    const transformedFundraisers = fundraisers.map(fundraiser => ({
      id: fundraiser.id,
      title: fundraiser.title,
      description: fundraiser.description,
      image: fundraiser.imageUrl || "/placeholder.jpg",
      raised: fundraiser.raised,
      goal: fundraiser.goal,
      daysLeft: Math.max(0, Math.floor((new Date().getTime() - fundraiser.createdAt.getTime()) / (1000 * 60 * 60 * 24)) + 30), // Assuming 30 day campaigns
      type: "Individual" as const,
      category: fundraiser.category,
      trustScore: fundraiser.trustScore,
      donors: fundraiser.contributions.length,
      isUrgent: fundraiser.goal - fundraiser.raised > fundraiser.goal * 0.8,
      isVerified: fundraiser.user.isVerified,
      location: "India", // Default location
      organizer: fundraiser.user.name || "Anonymous"
    }))

    return NextResponse.json(transformedFundraisers)
  } catch (error) {
    console.error("Error fetching fundraisers:", error)
    return NextResponse.json(
      { error: "Failed to fetch fundraisers" },
      { status: 500 }
    )
  }
}