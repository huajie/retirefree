'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

interface AnalyticsEvent {
  id: string
  event_type: string
  page_url: string
  referrer?: string
  user_id?: string
  metadata?: any
  timestamp: string
  device_type?: string
  browser?: string
  os?: string
  traffic_source?: string
  traffic_medium?: string
  session_id?: string
  is_first_page?: boolean
}

interface AnalyticsClientProps {
  pageViews: AnalyticsEvent[]
  affiliateClicks: AnalyticsEvent[]
  calculatorUses: AnalyticsEvent[]
}

export function AnalyticsClient({
  pageViews,
  affiliateClicks,
  calculatorUses,
}: AnalyticsClientProps) {
  // Calculate top affiliate clicks
  const affiliateClickStats = affiliateClicks.reduce((acc, click) => {
    const toolName = click.metadata?.tool_name || 'Unknown'
    if (!acc[toolName]) {
      acc[toolName] = { count: 0, name: toolName }
    }
    acc[toolName].count++
    return acc
  }, {} as Record<string, { count: number; name: string }>)

  const topAffiliateClicks = Object.values(affiliateClickStats)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  // Calculate top pages
  const pageViewStats = pageViews.reduce((acc, view) => {
    const url = view.page_url
    if (!acc[url]) {
      acc[url] = { count: 0, url }
    }
    acc[url].count++
    return acc
  }, {} as Record<string, { count: number; url: string }>)

  const topPages = Object.values(pageViewStats)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  // Calculate device breakdown
  const deviceStats = pageViews.reduce((acc, view) => {
    const device = view.device_type || 'unknown'
    if (!acc[device]) {
      acc[device] = { count: 0, device }
    }
    acc[device].count++
    return acc
  }, {} as Record<string, { count: number; device: string }>)

  const deviceBreakdown = Object.values(deviceStats)
    .sort((a, b) => b.count - a.count)

  // Calculate traffic sources
  const trafficStats = pageViews.reduce((acc, view) => {
    const source = view.traffic_source || 'unknown'
    if (!acc[source]) {
      acc[source] = { count: 0, source }
    }
    acc[source].count++
    return acc
  }, {} as Record<string, { count: number; source: string }>)

  const trafficSources = Object.values(trafficStats)
    .sort((a, b) => b.count - a.count)

  // Calculate bounce rate (sessions with only 1 page view)
  const sessionPageCounts = pageViews.reduce((acc, view) => {
    const sessionId = view.session_id || 'unknown'
    acc[sessionId] = (acc[sessionId] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const totalSessions = Object.keys(sessionPageCounts).length
  const bouncedSessions = Object.values(sessionPageCounts).filter(count => count === 1).length
  const bounceRate = totalSessions > 0 ? ((bouncedSessions / totalSessions) * 100).toFixed(1) : '0'

  // Calculate unique visitors (by session_id or IP)
  const uniqueVisitors = new Set(
    pageViews.map(view => view.session_id || view.id)
  ).size

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EFF6FF] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-[#1E3A8A] mb-8">Analytics Dashboard</h1>

        {/* Summary Stats */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Page Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-[#2563EB]">
                {pageViews.length}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {uniqueVisitors} unique visitors
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bounce Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-[#D97706]">
                {bounceRate}%
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {bouncedSessions} of {totalSessions} sessions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Affiliate Clicks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-[#059669]">
                {affiliateClicks.length}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {pageViews.length > 0
                  ? `${((affiliateClicks.length / pageViews.length) * 100).toFixed(1)}% click rate`
                  : 'No page views yet'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Calculator Uses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-[#7C3AED]">
                {calculatorUses.length}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {pageViews.length > 0
                  ? `${((calculatorUses.length / pageViews.length) * 100).toFixed(1)}% conversion`
                  : 'No page views yet'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Traffic Analysis */}
        <div className="grid gap-6 md:grid-cols-2 mb-6">
          {/* Device Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Device Types</CardTitle>
            </CardHeader>
            <CardContent>
              {deviceBreakdown.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No device data yet
                </p>
              ) : (
                <div className="space-y-3">
                  {deviceBreakdown.map((device) => {
                    const percentage = ((device.count / pageViews.length) * 100).toFixed(1)
                    const deviceIcon = device.device === 'mobile' ? '📱' : device.device === 'tablet' ? '📄' : '💻'
                    return (
                      <div
                        key={device.device}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{deviceIcon}</div>
                          <div>
                            <div className="font-semibold capitalize">{device.device}</div>
                            <div className="text-sm text-gray-500">{percentage}%</div>
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-[#2563EB]">
                          {device.count}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Traffic Sources */}
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
            </CardHeader>
            <CardContent>
              {trafficSources.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No traffic source data yet
                </p>
              ) : (
                <div className="space-y-3">
                  {trafficSources.map((source) => {
                    const percentage = ((source.count / pageViews.length) * 100).toFixed(1)
                    const sourceIcon = source.source === 'organic' ? '🔍' :
                                     source.source === 'social' ? '📱' :
                                     source.source === 'direct' ? '🔗' :
                                     source.source === 'referral' ? '🌐' :
                                     source.source === 'email' ? '📧' : '❓'
                    return (
                      <div
                        key={source.source}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{sourceIcon}</div>
                          <div>
                            <div className="font-semibold capitalize">{source.source}</div>
                            <div className="text-sm text-gray-500">{percentage}%</div>
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-[#059669]">
                          {source.count}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Top Affiliate Clicks */}
          <Card>
            <CardHeader>
              <CardTitle>Top Affiliate Clicks</CardTitle>
            </CardHeader>
            <CardContent>
              {topAffiliateClicks.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No affiliate clicks yet
                </p>
              ) : (
                <div className="space-y-4">
                  {topAffiliateClicks.map((tool, index) => (
                    <div
                      key={tool.name}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl font-bold text-gray-400">
                          #{index + 1}
                        </div>
                        <div>
                          <div className="font-semibold">{tool.name}</div>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-[#059669]">
                        {tool.count}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Top Pages */}
          <Card>
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
            </CardHeader>
            <CardContent>
              {topPages.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No page views yet
                </p>
              ) : (
                <div className="space-y-3">
                  {topPages.map((page, index) => (
                    <div
                      key={page.url}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="text-lg font-bold text-gray-400">
                          #{index + 1}
                        </div>
                        <div className="truncate text-sm">{page.url}</div>
                      </div>
                      <div className="text-lg font-bold text-[#2563EB] ml-4">
                        {page.count}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Affiliate Clicks */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Affiliate Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            {affiliateClicks.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No affiliate clicks yet. Share your affiliate links to start tracking!
              </p>
            ) : (
              <div className="space-y-2">
                {affiliateClicks.slice(0, 10).map((click) => (
                  <div
                    key={click.id}
                    className="flex items-center justify-between p-3 border-b last:border-b-0"
                  >
                    <div>
                      <div className="font-semibold">
                        {click.metadata?.tool_name || 'Unknown Tool'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(click.timestamp).toLocaleString()}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {click.metadata?.location || 'dashboard'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
