import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Awarizon — Technology Development & Distribution";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#000000",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          fontFamily: "sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,229,0,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,229,0,0.035) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Radial glow — top left */}
        <div
          style={{
            position: "absolute",
            top: "-15%",
            left: "-10%",
            width: "65%",
            height: "65%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,229,0,0.07) 0%, transparent 70%)",
          }}
        />

        {/* Yellow accent bar at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "5px",
            background: "#FFE500",
          }}
        />

        {/* Inner content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            padding: "60px 72px 56px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Status tag row */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "9px",
                height: "9px",
                borderRadius: "50%",
                background: "#FFE500",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                color: "#FFE500",
                fontSize: "15px",
                letterSpacing: "0.28em",
                fontFamily: "monospace",
              }}
            >
              SYS:ONLINE
            </span>
            <span
              style={{
                color: "#2a2a2a",
                fontSize: "15px",
                fontFamily: "monospace",
              }}
            >
              |
            </span>
            <span
              style={{
                color: "#555555",
                fontSize: "15px",
                letterSpacing: "0.18em",
                fontFamily: "monospace",
              }}
            >
              TECHNOLOGY DEVELOPMENT &amp; DISTRIBUTION
            </span>
          </div>

          {/* Main headline block */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div
              style={{
                fontSize: "106px",
                fontWeight: 900,
                color: "#FFE500",
                lineHeight: 0.88,
                letterSpacing: "-0.03em",
              }}
            >
              AWARIZON
            </div>
            <div
              style={{
                fontSize: "26px",
                color: "#777777",
                maxWidth: "660px",
                lineHeight: 1.55,
                fontWeight: 400,
              }}
            >
              Building the bridge between businesses, technology, and everyday
              users across Nigeria and West Africa.
            </div>
          </div>

          {/* Bottom row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <div
                style={{
                  width: "4px",
                  height: "44px",
                  background: "#FFE500",
                  borderRadius: "2px",
                  flexShrink: 0,
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                <span
                  style={{
                    color: "#FFE500",
                    fontSize: "12px",
                    letterSpacing: "0.22em",
                    fontFamily: "monospace",
                  }}
                >
                  POSITIONING
                </span>
                <span
                  style={{
                    color: "#555555",
                    fontSize: "17px",
                    fontWeight: 400,
                  }}
                >
                  Nigeria, West Africa &amp; Emerging Markets
                </span>
              </div>
            </div>

            <span
              style={{
                color: "#333333",
                fontSize: "18px",
                fontFamily: "monospace",
                letterSpacing: "0.12em",
              }}
            >
              awarizon.com
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
