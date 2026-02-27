-- Analytics Events Table
-- Tracks all user interactions and events for analytics

CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type TEXT NOT NULL, -- 'page_view', 'affiliate_click', 'calculator_use', 'signup', etc.
  page_url TEXT NOT NULL,
  referrer TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  metadata JSONB DEFAULT '{}', -- Store additional event data
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_agent TEXT,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_user_id ON analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_timestamp ON analytics_events(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_page_url ON analytics_events(page_url);

-- Index for affiliate click tracking
CREATE INDEX IF NOT EXISTS idx_analytics_events_affiliate_clicks
  ON analytics_events(event_type, timestamp DESC)
  WHERE event_type = 'affiliate_click';

-- Enable Row Level Security
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Policy: Allow inserting events (anonymous or authenticated)
CREATE POLICY "Allow insert analytics events" ON analytics_events
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Users can view their own events
CREATE POLICY "Users can view own events" ON analytics_events
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy: Service role can view all events (for admin dashboard)
CREATE POLICY "Service role can view all events" ON analytics_events
  FOR SELECT
  TO service_role
  USING (true);

-- Policy: Service role can delete old events (for cleanup)
CREATE POLICY "Service role can delete events" ON analytics_events
  FOR DELETE
  TO service_role
  USING (true);

-- Function to get top affiliate clicks
CREATE OR REPLACE FUNCTION get_top_affiliate_clicks(
  days_back INT DEFAULT 30,
  limit_count INT DEFAULT 10
)
RETURNS TABLE (
  tool_name TEXT,
  click_count BIGINT,
  unique_users BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    metadata->>'tool_name' as tool_name,
    COUNT(*) as click_count,
    COUNT(DISTINCT user_id) as unique_users
  FROM analytics_events
  WHERE event_type = 'affiliate_click'
    AND timestamp >= NOW() - (days_back || ' days')::INTERVAL
    AND metadata->>'tool_name' IS NOT NULL
  GROUP BY metadata->>'tool_name'
  ORDER BY click_count DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- Function to get page views summary
CREATE OR REPLACE FUNCTION get_page_views_summary(
  days_back INT DEFAULT 30
)
RETURNS TABLE (
  page_url TEXT,
  view_count BIGINT,
  unique_visitors BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    page_url,
    COUNT(*) as view_count,
    COUNT(DISTINCT COALESCE(user_id::TEXT, ip_address)) as unique_visitors
  FROM analytics_events
  WHERE event_type = 'page_view'
    AND timestamp >= NOW() - (days_back || ' days')::INTERVAL
  GROUP BY page_url
  ORDER BY view_count DESC;
END;
$$ LANGUAGE plpgsql;

-- Function to get conversion funnel
CREATE OR REPLACE FUNCTION get_conversion_funnel(
  days_back INT DEFAULT 30
)
RETURNS TABLE (
  step TEXT,
  count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 'page_views' as step,
         COUNT(DISTINCT COALESCE(user_id::TEXT, ip_address))::BIGINT as count
  FROM analytics_events
  WHERE event_type = 'page_view'
    AND timestamp >= NOW() - (days_back || ' days')::INTERVAL
  UNION ALL
  SELECT 'calculator_uses' as step,
         COUNT(DISTINCT COALESCE(user_id::TEXT, ip_address))::BIGINT as count
  FROM analytics_events
  WHERE event_type = 'calculator_use'
    AND timestamp >= NOW() - (days_back || ' days')::INTERVAL
  UNION ALL
  SELECT 'signups' as step,
         COUNT(DISTINCT user_id)::BIGINT as count
  FROM analytics_events
  WHERE event_type = 'signup'
    AND timestamp >= NOW() - (days_back || ' days')::INTERVAL
  UNION ALL
  SELECT 'subscriptions' as step,
         COUNT(DISTINCT user_id)::BIGINT as count
  FROM analytics_events
  WHERE event_type = 'subscription_purchase'
    AND timestamp >= NOW() - (days_back || ' days')::INTERVAL;
END;
$$ LANGUAGE plpgsql;

-- Comments for documentation
COMMENT ON TABLE analytics_events IS 'Tracks all user interactions and events for analytics';
COMMENT ON COLUMN analytics_events.event_type IS 'Type of event: page_view, affiliate_click, calculator_use, signup, subscription_purchase, etc.';
COMMENT ON COLUMN analytics_events.metadata IS 'Additional event data stored as JSON';
COMMENT ON FUNCTION get_top_affiliate_clicks IS 'Returns top clicked affiliate links with click counts and unique users';
COMMENT ON FUNCTION get_page_views_summary IS 'Returns page view statistics';
COMMENT ON FUNCTION get_conversion_funnel IS 'Returns conversion funnel statistics';
