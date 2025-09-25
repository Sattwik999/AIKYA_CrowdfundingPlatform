import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const emergencyFunds = await db.fundraiser.findMany({
      where: {
        OR: [
          { category: "Medical Emergency" },
          { category: "Disaster Relief" },
          { category: "Medical" }
        ],
        isActive: true
      },
      include: {
        _count: {
          select: {
            contributions: true
          }
        },
        contributions: {
          select: {
            amount: true
          }
        }
      },
      orderBy: [
        { createdAt: "desc" }
      ],
      take: 6 // Limit to 6 emergency funds
    })

    // Calculate raised amount and format data
    const formattedFunds = emergencyFunds.map((fund: any) => {
      const totalRaised = fund.contributions.reduce((sum: number, contribution: any) => 
        sum + contribution.amount, 0
      )
      
      // Calculate days left (assuming 30 days campaign duration)
      const createdDate = new Date(fund.createdAt)
      const endDate = new Date(createdDate.getTime() + (30 * 24 * 60 * 60 * 1000))
      const now = new Date()
      const daysLeft = Math.max(0, Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
      
      return {
        id: fund.id,
        title: fund.title,
        category: fund.category,
        goal: fund.goal,
        raised: fund.raised || totalRaised,
        donors: fund._count.contributions,
        timeLeft: daysLeft > 0 ? `${daysLeft} days` : "Ended",
        image: fund.imageUrl || "/placeholder.jpg",
        isUrgent: fund.category === "Medical Emergency" || fund.category === "Disaster Relief" || fund.category === "Medical",
        description: fund.description.length > 100 ? fund.description.substring(0, 100) + "..." : fund.description
      }
    })

    return NextResponse.json(formattedFunds)
  } catch (error) {
    console.error("Error fetching emergency funds:", error)
    return NextResponse.json(
      { error: "Failed to fetch emergency funds" },
      { status: 500 }
    )
  }
}