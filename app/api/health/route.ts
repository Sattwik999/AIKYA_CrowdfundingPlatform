import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    // Get total counts from database
    const [fundraiserCount, contributionCount, userCount] = await Promise.all([
      prisma.fundraiser.count(),
      prisma.contribution.count(),
      prisma.user.count()
    ])

    return NextResponse.json({
      fundraisers: fundraiserCount,
      contributions: contributionCount,
      users: userCount,
      message: "Database is connected and working!"
    })
  } catch (error) {
    console.error("Database connection error:", error)
    return NextResponse.json(
      { 
        error: "Database connection failed",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  }
}