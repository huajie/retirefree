'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

interface Calculation {
  id: string
  age: number
  savings: number
  monthly_expenses: number
  risk_tolerance: string
  withdrawal_amount: number
  ai_advice: string
  ai_reasoning: string
  ai_provider: string
  confidence: number
  created_at: string
}

interface Subscription {
  status: string
  current_period_end: string
  cancel_at_period_end: boolean
}

interface DashboardClientProps {
  user: any
  calculations: Calculation[]
  subscription: Subscription | null
}

export function DashboardClient({ user, calculations, subscription }: DashboardClientProps) {
  const router = useRouter()
  const supabase = createClient()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isLoadingPortal, setIsLoadingPortal] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const handleManageSubscription = async () => {
    setIsLoadingPortal(true)
    try {
      const response = await fetch('/api/create-portal-session', {
        method: 'POST',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create portal session')
      }

      // Redirect to Stripe portal
      window.location.href = data.url
    } catch (error) {
      console.error('Error creating portal session:', error)
      alert(error instanceof Error ? error.message : 'Failed to open billing portal')
      setIsLoadingPortal(false)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getSubscriptionStatus = () => {
    if (!subscription) {
      return {
        text: 'Free Account',
        color: 'text-[#6B7280]',
        bgColor: 'bg-gray-100',
      }
    }

    switch (subscription.status) {
      case 'active':
        return {
          text: 'Active Subscription',
          color: 'text-[#059669]',
          bgColor: 'bg-green-50',
        }
      case 'trialing':
        return {
          text: 'Free Trial',
          color: 'text-[#2563EB]',
          bgColor: 'bg-blue-50',
        }
      case 'past_due':
        return {
          text: 'Payment Due',
          color: 'text-[#D97706]',
          bgColor: 'bg-orange-50',
        }
      case 'canceled':
        return {
          text: 'Canceled',
          color: 'text-[#DC2626]',
          bgColor: 'bg-red-50',
        }
      default:
        return {
          text: 'Free Account',
          color: 'text-[#6B7280]',
          bgColor: 'bg-gray-100',
        }
    }
  }

  const subscriptionStatus = getSubscriptionStatus()

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EFF6FF] to-white">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#1E3A8A]">Your Dashboard</h1>
              <p className="text-[#6B7280] mt-1">{user.email}</p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={handleLogout}
                isLoading={isLoggingOut}
              >
                Log Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Subscription Status */}
        <Card className="mb-8">
          <CardContent className="py-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${subscriptionStatus.bgColor} ${subscriptionStatus.color}`}
                  >
                    {subscriptionStatus.text}
                  </span>
                </div>
                {subscription && subscription.current_period_end && (
                  <p className="text-[#6B7280]">
                    {subscription.cancel_at_period_end
                      ? 'Cancels on'
                      : 'Renews on'}{' '}
                    {formatDate(subscription.current_period_end)}
                  </p>
                )}
              </div>
              {!subscription || subscription.status !== 'active' ? (
                <Link href="/pricing">
                  <Button size="lg">Start Your Free Trial</Button>
                </Link>
              ) : (
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={handleManageSubscription}
                  isLoading={isLoadingPortal}
                >
                  Manage Subscription
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mb-8">
          <Link href="/#calculator">
            <Button size="lg" className="w-full sm:w-auto">
              Calculate New Withdrawal Amount
            </Button>
          </Link>
        </div>

        {/* Calculations History */}
        <div>
          <h2 className="text-2xl font-bold text-[#1E3A8A] mb-4">
            Your Calculation History
          </h2>

          {calculations.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-[#6B7280] text-lg mb-6">
                  You haven't made any calculations yet.
                </p>
                <Link href="/#calculator">
                  <Button size="lg">Try the Calculator</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {calculations.map((calc) => (
                <Card key={calc.id} variant="result">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <CardTitle className="text-2xl">
                        Recommended Withdrawal: {formatCurrency(calc.withdrawal_amount)}
                      </CardTitle>
                      <span className="text-sm text-[#6B7280]">
                        {formatDate(calc.created_at)}
                      </span>
                    </div>
                    <div className="text-[#6B7280] mt-2">
                      Age: {calc.age} | Savings: {formatCurrency(calc.savings)} |
                      Expenses: {formatCurrency(calc.monthly_expenses)}/mo |
                      Risk: {calc.risk_tolerance}
                    </div>
                    <div className="text-[#2563EB] font-semibold mt-1">
                      Confidence: {calc.confidence}%
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-[#1E3A8A] mb-2">
                        AI Advice
                      </h4>
                      <p className="text-[#4B5563] leading-relaxed">
                        {calc.ai_advice}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#1E3A8A] mb-2">
                        Reasoning
                      </h4>
                      <p className="text-[#4B5563] leading-relaxed">
                        {calc.ai_reasoning}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
