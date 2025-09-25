import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import { PrismaAdapter } from "@auth/prisma-adapter"
import bcrypt from "bcryptjs"
import { db } from "./db"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as any,
  providers: [
    // Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    
    // Facebook OAuth Provider
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    }),
    
    // Credentials Provider for email/password
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" }, // For sign up
        phone: { label: "Phone", type: "tel" }, // For sign up
        dob: { label: "Date of Birth", type: "text" }, // ISO date string
        pan: { label: "PAN", type: "text" },
        aadhaar: { label: "Aadhaar", type: "text" },
        address: { label: "Address", type: "text" },
        isSignUp: { label: "Is Sign Up", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required")
        }

  const { email, password, name, phone, dob, pan, aadhaar, address, isSignUp } = credentials as Record<string, string>

        // Handle Sign Up
        if (isSignUp === "true") {
          // Check if user already exists
          const existingUser = await db.user.findUnique({
            where: { email }
          })
          
          if (existingUser) {
            throw new Error("User already exists with this email")
          }

          if (!name) {
            throw new Error("Name is required for sign up")
          }

          // Hash password
          const hashedPassword = await bcrypt.hash(password, 12)

          // Create new user
          const newUser = await db.user.create({
            data: {
              name,
              email,
              password: hashedPassword,
              phone: phone || null,
              dob: dob ? new Date(dob) : null,
              pan: pan || null,
              aadhaar: aadhaar || null,
              address: address || null,
              isVerified: false,
            } as any,
          })

          return {
            id: newUser.id,
            name: newUser.name || "",
            email: newUser.email,
            image: newUser.image,
            isVerified: newUser.isVerified,
            phone: newUser.phone || undefined,
          }
        }

        // Handle Sign In
        const user = await db.user.findUnique({
          where: { email }
        })
        
        if (!user || !user.password) {
          throw new Error("No user found with this email")
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
          throw new Error("Invalid password")
        }

        return {
          id: user.id,
          name: user.name || "",
          email: user.email,
          image: user.image,
          isVerified: user.isVerified,
          phone: user.phone || undefined,
        }
      },
    }),
  ],

  pages: {
    signIn: "/", // We'll handle sign in through our modal
  },

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.isVerified = user.isVerified || false
        token.phone = user.phone
        if (account?.provider && account.provider !== "credentials") {
          token.provider = account.provider
          token.isVerified = true // OAuth users are considered verified
        }
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub || ""
        session.user.isVerified = token.isVerified as boolean || false
        session.user.phone = token.phone as string
        session.user.provider = token.provider as string
      }
      return session
    },
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
}