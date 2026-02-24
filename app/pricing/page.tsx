'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export default function PricingPage() {
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    checkUser()
  }, [supabase.auth])

  const handleStartTrial = async () => {
    if (!user) {
      router.push('/auth/signup')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session')
      }

      if (data.url) {
        window.location.href = data.url
      }
    } catch (error: any) {
      console.error('Checkout error:', error)
      alert(error.message || 'Failed to start checkout. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EFF6FF] to-white py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1E3A8A] mb-4">
            Professional Guidance at a Fraction of the Cost
          </h1>
          <p className="text-xl text-[#4B5563]">
            Financial advisors charge $5,000+ per year for retirement planning.
            <br />
            RetireFree gives you the same peace of mind for less than the cost of dinner out.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <Card variant="result">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl mb-2">$15/month</CardTitle>
              <p className="text-[#4B5563]">Start with a 7-day free trial. Cancel anytime.</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-[#059669] text-xl mt-1">✓</span>
                  <span>AI-powered spending recommendations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#059669] text-xl mt-1">✓</span>
                  <span>Save and track your calculations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#059669] text-xl mt-1">✓</span>
                  <span>Unlimited calculations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#059669] text-xl mt-1">✓</span>
                  <span>Email support</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#059669] text-xl mt-1">✓</span>
                  <span>Cancel anytime, no contracts</span>
                </li>
              </ul>

              <Button
                size="lg"
                className="w-full"
                onClick={handleStartTrial}
                isLoading={isLoading}
              >
                {user ? 'Start Your Free 7-Day Trial' : 'Sign Up to Get Started'}
              </Button>

              {!user && (
                <p className="text-center text-sm text-[#6B7280] mt-4">
                  Already have an account?{' '}
                  <Link
                    href="/auth/login"
                    className="text-[#2563EB] hover:underline font-semibold"
                  >
                    Log in
                  </Link>
                </p>
              )}

              <p className="text-center text-sm text-[#6B7280] mt-4">
                Join hundreds of retirees who sleep better at night knowing their money will last.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Comparison Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-[#1E3A8A] text-center mb-8">
            Why Choose RetireFree?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Traditional Financial Advisor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#DC2626] mb-4">
                  $5,000+/year
                </div>
                <ul className="space-y-2 text-[#4B5563]">
                  <li>• Annual or quarterly meetings</li>
                  <li>• Complex fee structures</li>
                  <li>• Limited availability</li>
                  <li>• Minimum asset requirements</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>DIY with Spreadsheets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#D97706] mb-4">
                  Free
                </div>
                <ul className="space-y-2 text-[#4B5563]">
                  <li>• Time-consuming to maintain</li>
                  <li>• Risk of calculation errors</li>
                  <li>• No expert guidance</li>
                  <li>• Stressful and uncertain</li>
                </ul>
              </CardContent>
            </Card>

            <Card variant="result">
              <CardHeader>
                <CardTitle>RetireFree</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#059669] mb-4">
                  $15/month
                </div>
                <ul className="space-y-2 text-[#4B5563]">
                  <li>• Instant AI recommendations</li>
                  <li>• Simple, transparent pricing</li>
                  <li>• Available 24/7</li>
                  <li>• No minimums required</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-[#1E3A8A] text-center mb-8">
            Common Questions
          </h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            <div>
              <h3 className="text-lg font-semibold text-[#1E3A8A] mb-2">
                What happens after the 7-day trial?
              </h3>
              <p className="text-[#4B5563]">
                After your 7-day free trial, you'll be charged $15/month. You can cancel
                anytime before the trial ends and you won't be charged.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#1E3A8A] mb-2">
                Can I really cancel anytime?
              </h3>
              <p className="text-[#4B5563]">
                Yes! There are no contracts or commitments. Cancel with one click from
                your dashboard. You'll keep access through the end of your billing period.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#1E3A8A] mb-2">
                Is my financial data secure?
              </h3>
              <p className="text-[#4B5563]">
                Absolutely. We use bank-level encryption to protect your information. Your
                data is encrypted in transit and at rest. We never sell your data to third
                parties.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-16 text-center">
          <Button size="lg" onClick={handleStartTrial} isLoading={isLoading}>
            Start Your Free 7-Day Trial
          </Button>
          <p className="text-[#6B7280] mt-4">No credit card required for trial</p>
        </div>
      </div>
    </div>
  )
}
