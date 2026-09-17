export interface OgCardProps {
  title: string
  tagline?: string
  description: string
}

export function OgCard({ title, tagline, description }: OgCardProps) {
  return (
    <div
      style={{
        background: '#000000',
        width: '1200px',
        height: '630px',
        display: 'flex',
        flexDirection: 'column',
        padding: '64px 80px 52px 88px',
        position: 'relative',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Left accent bar */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '6px',
          height: '100%',
          background: '#C8F13F',
          display: 'flex',
        }}
      />

      {/* Decorative diamonds top-right */}
      <div
        style={{
          position: 'absolute',
          right: '72px',
          top: '52px',
          width: '80px',
          height: '80px',
          border: '2px solid rgba(200,241,63,0.25)',
          transform: 'rotate(45deg)',
          display: 'flex',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: '112px',
          top: '92px',
          width: '160px',
          height: '160px',
          border: '1px solid rgba(200,241,63,0.1)',
          transform: 'rotate(45deg)',
          display: 'flex',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: '60px',
          top: '40px',
          width: '16px',
          height: '16px',
          background: '#C8F13F',
          transform: 'rotate(45deg)',
          display: 'flex',
          opacity: 0.6,
        }}
      />

      {/* Logo row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div
          style={{
            width: '26px',
            height: '26px',
            background: '#C8F13F',
            transform: 'rotate(45deg)',
            display: 'flex',
            flexShrink: 0,
          }}
        />
        <span
          style={{
            color: '#FFFFFF',
            fontSize: '20px',
            fontWeight: '700',
            letterSpacing: '5px',
            marginLeft: '8px',
          }}
        >
          AWARIZON
        </span>
      </div>

      {/* Spacer */}
      <div style={{ flex: 1, display: 'flex' }} />

      {/* Main content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '860px' }}>
        {tagline && (
          <span
            style={{
              color: '#C8F13F',
              fontSize: '13px',
              fontWeight: '600',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              display: 'flex',
            }}
          >
            {tagline}
          </span>
        )}
        <div
          style={{
            color: '#FFFFFF',
            fontSize: title.length > 36 ? '46px' : '56px',
            fontWeight: '800',
            lineHeight: 1.08,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {title}
        </div>
        <div
          style={{
            color: '#888888',
            fontSize: '21px',
            lineHeight: 1.45,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {description}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '40px',
          paddingTop: '20px',
          borderTop: '1px solid #1f1f1f',
        }}
      >
        <span style={{ color: '#555555', fontSize: '15px', display: 'flex' }}>awarizon.com</span>
        <span
          style={{
            color: '#C8F13F',
            fontSize: '13px',
            letterSpacing: '2.5px',
            display: 'flex',
          }}
        >
          NIGERIA · WEST AFRICA
        </span>
      </div>
    </div>
  )
}
