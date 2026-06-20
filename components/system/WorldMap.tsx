'use client'

import { useEffect, useState } from 'react'
import { ComposableMap, Geographies, Geography, Marker, Line } from 'react-simple-maps'

// TopoJSON from world-atlas CDN — countries at 110m resolution
const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

// ── City markers (real lat/lng coordinates) ────────────────────────────────────
const CITIES = [
  { id: 'lagos',    name: 'Lagos',         country: 'Nigeria',   lat:  6.5,  lng:   3.4,  primary: false },
  { id: 'accra',    name: 'Accra',         country: 'Ghana',     lat:  5.6,  lng:  -0.2,  primary: true  },
  { id: 'nairobi',  name: 'Nairobi',       country: 'Kenya',     lat: -1.3,  lng:  36.8,  primary: false },
  { id: 'joburg',   name: 'Johannesburg',  country: 'S. Africa', lat:-26.2,  lng:  28.0,  primary: false },
  { id: 'london',   name: 'London',        country: 'UK',        lat: 51.5,  lng:  -0.1,  primary: false },
  { id: 'paris',    name: 'Paris',         country: 'France',    lat: 48.9,  lng:   2.4,  primary: false },
  { id: 'berlin',   name: 'Berlin',        country: 'Germany',   lat: 52.5,  lng:  13.4,  primary: false },
  { id: 'dubai',    name: 'Dubai',         country: 'UAE',       lat: 25.2,  lng:  55.3,  primary: false },
  { id: 'singapore',name: 'Singapore',     country: 'SG',        lat:  1.3,  lng: 103.8,  primary: false },
  { id: 'sydney',   name: 'Sydney',        country: 'Australia', lat:-33.9,  lng: 151.2,  primary: false },
  { id: 'nyc',      name: 'New York',      country: 'USA',       lat: 40.7,  lng: -74.0,  primary: true  },
  { id: 'sf',       name: 'San Francisco', country: 'USA',       lat: 37.8,  lng:-122.4,  primary: false },
  { id: 'toronto',  name: 'Toronto',       country: 'Canada',    lat: 43.7,  lng: -79.4,  primary: false },
  { id: 'saopaulo', name: 'São Paulo',     country: 'Brazil',    lat:-23.5,  lng: -46.6,  primary: false },
]

// ── Active route connections ───────────────────────────────────────────────────
const ROUTES = [
  { from: 'nyc',      to: 'london'    },
  { from: 'nyc',      to: 'saopaulo'  },
  { from: 'london',   to: 'dubai'     },
  { from: 'london',   to: 'accra'     },
  { from: 'dubai',    to: 'singapore' },
  { from: 'singapore',to: 'sydney'    },
  { from: 'lagos',    to: 'london'    },
  { from: 'nairobi',  to: 'dubai'     },
]

function getCity(id: string) {
  return CITIES.find(c => c.id === id)!
}

