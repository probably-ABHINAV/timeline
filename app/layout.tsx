import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter, Dancing_Script } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Our Love Story - From JPHS to Forever",
  description:
    "A breathtaking romantic journey through our love story, from first meeting at JPHS Jaipur to Fun Kingdom adventures.",
  keywords: "love story, timeline, birthday, romance, interactive, aesthetic, JPHS, Jaipur",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${dancing.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden bg-gradient-to-br from-pink-50 to-rose-50">
        {children}
      </body>
    </html>
  )
}
