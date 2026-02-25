'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EFF6FF] to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Oops! Something Went Wrong</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-[#4B5563] text-center">
              Don't worry, these things happen. We've logged the error and will look into it.
            </p>
            <div className="flex flex-col gap-3">
              <Button size="lg" className="w-full" onClick={reset}>
                Try Again
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="w-full"
                onClick={() => window.location.href = '/'}
              >
                Go Home
              </Button>
            </div>
            {error.digest && (
              <p className="text-xs text-[#6B7280] text-center mt-4">
                Error ID: {error.digest}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
