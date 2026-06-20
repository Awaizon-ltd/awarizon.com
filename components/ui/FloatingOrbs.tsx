// Zero-JS ambient background orbs — pure CSS float animation
// Place inside a `relative overflow-hidden` container

interface Orb {
  w: number; h: number
  left: string; top: string
  delay: string; duration: string
  opacity: number
}

const DEFAULT_ORBS: Orb[] = [
  { w: 520, h: 400, left: '-8%',  top: '5%',  delay: '0s',   duration: '9s',  opacity: 0.055 },
  { w: 340, h: 280, left: '58%',  top: '38%', delay: '2.2s', duration: '12s', opacity: 0.04  },
  { w: 270, h: 230, left: '22%',  top: '62%', delay: '4.5s', duration: '14s', opacity: 0.035 },
  { w: 400, h: 320, left: '70%',  top: '2%',  delay: '1.5s', duration: '10s', opacity: 0.045 },
]

export default function FloatingOrbs({
  orbs = DEFAULT_ORBS,
  color = '255,229,0',
  className = '',
}: {
  orbs?: Orb[]
  color?: string
  className?: string
}) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {orbs.map((o, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width:      o.w,
            height:     o.h,
            left:       o.left,
            top:        o.top,
            background: `radial-gradient(circle, rgba(${color},${o.opacity}) 0%, transparent 70%)`,
            filter:     'blur(55px)',
            animation:  `float ${o.duration} ease-in-out ${o.delay} infinite`,
          }}
        />
      ))}
    </div>
  )
}
