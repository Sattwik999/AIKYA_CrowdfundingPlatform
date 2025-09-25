import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Providers } from "@/components/providers"
import { Chatbot } from "@/components/chatbot"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "AIKYA - Crowdfunding Platform",
  description: "Empowering communities through crowdfunding.",
  generator: 'v0.app',
  icons: {
    icon: '/aikya-logo.png',
    shortcut: '/aikya-logo.png',
    apple: '/aikya-logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} antialiased`}>
      <head>
        <link rel="icon" href="/aikya-logo.png" type="image/png" />
        <link rel="shortcut icon" href="/aikya-logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/aikya-logo.png" />
      </head>
      <body>
        <Providers>
          <Header />
          {children}
          <Chatbot />
        </Providers>
      </body>
    </html>
  )
}
