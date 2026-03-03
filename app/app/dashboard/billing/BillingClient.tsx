'use client'

import { useState } from 'react'
import { User } from '@supabase/supabase-js'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import Link from 'next/link'

interface Subscription {
  id: string
  user_id: string
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  status: string
  current_period_end: string | null
  cancel_at_period_end: boolean | null
}

interface BillingClientProps {
  user: User
  subscription: Subscription | null
}

export default function BillingClient({ user, subscription }: BillingClientProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCancelSubscription = async () => {
    if (!confirm('Are you sure you want to cancel your subscription? You will still have access until the end of your billing period.')) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/cancel-subscription', {
        method: 'POST',
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to cancel subscription')
      }

      window.location.reload()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdatePaymentMethod = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/update-payment-method', {
        method: 'POST',
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to create session')
      }

      const { url } = await response.json()
      window.location.href = url
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      active: { label: 'Active', variant: 'default' },
      trialing: { label: 'Trial', variant: 'secondary' },
      past_due: { label: 'Past Due', variant: 'destructive' },
      canceled: { label: 'Canceled', variant: 'outline' },
      incomplete: { label: 'Incomplete', variant: 'outline' },
      inactive: { label: 'Inactive', variant: 'outline' },
    }

    const { label, variant } = statusMap[status] || { label: status, variant: 'outline' as const }
    return <Badge variant={variant}>{label}</Badge>
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="mb-6">
        <Link href="/dashboard" className="text-blue-600 hover:underline">
          ← Back to Dashboard
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-2">Billing & Subscription</h1>
      <p className="text-gray-600 mb-8">Manage your RetireFree subscription and payment methods</p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="grid gap-6">
        {/* Subscription Status */}
        <Card>
          <CardHeader>
            <CardTitle>Subscription Status</CardTitle>
            <CardDescription>Your current subscription details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {subscription && subscription.status !== 'inactive' ? (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status</span>
                  {getStatusBadge(subscription.status)}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Plan</span>
                  <span className="font-medium">RetireFree Pro - $15/month</span>
                </div>
                {subscription.current_period_end && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">
                      {subscription.cancel_at_period_end ? 'Access until' : 'Next billing date'}
                    </span>
                    <span className="font-medium">{formatDate(subscription.current_period_end)}</span>
                  </div>
                )}
                {subscription.cancel_at_period_end && (
                  <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded">
                    Your subscription will be canceled at the end of the current billing period.
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">You don't have an active subscription</p>
                <Link href="/pricing">
                  <Button>View Plans</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payment Method */}
        {subscription && subscription.status !== 'inactive' && (
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Update your payment information</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleUpdatePaymentMethod}
                disabled={loading}
                variant="outline"
              >
                {loading ? 'Loading...' : 'Update Payment Method'}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Cancel Subscription */}
        {subscription && subscription.status !== 'inactive' && !subscription.cancel_at_period_end && (
          <Card>
            <CardHeader>
              <CardTitle>Cancel Subscription</CardTitle>
              <CardDescription>
                Cancel your subscription. You'll still have access until the end of your billing period.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleCancelSubscription}
                disabled={loading}
                variant="destructive"
              >
                {loading ? 'Processing...' : 'Cancel Subscription'}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Billing Information */}
        <Card>
          <CardHeader>
            <CardTitle>Billing Information</CardTitle>
            <CardDescription>Your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Email</span>
              <span className="font-medium">{user.email}</span>
            </div>
            {subscription?.stripe_customer_id && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Customer ID</span>
                <span className="font-mono text-sm">{subscription.stripe_customer_id}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
