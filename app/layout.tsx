import type { Metadata } from "next"
import "./globals.css"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
  metadataBase: new URL("https://retirefree.app"),
  title: {
    default: "RetireFree - AI-Powered Retirement Withdrawal Calculator | $15/month",
    template: "%s | RetireFree"
  },
  description: "Calculate your optimal retirement withdrawal strategy with AI for just $15/month. No more $5,000 advisor fees. Try our free calculator now.",
  keywords: ["retirement planning", "withdrawal strategy", "retirement calculator", "AI financial advisor", "retirement income", "safe withdrawal rate", "retirement spending", "financial planning"],
  authors: [{ name: "RetireFree" }],
  creator: "RetireFree",
  publisher: "RetireFree",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "RetireFree - AI-Powered Retirement Withdrawal Calculator",
    description: "Calculate your optimal retirement withdrawal strategy with AI for just $15/month. No more $5,000 advisor fees.",
    url: "https://retirefree.app",
    siteName: "RetireFree",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RetireFree - AI-Powered Retirement Withdrawal Calculator",
    description: "Calculate your optimal retirement withdrawal strategy with AI for just $15/month.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
