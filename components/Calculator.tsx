'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { calculatorSchema, type CalculatorInput } from '@/lib/utils/validations'
import type { AIResponse } from '@/types'
import { createClient } from '@/lib/supabase/client'

export function Calculator() {
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)

  const [formData, setFormData] = useState<CalculatorInput>({
    currentAge: 67,
    savingsAmount: 600000,
    monthlyExpenses: 4000,
    riskTolerance: 'medium',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<AIResponse | null>(null)

  // Check if user is logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    checkUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setResult(null)

    // Validate inputs
    const validation = calculatorSchema.safeParse(formData)
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {}
      validation.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message
        }
      })
      setErrors(fieldErrors)
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to calculate')
      }

      if (data.success && data.data) {
        setResult(data.data)

        // Save to database if user is logged in
        if (user) {
          try {
            const { error: dbError } = await supabase
              .from('calculations')
              .insert({
                user_id: user.id,
                age: formData.currentAge,
                savings: formData.savingsAmount,
                monthly_expenses: formData.monthlyExpenses,
                risk_tolerance: formData.riskTolerance,
                withdrawal_amount: data.data.withdrawalAmount,
                ai_advice: data.data.advice,
                ai_reasoning: data.data.reasoning,
                ai_provider: data.data.provider || 'deepseek',
                confidence: data.data.confidence,
              })

            if (dbError) {
              console.error('Failed to save calculation:', dbError)
              // Don't show error to user, just log it
            }
          } catch (saveError) {
            console.error('Error saving calculation:', saveError)
          }
        }
      } else {
        throw new Error(data.error || 'Unexpected response format')
      }
    } catch (error) {
      console.error('Calculation error:', error)
      setErrors({
        submit: error instanceof Error ? error.message : 'Failed to calculate. Please try again.'
      })
    } finally {
      setIsLoading(false)
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

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 85) return 'text-[#059669]'
    if (confidence >= 70) return 'text-[#D97706]'
    return 'text-[#DC2626]'
  }

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 85) return 'High Confidence'
    if (confidence >= 70) return 'Moderate Confidence'
    return 'Low Confidence'
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                type="number"
                label="Current Age"
                value={formData.currentAge}
                onChange={(e) => setFormData({ ...formData, currentAge: Number(e.target.value) })}
                error={errors.currentAge}
                helperText="Enter your current age"
                min={18}
                max={100}
              />

              <Input
                type="number"
                label="Total Retirement Savings ($)"
                value={formData.savingsAmount}
                onChange={(e) => setFormData({ ...formData, savingsAmount: Number(e.target.value) })}
                error={errors.savingsAmount}
                helperText="Include all retirement accounts"
                min={1000}
                step={1000}
              />

              <Input
                type="number"
                label="Monthly Expenses ($)"
                value={formData.monthlyExpenses}
                onChange={(e) => setFormData({ ...formData, monthlyExpenses: Number(e.target.value) })}
                error={errors.monthlyExpenses}
                helperText="Your typical monthly spending"
                min={100}
                step={100}
              />

              <div>
                <label className="block text-base font-semibold text-[#111827] mb-2">
                  Risk Tolerance
                </label>
                <select
                  value={formData.riskTolerance}
                  onChange={(e) => setFormData({ ...formData, riskTolerance: e.target.value as 'low' | 'medium' | 'high' })}
                  className="w-full px-4 py-4 text-lg bg-white border-2 border-[#D1D5DB] rounded-md focus:outline-none focus:border-[#2563EB] focus:ring-3 focus:ring-blue-300"
                >
                  <option value="low">Conservative (Low)</option>
                  <option value="medium">Balanced (Medium)</option>
                  <option value="high">Aggressive (High)</option>
                </select>
                <p className="mt-2 text-sm text-[#6B7280]">
                  How do you feel when the market dips?
                </p>
              </div>
            </div>

            {errors.submit && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 flex items-center gap-2">
                  <span>⚠</span>
                  {errors.submit}
                </p>
              </div>
            )}

            <Button type="submit" size="lg" className="w-full" isLoading={isLoading}>
              Show Me the Numbers
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <Card variant="result">
          <CardHeader>
            <CardTitle className="text-center text-4xl mb-4">
              You Can Safely Spend
            </CardTitle>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-[#2563EB] mb-2">
                {formatCurrency(result.withdrawalAmount)}
              </div>
              <div className={`text-xl font-semibold ${getConfidenceColor(result.confidence)}`}>
                {getConfidenceLabel(result.confidence)} ({result.confidence}%)
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold text-[#1E3A8A] text-xl mb-2">AI Advice</h4>
              <p className="text-[#4B5563] text-lg leading-relaxed">
                {result.advice}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-[#1E3A8A] text-xl mb-2">Reasoning</h4>
              <p className="text-[#4B5563] leading-relaxed">
                {result.reasoning}
              </p>
            </div>

            {!user && (
              <div className="pt-6 border-t border-[#93C5FD]">
                <div className="text-center">
                  <p className="text-[#4B5563] mb-4">
                    Like what you see? Save this and get updates every month.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto"
                      onClick={() => router.push('/auth/signup')}
                    >
                      Start Your Free 7-Day Trial
                    </Button>
                    <Button
                      variant="secondary"
                      size="lg"
                      className="w-full sm:w-auto"
                      onClick={() => router.push('/auth/login')}
                    >
                      Log In
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {user && (
              <div className="pt-6 border-t border-[#93C5FD]">
                <div className="text-center">
                  <p className="text-[#059669] font-semibold mb-2">
                    ✓ Saved! Check your dashboard anytime.
                  </p>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full md:w-auto"
                    onClick={() => router.push('/dashboard')}
                  >
                    Go to Dashboard
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
