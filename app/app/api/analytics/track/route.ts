import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      event_type,
      page_url,
      referrer,
      user_id,
      metadata,
      timestamp,
      session_id,
      device_type,
      browser,
      os,
      screen_width,
      screen_height,
      traffic_source,
      traffic_medium,
      traffic_campaign,
      referrer_domain,
      is_first_page,
      page_load_time,
    } = body

    // Validate required fields
    if (!event_type || !page_url) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Insert tracking event into database
    const { error } = await supabase.from('analytics_events').insert({
      event_type,
      page_url,
      referrer: referrer || null,
      user_id: user_id || null,
      metadata: metadata || {},
      timestamp: timestamp || new Date().toISOString(),
      user_agent: request.headers.get('user-agent') || null,
      ip_address: request.headers.get('x-forwarded-for') ||
                  request.headers.get('x-real-ip') ||
                  'unknown',
      // Enhanced tracking fields
      session_id: session_id || null,
      device_type: device_type || null,
      browser: browser || null,
      os: os || null,
      screen_width: screen_width || null,
      screen_height: screen_height || null,
      traffic_source: traffic_source || null,
      traffic_medium: traffic_medium || null,
      traffic_campaign: traffic_campaign || null,
      referrer_domain: referrer_domain || null,
      is_first_page: is_first_page || false,
      page_load_time: page_load_time || null,
    })

    if (error) {
      console.error('Failed to insert analytics event:', error)
      return NextResponse.json(
        { error: 'Failed to track event' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Analytics tracking error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
