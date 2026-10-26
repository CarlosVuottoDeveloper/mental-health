import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const MARK = ["1100", "1011", "0110", "0011"];

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#302f27",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        {MARK.map((row, y) => (
          <div key={y} style={{ display: "flex" }}>
            {[...row].map((cell, x) => (
              <div
                key={x}
                style={{
                  width: 24,
                  height: 24,
                  background: cell === "1" ? "#c6f038" : "transparent",
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>,
    size,
  );
}
