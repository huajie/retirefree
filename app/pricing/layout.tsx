import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pricing - $15/month | 7-Day Free Trial",
  description: "Professional retirement planning guidance for just $15/month. Start with a 7-day free trial. Cancel anytime. No contracts. Same peace of mind as a $5,000/year financial advisor.",
  alternates: {
    canonical: "https://retirefree.app/pricing",
  },
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
