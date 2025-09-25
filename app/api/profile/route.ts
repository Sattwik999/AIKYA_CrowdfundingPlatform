import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id

    // Fetch user profile
    const user = (await db.user.findUnique({
      where: { id: userId },
    })) as any

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Fetch user's fundraisers with contribution counts
    const fundraisers = await db.fundraiser.findMany({
      where: { userId },
      include: {
        contributions: {
          select: {
            amount: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    // Fetch user's contributions
    const contributions = await db.contribution.findMany({
      where: { userId },
      include: {
        fundraiser: {
          select: {
            id: true,
            title: true,
            imageUrl: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    // Calculate statistics
    const totalFundraisers = fundraisers.length
    const totalRaised = fundraisers.reduce((sum, f) => sum + f.raised, 0)
    const totalContributions = contributions.length
    const totalDonated = contributions.reduce((sum, c) => sum + c.amount, 0)
    const successfulCampaigns = fundraisers.filter(f => f.raised >= f.goal).length
    const averageTrustScore = fundraisers.length > 0 
      ? Math.round(fundraisers.reduce((sum, f) => sum + f.trustScore, 0) / fundraisers.length)
      : 0

    // Transform fundraisers data
    const transformedFundraisers = fundraisers.map(fundraiser => ({
      id: fundraiser.id,
      title: fundraiser.title,
      description: fundraiser.description,
      goal: fundraiser.goal,
      raised: fundraiser.raised,
      category: fundraiser.category,
      imageUrl: fundraiser.imageUrl,
      trustScore: fundraiser.trustScore,
      isActive: fundraiser.isActive,
      createdAt: fundraiser.createdAt.toISOString(),
      contributionsCount: fundraiser.contributions.length
    }))

    // Transform contributions data
    const transformedContributions = contributions.map(contribution => ({
      id: contribution.id,
      amount: contribution.amount,
      message: contribution.message,
      isAnonymous: contribution.isAnonymous,
      createdAt: contribution.createdAt.toISOString(),
      fundraiser: {
        id: contribution.fundraiser.id,
        title: contribution.fundraiser.title,
        imageUrl: contribution.fundraiser.imageUrl
      }
    }))

    const stats = {
      totalFundraisers,
      totalRaised,
      totalContributions,
      totalDonated,
      successfulCampaigns,
      averageTrustScore
    }

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        phone: user.phone,
        dob: user?.dob ? new Date(user.dob).toISOString() : null,
        pan: user?.pan ?? null,
        aadhaar: user?.aadhaar ?? null,
        address: user?.address ?? null,
        bio: user?.bio ?? null,
        isVerified: user.isVerified,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      },
      stats,
      fundraisers: transformedFundraisers,
      contributions: transformedContributions
    })

  } catch (error) {
    console.error("Error fetching profile:", error)
    return NextResponse.json(
      { error: "Failed to fetch profile data" },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id
    const body = await request.json()
    
  const { name, phone, bio, dob, pan, aadhaar, address } = body

    // Update user profile
    const updatedUser = (await db.user.update({
      where: { id: userId },
      data: {
        name: name || null,
        phone: phone || null,
        bio: bio || null,
        dob: dob ? new Date(dob) : null,
        pan: pan || null,
        aadhaar: aadhaar || null,
        address: address || null,
      } as any,
    })) as any

    return NextResponse.json({
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        image: updatedUser.image,
        phone: updatedUser.phone,
        dob: updatedUser?.dob ? new Date(updatedUser.dob).toISOString() : null,
        pan: updatedUser?.pan ?? null,
        aadhaar: updatedUser?.aadhaar ?? null,
        address: updatedUser?.address ?? null,
        bio: updatedUser?.bio ?? null,
        isVerified: updatedUser.isVerified,
        createdAt: updatedUser.createdAt.toISOString(),
        updatedAt: updatedUser.updatedAt.toISOString(),
      }
    })

  } catch (error) {
    console.error("Error updating profile:", error)
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    )
  }
}