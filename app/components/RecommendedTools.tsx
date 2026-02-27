'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { trackAffiliateClick } from '@/lib/analytics/tracker'
import { createClient } from '@/lib/supabase/client'

const tools = [
  {
    name: 'Wealthfront',
    category: 'Investment Management',
    description: 'Automated retirement portfolio management with tax-loss harvesting',
    benefit: 'Get your first $5,000 managed free',
    url: 'https://wealthfront.com', // Replace with your affiliate link
    icon: '📊'
  },
  {
    name: 'Personal Capital',
    category: 'Financial Planning',
    description: 'Free retirement planning tools and portfolio tracking',
    benefit: 'Track all your accounts in one place',
    url: 'https://personalcapital.com', // Replace with your affiliate link
    icon: '💼'
  },
  {
    name: 'Vanguard',
    category: 'Low-Cost Investing',
    description: 'Low-fee index funds and retirement accounts',
    benefit: 'Lowest expense ratios in the industry',
    url: 'https://vanguard.com', // Replace with your affiliate link
    icon: '🏦'
  },
  {
    name: 'Fidelity',
    category: 'Retirement Planning',
    description: 'Comprehensive retirement planning with free advisory',
    benefit: 'Zero account fees, excellent research tools',
    url: 'https://fidelity.com', // Replace with your affiliate link
    icon: '🎯'
  }
]

export function RecommendedTools() {
  const [userId, setUserId] = useState<string | undefined>(undefined)
  const supabase = createClient()

  useEffect(() => {
    // Get current user ID for tracking
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id)
    })
  }, [supabase])

  const handleToolClick = async (tool: typeof tools[0]) => {
    // Track the affiliate click
    await trackAffiliateClick(
      tool.name,
      tool.url,
      userId,
      'dashboard' // Location where click occurred
    )

    // Open affiliate link in new tab
    window.open(tool.url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Recommended Tools</h2>
        <p className="text-gray-600">
          These tools complement RetireFree and help optimize your retirement strategy.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {tools.map((tool) => (
          <Card key={tool.name} className="p-6">
            <div className="flex items-start gap-4">
              <div className="text-3xl">{tool.icon}</div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{tool.name}</h3>
                    <p className="text-sm text-gray-500">{tool.category}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-3">
                  {tool.description}
                </p>

                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                  <p className="text-sm text-green-800 font-medium">
                    ✓ {tool.benefit}
                  </p>
                </div>

                <Button
                  onClick={() => handleToolClick(tool)}
                  className="w-full"
                >
                  Learn More →
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-xs text-gray-500 text-center">
        * RetireFree may earn a commission from these partners at no cost to you.
      </div>
    </div>
  )
}
