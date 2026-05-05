"use client";

import { useEffect, useState } from "react";

/**
 * Equirectangular projection — viewBox 1000 × 500
 * x = (lng + 180) / 360 * 1000
 * y = (90  - lat) / 180 * 500
 */
function proj(lat: number, lng: number) {
  return {
    x: ((lng + 180) / 360) * 1000,
    y: ((90 - lat) / 180) * 500,
  };
}

/* ── City markers (lat, lng from real coordinates) ─────────────────── */
const CITIES = [
  {
    id: "lagos",
    name: "Lagos",
    country: "Nigeria",
    lat: 6.5,
    lng: 3.4,
    primary: true,
  },
  {
    id: "abuja",
    name: "Abuja",
    country: "Nigeria",
    lat: 9.1,
    lng: 7.5,
    primary: false,
  },
  {
    id: "accra",
    name: "Accra",
    country: "Ghana",
    lat: 5.6,
    lng: -0.2,
    primary: true,
  },
  {
    id: "nairobi",
    name: "Nairobi",
    country: "Kenya",
    lat: -1.3,
    lng: 36.8,
    primary: false,
  },
  {
    id: "joburg",
    name: "Johannesburg",
    country: "S. Africa",
    lat: -26.2,
    lng: 28.0,
    primary: false,
  },
  {
    id: "london",
    name: "London",
    country: "UK",
    lat: 51.5,
    lng: -0.1,
    primary: false,
  },
  {
    id: "paris",
    name: "Paris",
    country: "France",
    lat: 48.9,
    lng: 2.4,
    primary: true,
  },
  {
    id: "berlin",
    name: "Berlin",
    country: "Germany",
    lat: 52.5,
    lng: 13.4,
    primary: false,
  },
  {
    id: "dubai",
    name: "Dubai",
    country: "UAE",
    lat: 25.2,
    lng: 55.3,
    primary: false,
  },
  {
    id: "singapore",
    name: "Singapore",
    country: "Singapore",
    lat: 1.3,
    lng: 103.8,
    primary: false,
  },
  {
    id: "sydney",
    name: "Sydney",
    country: "Australia",
    lat: -33.9,
    lng: 151.2,
    primary: true,
  },
  {
    id: "nyc",
    name: "New York",
    country: "USA",
    lat: 40.7,
    lng: -74.0,
    primary: true,
  },
  {
    id: "sf",
    name: "San Francisco",
    country: "USA",
    lat: 37.8,
    lng: -122.4,
    primary: false,
  },
  {
    id: "toronto",
    name: "Toronto",
    country: "Canada",
    lat: 43.7,
    lng: -79.4,
    primary: false,
  },
  {
    id: "saopaulo",
    name: "São Paulo",
    country: "Brazil",
    lat: -23.5,
    lng: -46.6,
    primary: false,
  },
].map((c) => ({ ...c, ...proj(c.lat, c.lng) }));

/* ── Connection routes ──────────────────────────────────────────────── */
const ROUTES = [
  { from: "lagos", to: "nyc" },
  { from: "lagos", to: "london" },
  { from: "lagos", to: "dubai" },
  { from: "accra", to: "paris" },
  { from: "lagos", to: "sydney" },
  { from: "nyc", to: "london" },
  { from: "lagos", to: "singapore" },
  { from: "lagos", to: "joburg" },
];

