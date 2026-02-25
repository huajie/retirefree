import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign Up - Start Your 7-Day Free Trial",
  description: "Create your RetireFree account and start your 7-day free trial. Get AI-powered retirement withdrawal guidance for just $15/month. No credit card required for trial.",
  alternates: {
    canonical: "https://retirefree.app/auth/signup",
  },
}

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
