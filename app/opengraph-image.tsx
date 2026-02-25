import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'RetireFree - AI-Powered Retirement Planning'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#EFF6FF',
          backgroundImage: 'linear-gradient(to bottom, #EFF6FF, #DBEAFE)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              color: '#1E3A8A',
              marginBottom: 30,
              lineHeight: 1.2,
              maxWidth: '900px',
            }}
          >
            Finally, Stop Worrying About Running Out of Money
          </div>
          <div
            style={{
              fontSize: 36,
              color: '#4B5563',
              marginBottom: 40,
              maxWidth: '800px',
              lineHeight: 1.4,
            }}
          >
            AI-powered retirement withdrawal calculator for just $15/month
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
            }}
          >
            <div
              style={{
                fontSize: 28,
                fontWeight: 'bold',
                color: '#2563EB',
                backgroundColor: 'white',
                padding: '20px 40px',
                borderRadius: 12,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              Try Free Calculator
            </div>
            <div
              style={{
                fontSize: 24,
                color: '#6B7280',
              }}
            >
              No signup required
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