// ── Component ──────────────────────────────────────────────────────────────────
export default function WorldMap({ className = '' }: { className?: string }) {
  const [activeCity, setActiveCity] = useState<string | null>(null)
  const [tick,       setTick]       = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick(t => (t + 1) % CITIES.length), 1800)
    return () => clearInterval(id)
  }, [])

  const activeCityData = activeCity ? getCity(activeCity) : null

  return (
    <div className={`relative bg-[#010101] border border-[#181818] overflow-hidden select-none ${className}`}>

      {/* ── Header ── */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#141414]">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="font-mono text-[10px] tracking-widest text-accent">AWZ // GLOBAL_NETWORK</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-[9px] text-dim">{CITIES.length} NODES</span>
          <span className="font-mono text-[9px] text-green-400 flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse inline-block" />
            LIVE
          </span>
        </div>
      </div>

      {/* ── Map ── */}
      <div className="relative" onMouseLeave={() => setActiveCity(null)}>
        <ComposableMap
          projection="geoNaturalEarth1"
          projectionConfig={{ scale: 153, center: [10, 10] }}
          width={980}
          height={500}
          style={{ width: '100%', height: 'auto', display: 'block', background: '#050508' }}
        >
          {/* Ocean background */}
          <rect x="0" y="0" width="980" height="500" fill="#050508" />

          {/* Lat/lng grid lines */}
          {[-60, -30, 0, 30, 60].map(lat => (
            <Line
              key={`lat-${lat}`}
              from={[-180, lat]} to={[180, lat]}
              stroke="#FFE500" strokeWidth={0.3} strokeOpacity={0.04}
            />
          ))}

          {/* Country fills — real TopoJSON outlines */}
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#131318"
                  stroke="#1E1E28"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: 'none' },
                    hover:   { outline: 'none', fill: '#1a1a22' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          {/* Route arcs — dashed animated lines */}
          {ROUTES.map(({ from, to }, i) => {
            const c1   = getCity(from)
            const c2   = getCity(to)
            const isHi = activeCity === from || activeCity === to
            return (
              <Line
                key={`route-${i}`}
                from={[c1.lng, c1.lat]}
                to={[c2.lng, c2.lat]}
                stroke="#FFE500"
                strokeWidth={isHi ? 1.2 : 0.55}
                strokeOpacity={isHi ? 0.7 : 0.14}
                strokeDasharray={isHi ? '6 6' : '3 9'}
                strokeLinecap="round"
                style={{ transition: 'stroke-opacity 0.3s, stroke-width 0.3s' }}
              />
            )
          })}

          {/* City markers */}
          {CITIES.map((city, i) => {
            const isActive  = activeCity === city.id
            const isPulsing = tick % CITIES.length === i
            const r = city.primary ? 4.5 : 3

            return (
              <Marker
                key={city.id}
                coordinates={[city.lng, city.lat]}
                onMouseEnter={() => setActiveCity(city.id)}
                onClick={() => setActiveCity(isActive ? null : city.id)}
              >
                {/* Outer hover ring */}
                {isActive && (
                  <circle r={r + 8} fill="none" stroke="#FFE500" strokeWidth={0.5} strokeOpacity={0.25} />
                )}

                {/* Pulse expand ring (on tick cycle) */}
                {isPulsing && (
                  <circle r={r} fill="none" stroke="#FFE500" strokeWidth={0.8}>
                    <animate attributeName="r"              from={r}     to={r * 7}  dur="1.8s" fill="freeze" />
                    <animate attributeName="opacity"        from="0.7"   to="0"      dur="1.8s" fill="freeze" />
                    <animate attributeName="stroke-width"   from="0.8"   to="0.2"    dur="1.8s" fill="freeze" />
                  </circle>
                )}

                {/* City radius ring */}
                <circle
                  r={r + 3}
                  fill="none"
                  stroke="#FFE500"
                  strokeWidth={0.4}
                  strokeOpacity={isActive ? 0.45 : city.primary ? 0.22 : 0.08}
                  style={{ transition: 'all 0.3s' }}
                />

                {/* Main dot */}
                <circle
                  r={isActive ? r * 1.5 : r}
                  fill={isActive ? '#FFE500' : city.primary ? '#FFE500CC' : '#FFE50077'}
                  style={{
                    transition: 'all 0.3s',
                    filter: isActive ? 'drop-shadow(0 0 5px #FFE500)' : 'none',
                    cursor: 'pointer',
                  }}
                />

                {/* Label — primary cities or active */}
                {(city.primary || isActive) && (
                  <text
                    x={city.lng > 50 ? -8 : 8}
                    y={-(r + 5)}
                    textAnchor={city.lng > 50 ? 'end' : 'start'}
                    fontSize={11}
                    fontFamily="JetBrains Mono, monospace"
                    fill={isActive ? '#FFE500' : '#FFE50088'}
                    style={{ transition: 'all 0.3s', userSelect: 'none', pointerEvents: 'none' }}
                  >
                    {city.name}
                  </text>
                )}
              </Marker>
            )
          })}
        </ComposableMap>

        {/* City tooltip */}
        {activeCityData && (
          <div
            className="absolute bottom-3 left-4 bg-black/96 border border-accent/30 px-4 py-3 pointer-events-none"
            style={{ backdropFilter: 'blur(10px)' }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-[9px] text-accent tracking-widest">NODE_ACTIVE</span>
            </div>
            <p className="font-display font-semibold text-white text-sm">{activeCityData.name}</p>
            <p className="font-mono text-[9px] text-dim mt-0.5">{activeCityData.country}</p>
            <p className="font-mono text-[9px] text-dim/50 mt-0.5">
              {Math.abs(activeCityData.lat).toFixed(1)}°{activeCityData.lat >= 0 ? 'N' : 'S'}{' '}
              {Math.abs(activeCityData.lng).toFixed(1)}°{activeCityData.lng >= 0 ? 'E' : 'W'}
            </p>
          </div>
        )}
      </div>

      {/* ── Legend ── */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-[#141414] flex-wrap gap-2">
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-accent" />
            <span className="font-mono text-[9px] text-dim">PRIMARY MARKET</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent opacity-40" />
            <span className="font-mono text-[9px] text-dim">SIGNAL NODE</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-6 border-t border-dashed border-accent/40" />
            <span className="font-mono text-[9px] text-dim">ACTIVE ROUTE</span>
          </div>
        </div>
        <span className="font-mono text-[9px] text-dim/40">HOVER TO INSPECT</span>
      </div>
    </div>
  )
}
