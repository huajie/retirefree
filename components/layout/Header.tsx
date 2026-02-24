'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'

export function Header() {
  const pathname = usePathname()
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const isHomePage = pathname === '/'

  return (
    <header className="border-b border-[#E5E7EB] bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <span className="text-xl font-bold text-[#1E3A8A]">RetireFree</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {isHomePage ? (
              <>
                <Link href="#features" className="text-[#4B5563] hover:text-[#2563EB] transition-colors">
                  Features
                </Link>
                <Link href="#pricing" className="text-[#4B5563] hover:text-[#2563EB] transition-colors">
                  Pricing
                </Link>
                <Link href="#faq" className="text-[#4B5563] hover:text-[#2563EB] transition-colors">
                  FAQ
                </Link>
              </>
            ) : (
              <>
                <Link href="/#calculator" className="text-[#4B5563] hover:text-[#2563EB] transition-colors">
                  Calculator
                </Link>
                <Link href="/pricing" className="text-[#4B5563] hover:text-[#2563EB] transition-colors">
                  Pricing
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center gap-4">
            {user ? (
              <Link href="/dashboard">
                <Button size="sm">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="text" size="sm">
                    Log In
                  </Button>
                </Link>
                <Link href={isHomePage ? "#calculator" : "/auth/signup"}>
                  <Button size="sm">
                    {isHomePage ? "Try Free Calculator" : "Sign Up"}
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
