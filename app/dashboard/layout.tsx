import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "View your retirement calculations, manage your subscription, and get personalized withdrawal recommendations.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
