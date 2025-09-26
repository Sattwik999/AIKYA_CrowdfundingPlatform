import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import path from "path"
import { writeFile } from "fs/promises"
import { mkdir } from "fs/promises"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // Extract text fields
    const textFields = {
      // Common fields
      fundraiser_type: formData.get('fundraiser_type') as string,
      name: formData.get('name') as string,
      story: formData.get('story') as string,
      supporting_doc_type: formData.get('supporting_doc_type') as string,
      user_id: formData.get('user_id') as string,
      goal_amount: formData.get('goal_amount') as string,
      category: formData.get('category') as string,
      
      // Individual fields
      aadhaar_number: formData.get('aadhaar_number') as string,
      pan_number: formData.get('pan_number') as string,
      phone_number: formData.get('phone_number') as string,
      emergency_contact: formData.get('emergency_contact') as string,
      
      // Campaign fields
      campaign_title: formData.get('campaign_title') as string,
      organizer_name: formData.get('organizer_name') as string,
      team_size: formData.get('team_size') as string,
      campaign_duration: formData.get('campaign_duration') as string,
      expected_impact: formData.get('expected_impact') as string,
      
      // NGO fields
      ngo_name: formData.get('ngo_name') as string,
      registration_number: formData.get('registration_number') as string,
      ngo_website: formData.get('ngo_website') as string,
      ngo_email: formData.get('ngo_email') as string,
      years_of_operation: formData.get('years_of_operation') as string,
      previous_projects: formData.get('previous_projects') as string,
    }

    // Extract files
    const files = {
      id_image: formData.get('id_image') as File,
      selfie_image: formData.get('selfie_image') as File,
      supporting_doc: formData.get('supporting_doc') as File,
      aadhaar_doc: formData.get('aadhaar_doc') as File,
      pan_doc: formData.get('pan_doc') as File,
      ngo_certificate: formData.get('ngo_certificate') as File,
    }

    // Validate required fields based on fundraiser type
    const requiredFieldsValid = (() => {
      const commonValid = textFields.story && textFields.user_id && textFields.goal_amount && textFields.category
      
      if (textFields.fundraiser_type === 'individual') {
        return commonValid && textFields.name && textFields.aadhaar_number && textFields.pan_number
      } else if (textFields.fundraiser_type === 'campaign') {
        return commonValid && textFields.campaign_title && textFields.organizer_name
      } else if (textFields.fundraiser_type === 'ngo') {
        return commonValid && textFields.ngo_name && textFields.registration_number && textFields.ngo_email
      }
      return false
    })()

    if (!requiredFieldsValid) {
      return NextResponse.json(
        { error: 'Missing required fields for the selected fundraiser type' },
        { status: 400 }
      )
    }

    // For now, skip file uploads to simplify testing
    // TODO: Add file upload handling later
    const filePaths: any = {}

    // Generate fake trust score (70-95 range)
    const fakeTrustScore = Math.floor(Math.random() * 26) + 70

    // Generate random campaign data
    const goalAmount = parseFloat(textFields.goal_amount) || Math.floor(Math.random() * 400000) + 100000
    const raisedAmount = Math.floor(Math.random() * goalAmount * 0.6) // Up to 60% raised
    const donors = Math.floor(Math.random() * 150) + 5
    const daysLeft = Math.floor(Math.random() * 45) + 5

    // Save to Prisma database
    const fundraiser = await db.fundraiser.create({
      data: {
        title: textFields.fundraiser_type === 'campaign' 
          ? textFields.campaign_title 
          : textFields.fundraiser_type === 'ngo'
          ? `${textFields.ngo_name} - Fundraiser`
          : `Help ${textFields.name}`,
        description: textFields.story.length > 200 
          ? textFields.story.substring(0, 200) + "..." 
          : textFields.story,

        goal: goalAmount,
        raised: raisedAmount,

        category: textFields.category || 'Community',
        trustScore: fakeTrustScore,
        organizer: textFields.fundraiser_type === 'campaign' 
          ? textFields.organizer_name 
          : textFields.fundraiser_type === 'ngo'
          ? textFields.ngo_name
          : textFields.name,
        story: textFields.story,
        supportingDocType: textFields.supporting_doc_type,
        aadhaarNumber: textFields.aadhaar_number,
        panNumber: textFields.pan_number,
        location: 'India',
        isUrgent: daysLeft <= 15,
        isVerified: fakeTrustScore >= 80,
        donors: donors,
        daysLeft: daysLeft,
        imageUrl: filePaths.selfie_image || '/placeholder.jpg',
        
        // File paths
        idImagePath: filePaths.id_image,
        selfieImagePath: filePaths.selfie_image,
        supportingDocPath: filePaths.supporting_doc,
        aadhaarDocPath: filePaths.aadhaar_doc,
        panDocPath: filePaths.pan_doc,
        
        // Connect to user - create dummy user if needed
        user: {
          connectOrCreate: {
            where: { id: textFields.user_id },
            create: {
              id: textFields.user_id,
              name: textFields.name,
              email: `${textFields.user_id}@aikya.example.com`
            }
          }
        },
      }
    })

    return NextResponse.json({
      success: true,
      message: "Fundraiser created successfully!",
      fundraiser: {
        id: fundraiser.id,
        title: fundraiser.title,
        trustScore: fundraiser.trustScore,
        goal: fundraiser.goal,
        raised: fundraiser.raised,
        verified: (fundraiser as any).isVerified,
        urgent: (fundraiser as any).isUrgent
      }
    })

  } catch (error: any) {
    console.error('Error creating fundraiser:', error)
    
    // Handle Prisma user not found error
    if (error.code === 'P2003') {
      return NextResponse.json(
        { error: 'User not found. Please use a valid user ID or sign up first.' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to create fundraiser. Please try again.' },
      { status: 500 }
    )
  }
}