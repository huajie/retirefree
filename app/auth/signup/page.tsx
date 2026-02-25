'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { signupSchema, type SignupInput } from '@/lib/utils/validations'

export default function SignupPage() {
  const router = useRouter()
  const supabase = createClient()

  const [formData, setFormData] = useState<SignupInput>({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setSuccessMessage('')

    // Validate inputs
    const validation = signupSchema.safeParse(formData)
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
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        throw error
      }

      if (data.user) {
        // Check if email confirmation is required
        if (data.user.identities && data.user.identities.length === 0) {
          setErrors({
            submit: 'Looks like you already have an account. Try logging in instead.',
          })
        } else if (data.user.confirmed_at) {
          // User is confirmed, redirect to dashboard
          setSuccessMessage('Account created successfully! Redirecting...')
          setTimeout(() => router.push('/dashboard'), 1500)
        } else {
          // Email confirmation required
          setSuccessMessage(
            'Nice! Check your email for a confirmation link. (Check spam if you don\'t see it.)'
          )
        }
      }
    } catch (error: any) {
      console.error('Signup error:', error)
      setErrors({
        submit: error.message || 'Failed to create account. Please try again.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EFF6FF] to-white py-16 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#1E3A8A] mb-2">
            Let's Get You Started
          </h1>
          <p className="text-[#4B5563]">
            7-day free trial. No credit card. No BS.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                label="Email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                error={errors.email}
                required
              />

              <Input
                type="password"
                label="Password"
                placeholder="At least 8 characters"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                error={errors.password}
                helperText="Must be at least 8 characters"
                required
              />

              <Input
                type="password"
                label="Confirm Password"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                error={errors.confirmPassword}
                required
              />

              {errors.submit && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-600 text-sm">{errors.submit}</p>
                </div>
              )}

              {successMessage && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-green-600 text-sm">{successMessage}</p>
                </div>
              )}

              <Button type="submit" size="lg" className="w-full" isLoading={isLoading}>
                Create Account
              </Button>

              <p className="text-center text-sm text-[#6B7280]">
                Already have an account?{' '}
                <Link
                  href="/auth/login"
                  className="text-[#2563EB] hover:underline font-semibold"
                >
                  Log in
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-[#6B7280] mt-6">
          By creating an account, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  )
}
