import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Log In to Your Account",
  description: "Log in to your RetireFree account to access your retirement dashboard, view calculations, and manage your subscription.",
  alternates: {
    canonical: "https://retirefree.app/auth/login",
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
