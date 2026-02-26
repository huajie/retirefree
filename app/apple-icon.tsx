import { ImageResponse } from 'next/og'

export const size = {
  width: 1024,
  height: 1024,
}

export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #059669 0%, #2563EB 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Dollar sign */}
          <div
            style={{
              fontSize: 560,
              fontWeight: 900,
              color: 'white',
              lineHeight: 1,
              textShadow: '0 8px 24px rgba(0,0,0,0.3)',
            }}
          >
            $
          </div>
          {/* Upward arrow */}
          <div
            style={{
              fontSize: 240,
              color: 'white',
              lineHeight: 1,
              marginTop: -80,
            }}
          >
            ↗
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