/* ── Continent outlines (simplified equirectangular 1000×500) ───────── */
const CONTINENTS = [
  {
    id: "na",
    d: `M 60,65 C 90,45 130,35 160,40 L 190,30 L 250,25 L 310,22 L 370,28
        L 420,38 L 460,55 L 465,80 L 455,110 L 450,155 L 415,168 L 400,188
        L 375,220 L 345,248 L 320,265 L 295,270 L 278,265 L 265,255
        L 255,250 L 240,250 L 220,248 L 205,235 L 195,218 L 185,202
        L 188,185 L 192,162 L 178,145 L 165,125 L 138,98 L 100,78 L 65,72 Z`,
  },
  {
    id: "gl",
    d: `M 345,20 C 375,5 415,2 440,12 L 455,30 L 450,52 L 420,60
        L 385,62 L 355,52 L 342,35 Z`,
  },
  {
    id: "ca",
    d: `M 240,252 L 265,248 L 282,258 L 292,272 L 278,280
        L 260,278 L 245,268 Z`,
  },
  {
    id: "sa",
    d: `M 278,282 C 310,262 355,255 388,262 L 408,278 L 418,308
        L 415,345 L 400,395 L 378,438 L 345,468 L 310,478
        L 278,472 L 254,448 L 238,415 L 232,378 L 235,338
        L 248,302 L 265,284 Z`,
  },
  {
    id: "eu",
    d: `M 440,75 C 468,62 500,58 540,58 L 572,60 L 600,68 L 618,82
        L 622,100 L 610,118 L 592,128 L 572,134 L 545,138
        L 520,135 L 496,140 L 470,132 L 450,118 L 438,100 Z`,
  },
  {
    id: "sc",
    d: `M 488,42 C 508,28 535,22 558,30 L 565,50 L 558,68
        L 540,78 L 510,80 L 492,68 L 488,52 Z`,
  },
  {
    id: "uk",
    d: `M 452,85 L 472,74 L 485,82 L 490,98 L 478,106
        L 460,102 L 450,92 Z`,
  },
  {
    id: "af",
    d: `M 428,152 C 470,140 525,138 572,142 L 618,150 L 655,165
        L 672,195 L 678,228 L 670,268 L 652,312 L 628,358
        L 600,402 L 572,440 L 542,462 L 508,468 L 476,462
        L 448,438 L 428,408 L 412,368 L 405,322 L 408,275
        L 415,228 L 420,192 L 426,168 Z`,
  },
  {
    id: "mg",
    d: `M 598,298 L 615,282 L 628,305 L 622,345 L 605,358 L 592,335 Z`,
  },
  {
    id: "me",
    d: `M 558,148 C 595,138 638,138 672,148 L 695,165 L 705,192
        L 698,225 L 672,242 L 638,248 L 598,238 L 568,215
        L 555,188 L 555,165 Z`,
  },
  {
    id: "ru",
    d: `M 438,40 C 510,20 620,10 730,12 L 840,18 L 930,28
        L 968,42 L 972,68 L 935,88 L 875,95 L 800,98
        L 728,102 L 668,108 L 610,112 L 572,105 L 545,90
        L 510,68 L 472,55 L 440,50 Z`,
  },
  {
    id: "ca2",
    d: `M 572,105 L 655,98 L 740,100 L 800,115 L 808,140
        L 778,158 L 730,168 L 678,168 L 635,158 L 598,148
        L 568,130 Z`,
  },
  {
    id: "in",
    d: `M 638,148 L 712,138 L 748,158 L 762,192 L 752,232
        L 722,265 L 688,272 L 655,262 L 632,238 L 618,205
        L 622,172 Z`,
  },
  {
    id: "sea",
    d: `M 742,152 L 808,140 L 848,155 L 858,188 L 838,218
        L 802,228 L 762,222 L 742,198 Z`,
  },
  {
    id: "ea",
    d: `M 668,98 L 808,72 L 890,78 L 942,92 L 950,122
        L 918,152 L 868,162 L 812,158 L 768,155 L 732,158
        L 700,148 L 672,128 Z`,
  },
  {
    id: "jp",
    d: `M 912,92 L 945,80 L 962,95 L 958,120 L 928,130 L 910,112 Z`,
  },
  {
    id: "id",
    d: `M 755,228 L 832,215 L 875,222 L 885,248 L 852,260
        L 798,258 L 762,248 Z`,
  },
  {
    id: "au",
    d: `M 752,292 C 808,272 882,268 942,278 L 972,302 L 978,345
        L 965,392 L 930,428 L 885,442 L 828,445 L 778,432
        L 738,402 L 718,358 L 725,318 Z`,
  },
  {
    id: "nz",
    d: `M 955,368 L 972,352 L 985,368 L 982,398 L 962,405 L 950,385 Z`,
  },
];

/* ── Arc helper ─────────────────────────────────────────────────────── */
function arcPath(x1: number, y1: number, x2: number, y2: number): string {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const pull = len * 0.28;
  const nx = -dy / len;
  const ny = dx / len;
  return `M ${x1} ${y1} Q ${mx + nx * pull} ${my + ny * pull} ${x2} ${y2}`;
}

function getCity(id: string) {
  return CITIES.find((c) => c.id === id)!;
}

