'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { loginSchema, type LoginInput } from '@/lib/utils/validations'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()

  const [formData, setFormData] = useState<LoginInput>({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    // Validate inputs
    const validation = loginSchema.safeParse(formData)
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
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (error) {
        throw error
      }

      if (data.user) {
        // Redirect to dashboard on successful login
        router.push('/dashboard')
        router.refresh()
      }
    } catch (error: any) {
      console.error('Login error:', error)
      setErrors({
        submit:
          error.message === 'Invalid login credentials'
            ? 'Hmm, that email or password doesn\'t look right. Double-check and try again?'
            : error.message || 'Something went wrong. Give it another shot.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EFF6FF] to-white py-16 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#1E3A8A] mb-2">Welcome Back!</h1>
          <p className="text-[#4B5563]">
            Good to see you again
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Log In</CardTitle>
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
                placeholder="Your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                error={errors.password}
                required
              />

              {errors.submit && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-600 text-sm">{errors.submit}</p>
                </div>
              )}

              <Button type="submit" size="lg" className="w-full" isLoading={isLoading}>
                Log In
              </Button>

              <div className="text-center space-y-2">
                <p className="text-sm text-[#6B7280]">
                  Don't have an account?{' '}
                  <Link
                    href="/auth/signup"
                    className="text-[#2563EB] hover:underline font-semibold"
                  >
                    Sign up
                  </Link>
                </p>
                <p className="text-sm text-[#6B7280]">
                  <Link
                    href="/auth/reset-password"
                    className="text-[#2563EB] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
