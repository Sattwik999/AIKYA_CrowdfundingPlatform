import { db } from './lib/db'

async function main() {
  console.log('🌱 Seeding database...')

  // Create sample users if they don't exist
  const sampleUsers = [
    {
      email: 'john@example.com',
      name: 'John Doe',
      isVerified: true,
    },
    {
      email: 'jane@example.com', 
      name: 'Jane Smith',
      isVerified: true,
    },
    {
      email: 'alice@example.com',
      name: 'Alice Johnson',
      isVerified: false,
    }
  ]

  const users = []
  for (const userData of sampleUsers) {
    const existingUser = await db.user.findUnique({
      where: { email: userData.email }
    })

    if (!existingUser) {
      const user = await db.user.create({
        data: userData
      })
      users.push(user)
      console.log(`✅ Created user: ${user.name}`)
    } else {
      users.push(existingUser)
      console.log(`📝 User already exists: ${existingUser.name}`)
    }
  }

  // Create sample fundraisers
  const sampleFundraisers = [
    {
      title: 'Help Build School in Rural India',
      description: 'Supporting education for underprivileged children in rural areas of India. Every contribution helps build a brighter future.',
      goal: 50000,
      raised: 32500,
      category: 'Education',
      imageUrl: '/indian-children-studying-rural.jpg',
      trustScore: 92,
      userId: users[0].id,
    },
    {
      title: 'Medical Treatment for Cancer Patient',
      description: 'Urgent medical treatment needed for a young cancer patient. Your support can save a life.',
      goal: 100000,
      raised: 45000,
      category: 'Medical',
      imageUrl: '/indian-cancer-patient-hospital.jpg',
      trustScore: 88,
      userId: users[1].id,
    },
    {
      title: 'Emergency Relief for Flood Victims',
      description: 'Providing immediate relief to families affected by recent floods. Food, shelter, and medical aid needed.',
      goal: 25000,
      raised: 18750,
      category: 'Emergency',
      imageUrl: '/diverse-people-helping.png',
      trustScore: 95,
      userId: users[0].id,
    },
    {
      title: 'Scholarship Fund for Tribal Students',
      description: 'Creating opportunities for tribal students to pursue higher education and break the cycle of poverty.',
      goal: 75000,
      raised: 12000,
      category: 'Education',
      imageUrl: '/indian-student-scholarship.jpg',
      trustScore: 85,
      userId: users[2].id,
    },
    {
      title: 'Medical Camp for Remote Villages',
      description: 'Organizing medical camps in remote villages where healthcare access is limited.',
      goal: 30000,
      raised: 22000,
      category: 'Medical',
      imageUrl: '/indian-tribal-medical-camp.jpg',
      trustScore: 90,
      userId: users[1].id,
    }
  ]

  for (const fundraiserData of sampleFundraisers) {
    const existingFundraiser = await db.fundraiser.findFirst({
      where: { title: fundraiserData.title }
    })

    if (!existingFundraiser) {
      const fundraiser = await db.fundraiser.create({
        data: fundraiserData
      })
      console.log(`✅ Created fundraiser: ${fundraiser.title}`)
    } else {
      console.log(`📝 Fundraiser already exists: ${existingFundraiser.title}`)
    }
  }

  // Create sample contributions
  const sampleContributions = [
    {
      amount: 5000,
      message: 'Happy to support this great cause!',
      isAnonymous: false,
      userId: users[1].id,
      fundraiserId: (await db.fundraiser.findFirst({ where: { title: 'Help Build School in Rural India' } }))?.id || '',
    },
    {
      amount: 2500,
      message: 'Every child deserves education.',
      isAnonymous: false,
      userId: users[2].id,
      fundraiserId: (await db.fundraiser.findFirst({ where: { title: 'Help Build School in Rural India' } }))?.id || '',
    },
    {
      amount: 10000,
      message: '',
      isAnonymous: true,
      userId: users[0].id,
      fundraiserId: (await db.fundraiser.findFirst({ where: { title: 'Medical Treatment for Cancer Patient' } }))?.id || '',
    }
  ]

  for (const contributionData of sampleContributions) {
    if (contributionData.fundraiserId) {
      const contribution = await db.contribution.create({
        data: contributionData
      })
      console.log(`✅ Created contribution: ₹${contribution.amount}`)
    }
  }

  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })