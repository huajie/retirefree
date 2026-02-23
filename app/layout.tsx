import type { Metadata } from "next"
import "./globals.css"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

export const metadata: Metadata = {
  title: "RetireFree - AI-Powered Retirement Withdrawal Guidance",
  description: "Never worry about running out of money in retirement. Get AI-powered guidance on how much you can safely spend each month.",
  openGraph: {
    title: "RetireFree - AI-Powered Retirement Withdrawal Guidance",
    description: "Never worry about running out of money in retirement. Get AI-powered guidance on how much you can safely spend each month.",
    url: "https://retirefree.app",
    siteName: "RetireFree",
    locale: "en_US",
    type: "website",
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
      </body>
    </html>
  )
}
