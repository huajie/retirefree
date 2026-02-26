import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
  width: 512,
  height: 512,
}
export const contentType = 'image/png'

// Icon generation
export default function Icon() {
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
          borderRadius: '20%',
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
              fontSize: 280,
              fontWeight: 900,
              color: 'white',
              lineHeight: 1,
              textShadow: '0 4px 12px rgba(0,0,0,0.3)',
            }}
          >
            $
          </div>
          {/* Upward arrow */}
          <div
            style={{
              fontSize: 120,
              color: 'white',
              lineHeight: 1,
              marginTop: -40,
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
