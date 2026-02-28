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
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  -- Enhanced tracking fields
  session_id TEXT, -- Session identifier
  device_type TEXT, -- 'mobile', 'tablet', 'desktop'
  browser TEXT, -- Browser name
  os TEXT, -- Operating system
  screen_width INT, -- Screen width in pixels
  screen_height INT, -- Screen height in pixels
  traffic_source TEXT, -- 'organic', 'direct', 'social', 'referral', 'email', 'paid'
  traffic_medium TEXT, -- 'search', 'cpc', 'social', etc.
  traffic_campaign TEXT, -- Campaign name (from UTM)
  referrer_domain TEXT, -- Domain of referrer
  is_first_page BOOLEAN DEFAULT false, -- First page of session
  page_load_time INT -- Page load time in milliseconds
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

-- Indexes for enhanced tracking
CREATE INDEX IF NOT EXISTS idx_analytics_events_session_id ON analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_device_type ON analytics_events(device_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_traffic_source ON analytics_events(traffic_source);
CREATE INDEX IF NOT EXISTS idx_analytics_events_is_first_page
  ON analytics_events(is_first_page)
  WHERE is_first_page = true;

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

-- Function to get traffic sources breakdown
CREATE OR REPLACE FUNCTION get_traffic_sources(
  days_back INT DEFAULT 30
)
RETURNS TABLE (
  source TEXT,
  medium TEXT,
  visitors BIGINT,
  page_views BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    traffic_source as source,
    traffic_medium as medium,
    COUNT(DISTINCT COALESCE(user_id::TEXT, ip_address))::BIGINT as visitors,
    COUNT(*)::BIGINT as page_views
  FROM analytics_events
  WHERE event_type = 'page_view'
    AND timestamp >= NOW() - (days_back || ' days')::INTERVAL
    AND traffic_source IS NOT NULL
  GROUP BY traffic_source, traffic_medium
  ORDER BY page_views DESC;
END;
$$ LANGUAGE plpgsql;

-- Function to get device breakdown
CREATE OR REPLACE FUNCTION get_device_breakdown(
  days_back INT DEFAULT 30
)
RETURNS TABLE (
  device TEXT,
  visitors BIGINT,
  page_views BIGINT,
  percentage NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  WITH device_stats AS (
    SELECT
      device_type,
      COUNT(DISTINCT COALESCE(user_id::TEXT, ip_address))::BIGINT as visitors,
      COUNT(*)::BIGINT as page_views
    FROM analytics_events
    WHERE event_type = 'page_view'
      AND timestamp >= NOW() - (days_back || ' days')::INTERVAL
      AND device_type IS NOT NULL
    GROUP BY device_type
  ),
  total AS (
    SELECT SUM(page_views) as total_views FROM device_stats
  )
  SELECT
    ds.device_type as device,
    ds.visitors,
    ds.page_views,
    ROUND((ds.page_views::NUMERIC / t.total_views::NUMERIC) * 100, 2) as percentage
  FROM device_stats ds, total t
  ORDER BY ds.page_views DESC;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate bounce rate
CREATE OR REPLACE FUNCTION get_bounce_rate(
  days_back INT DEFAULT 30
)
RETURNS TABLE (
  total_sessions BIGINT,
  bounced_sessions BIGINT,
  bounce_rate NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  WITH session_stats AS (
    SELECT
      session_id,
      COUNT(*) as page_count
    FROM analytics_events
    WHERE event_type = 'page_view'
      AND timestamp >= NOW() - (days_back || ' days')::INTERVAL
      AND session_id IS NOT NULL
    GROUP BY session_id
  )
  SELECT
    COUNT(*)::BIGINT as total_sessions,
    COUNT(*) FILTER (WHERE page_count = 1)::BIGINT as bounced_sessions,
    ROUND((COUNT(*) FILTER (WHERE page_count = 1)::NUMERIC / COUNT(*)::NUMERIC) * 100, 2) as bounce_rate
  FROM session_stats;
END;
$$ LANGUAGE plpgsql;

-- Function to get average session duration
CREATE OR REPLACE FUNCTION get_avg_session_duration(
  days_back INT DEFAULT 30
)
RETURNS TABLE (
  avg_duration_seconds NUMERIC,
  median_duration_seconds NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  WITH session_durations AS (
    SELECT
      session_id,
      EXTRACT(EPOCH FROM (MAX(timestamp) - MIN(timestamp))) as duration_seconds
    FROM analytics_events
    WHERE event_type = 'page_view'
      AND timestamp >= NOW() - (days_back || ' days')::INTERVAL
      AND session_id IS NOT NULL
    GROUP BY session_id
    HAVING COUNT(*) > 1 -- Exclude single-page sessions
  )
  SELECT
    ROUND(AVG(duration_seconds)::NUMERIC, 2) as avg_duration_seconds,
    PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY duration_seconds) as median_duration_seconds
  FROM session_durations;
END;
$$ LANGUAGE plpgsql;

-- Comments for documentation
COMMENT ON TABLE analytics_events IS 'Tracks all user interactions and events for analytics';
COMMENT ON COLUMN analytics_events.event_type IS 'Type of event: page_view, affiliate_click, calculator_use, signup, subscription_purchase, etc.';
COMMENT ON COLUMN analytics_events.metadata IS 'Additional event data stored as JSON';
COMMENT ON COLUMN analytics_events.device_type IS 'Device type: mobile, tablet, or desktop';
COMMENT ON COLUMN analytics_events.traffic_source IS 'Traffic source: organic, direct, social, referral, email, paid';
COMMENT ON COLUMN analytics_events.session_id IS 'Unique session identifier for tracking user sessions';
COMMENT ON FUNCTION get_top_affiliate_clicks IS 'Returns top clicked affiliate links with click counts and unique users';
COMMENT ON FUNCTION get_page_views_summary IS 'Returns page view statistics';
COMMENT ON FUNCTION get_conversion_funnel IS 'Returns conversion funnel statistics';
COMMENT ON FUNCTION get_traffic_sources IS 'Returns breakdown of traffic by source and medium';
COMMENT ON FUNCTION get_device_breakdown IS 'Returns visitor breakdown by device type with percentages';
COMMENT ON FUNCTION get_bounce_rate IS 'Returns bounce rate (percentage of single-page sessions)';
COMMENT ON FUNCTION get_avg_session_duration IS 'Returns average and median session duration in seconds';
