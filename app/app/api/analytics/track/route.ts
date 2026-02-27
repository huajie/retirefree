import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { event_type, page_url, referrer, user_id, metadata, timestamp } = body

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
