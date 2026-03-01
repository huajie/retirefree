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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
            <span className="text-lg sm:text-xl font-bold text-[#1E3A8A]">RetireFree</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {isHomePage ? (
              <>
                <Link href="#features" className="text-[#4B5563] hover:text-[#2563EB] transition-colors">
                  Features
                </Link>
                <Link href="/blog" className="text-[#4B5563] hover:text-[#2563EB] transition-colors">
                  Blog
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
                {user && (
                  <>
                    <Link href="/dashboard/accounts" className="text-[#4B5563] hover:text-[#2563EB] transition-colors">
                      Accounts
                    </Link>
                    <Link href="/dashboard/spending" className="text-[#4B5563] hover:text-[#2563EB] transition-colors">
                      Spending
                    </Link>
                    <Link href="/dashboard/settings" className="text-[#4B5563] hover:text-[#2563EB] transition-colors">
                      Settings
                    </Link>
                  </>
                )}
                <Link href="/blog" className="text-[#4B5563] hover:text-[#2563EB] transition-colors">
                  Blog
                </Link>
                <Link href="/pricing" className="text-[#4B5563] hover:text-[#2563EB] transition-colors">
                  Pricing
                </Link>
              </>
            )}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
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
                    {isHomePage ? "Try Free" : "Sign Up"}
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#4B5563] hover:text-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB] rounded-md"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#E5E7EB]">
            <nav className="flex flex-col space-y-3">
              {isHomePage ? (
                <>
                  <Link
                    href="#features"
                    className="text-[#4B5563] hover:text-[#2563EB] transition-colors px-2 py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Features
                  </Link>
                  <Link
                    href="/blog"
                    className="text-[#4B5563] hover:text-[#2563EB] transition-colors px-2 py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Blog
                  </Link>
                  <Link
                    href="#pricing"
                    className="text-[#4B5563] hover:text-[#2563EB] transition-colors px-2 py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Pricing
                  </Link>
                  <Link
                    href="#faq"
                    className="text-[#4B5563] hover:text-[#2563EB] transition-colors px-2 py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    FAQ
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/#calculator"
                    className="text-[#4B5563] hover:text-[#2563EB] transition-colors px-2 py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Calculator
                  </Link>
                  {user && (
                    <>
                      <Link
                        href="/dashboard/accounts"
                        className="text-[#4B5563] hover:text-[#2563EB] transition-colors px-2 py-1"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Accounts
                      </Link>
                      <Link
                        href="/dashboard/spending"
                        className="text-[#4B5563] hover:text-[#2563EB] transition-colors px-2 py-1"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Spending
                      </Link>
                      <Link
                        href="/dashboard/settings"
                        className="text-[#4B5563] hover:text-[#2563EB] transition-colors px-2 py-1"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Settings
                      </Link>
                    </>
                  )}
                  <Link
                    href="/blog"
                    className="text-[#4B5563] hover:text-[#2563EB] transition-colors px-2 py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Blog
                  </Link>
                  <Link
                    href="/pricing"
                    className="text-[#4B5563] hover:text-[#2563EB] transition-colors px-2 py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Pricing
                  </Link>
                </>
              )}
              <div className="border-t border-[#E5E7EB] pt-3 mt-2 space-y-2">
                {user ? (
                  <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    <Button size="sm" className="w-full">
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="secondary" size="sm" className="w-full">
                        Log In
                      </Button>
                    </Link>
                    <Link href={isHomePage ? "#calculator" : "/auth/signup"} onClick={() => setMobileMenuOpen(false)}>
                      <Button size="sm" className="w-full">
                        {isHomePage ? "Try Free Calculator" : "Sign Up"}
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
