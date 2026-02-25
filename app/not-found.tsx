import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EFF6FF] to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-6xl mb-4">404</CardTitle>
            <CardTitle className="text-center">Page Not Found</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-[#4B5563] text-center">
              Looks like this page took an early retirement. Let's get you back on track.
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/" className="w-full">
                <Button size="lg" className="w-full">
                  Go Home
                </Button>
              </Link>
              <Link href="/#calculator" className="w-full">
                <Button variant="secondary" size="lg" className="w-full">
                  Try Calculator
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