/* ── Component ─────────────────────────────────────────────────────── */
export default function WorldMap({ className = "" }: { className?: string }) {
  const [activeCity, setActiveCity] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => (t + 1) % CITIES.length), 1800);
    return () => clearInterval(id);
  }, []);

  const activeCityData = activeCity ? getCity(activeCity) : null;

  return (
    <div
      className={`relative bg-[#010101] border border-[#181818] overflow-hidden select-none ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#141414]">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="font-mono text-[10px] tracking-widest text-accent">
            AWZ // GLOBAL_NETWORK
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-[9px] text-dim">
            {CITIES.length} NODES
          </span>
          <span className="font-mono text-[9px] text-green-400 flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse inline-block" />
            LIVE
          </span>
        </div>
      </div>

      {/* Map */}
      <div className="relative" onMouseLeave={() => setActiveCity(null)}>
        <svg
          viewBox="0 0 1000 500"
          className="w-full"
          style={{ display: "block" }}
        >
          {/* Ocean */}
          <rect width="1000" height="500" fill="#050508" />

          {/* Lat/lng grid */}
          {[100, 167, 250, 333, 400].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="1000"
              y2={y}
              stroke="#FFE500"
              strokeWidth="0.4"
              strokeOpacity="0.05"
              strokeDasharray="4 8"
            />
          ))}
          {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((x) => (
            <line
              key={x}
              x1={x}
              y1="0"
              x2={x}
              y2="500"
              stroke="#FFE500"
              strokeWidth="0.4"
              strokeOpacity="0.05"
              strokeDasharray="4 8"
            />
          ))}

          {/* Continents */}
          {CONTINENTS.map((c) => (
            <path
              key={c.id}
              d={c.d}
              fill="#131318"
              stroke="#252530"
              strokeWidth="0.8"
              strokeLinejoin="round"
            />
          ))}

          {/* Route arcs */}
          {ROUTES.map(({ from, to }, i) => {
            const c1 = getCity(from);
            const c2 = getCity(to);
            if (!c1 || !c2) return null;
            const isHi = activeCity === from || activeCity === to;
            const path = arcPath(c1.x, c1.y, c2.x, c2.y);
            return (
              <g key={`arc-${i}`}>
                <path
                  d={path}
                  fill="none"
                  stroke="#FFE500"
                  strokeWidth={isHi ? 1.2 : 0.5}
                  strokeOpacity={isHi ? 0.65 : 0.12}
                  strokeDasharray="4 8"
                  style={{ transition: "all 0.35s ease" }}
                />
                {isHi && (
                  <circle r="2.5" fill="#FFE500" opacity="0.9">
                    <animateMotion
                      dur="2.4s"
                      repeatCount="indefinite"
                      path={path}
                    />
                  </circle>
                )}
              </g>
            );
          })}

          {/* City dots */}
          {CITIES.map((city, i) => {
            const isActive = activeCity === city.id;
            const isPulsing = tick % CITIES.length === i;
            const r = city.primary ? 5 : 3.5;
            return (
              <g
                key={city.id}
                className="cursor-pointer"
                onMouseEnter={() => setActiveCity(city.id)}
                onClick={() => setActiveCity(isActive ? null : city.id)}
              >
                {isPulsing && (
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r={r}
                    fill="none"
                    stroke="#FFE500"
                    strokeWidth="1"
                  >
                    <animate
                      attributeName="r"
                      from={r}
                      to={r * 6}
                      dur="1.8s"
                      fill="freeze"
                    />
                    <animate
                      attributeName="opacity"
                      from="0.7"
                      to="0"
                      dur="1.8s"
                      fill="freeze"
                    />
                    <animate
                      attributeName="stroke-width"
                      from="1"
                      to="0.3"
                      dur="1.8s"
                      fill="freeze"
                    />
                  </circle>
                )}

                {isActive && (
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r={r + 9}
                    fill="none"
                    stroke="#FFE500"
                    strokeWidth="0.6"
                    strokeOpacity="0.3"
                  />
                )}

                <circle
                  cx={city.x}
                  cy={city.y}
                  r={r + 3.5}
                  fill="none"
                  stroke="#FFE500"
                  strokeWidth="0.5"
                  strokeOpacity={isActive ? 0.5 : city.primary ? 0.25 : 0.1}
                  style={{ transition: "all 0.3s" }}
                />

                <circle
                  cx={city.x}
                  cy={city.y}
                  r={isActive ? r * 1.5 : r}
                  fill={
                    isActive
                      ? "#FFE500"
                      : city.primary
                        ? "#FFE500BB"
                        : "#FFE50066"
                  }
                  style={{
                    transition: "all 0.3s",
                    filter: isActive ? "drop-shadow(0 0 6px #FFE500)" : "none",
                  }}
                />

                {(city.primary || isActive) && (
                  <text
                    x={city.x + (city.x > 500 ? -8 : 8)}
                    y={city.y - r - 5}
                    textAnchor={city.x > 500 ? "end" : "start"}
                    fontSize="12"
                    fontFamily="JetBrains Mono, monospace"
                    fontWeight={isActive ? "500" : "400"}
                    fill={isActive ? "#FFE500" : "#FFE50088"}
                    style={{ transition: "all 0.3s", userSelect: "none" }}
                  >
                    {city.name}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {activeCityData && (
          <div
            className="absolute bottom-3 left-4 bg-black/96 border border-accent/30 px-4 py-3 pointer-events-none"
            style={{ backdropFilter: "blur(10px)" }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-[9px] text-accent tracking-widest">
                NODE_ACTIVE
              </span>
            </div>
            <p className="font-display font-semibold text-white text-sm">
              {activeCityData.name}
            </p>
            <p className="font-mono text-[9px] text-dim mt-0.5">
              {activeCityData.country}
            </p>
            <p className="font-mono text-[9px] text-dim/50 mt-0.5">
              {activeCityData.lat.toFixed(1)}°
              {activeCityData.lat >= 0 ? "N" : "S"}{" "}
              {Math.abs(activeCityData.lng).toFixed(1)}°
              {activeCityData.lng >= 0 ? "E" : "W"}
            </p>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-[#141414] flex-wrap gap-2">
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-accent" />
            <span className="font-mono text-[9px] text-dim">
              PRIMARY MARKET
            </span>
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
        <span className="font-mono text-[9px] text-dim/40">
          HOVER TO INSPECT
        </span>
      </div>
    </div>
  );
}
