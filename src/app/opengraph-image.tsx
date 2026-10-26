import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt =
  "Dra. Helena Vasconcelos, psiquiatra na Vila Mariana e online para todo o Brasil";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Pixel mark from the logo (4×4), drawn with divs because ImageResponse has no SVG grid.
const MARK = ["1100", "1011", "0110", "0011"];

export default async function OpenGraphImage() {
  const serif = await readFile(
    join(process.cwd(), "src/app/_assets/InstrumentSerif-Regular.ttf"),
  );

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#302f27",
        color: "#fffaf0",
        fontFamily: "Instrument Serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {MARK.map((row, y) => (
            <div key={y} style={{ display: "flex" }}>
              {[...row].map((cell, x) => (
                <div
                  key={x}
                  style={{
                    width: 14,
                    height: 14,
                    background: cell === "1" ? "#c6f038" : "transparent",
                  }}
                />
              ))}
            </div>
          ))}
        </div>
        <div style={{ fontSize: 40 }}>Dra. Helena Vasconcelos</div>
      </div>
      <div style={{ fontSize: 78, lineHeight: 1.05, maxWidth: 1056 }}>
        Acompanhamento psiquiátrico para quem está pronto para pedir ajuda
      </div>
      <div style={{ display: "flex", fontSize: 30, color: "#c8c6bc" }}>
        Psiquiatra · Vila Mariana, São Paulo · Online para todo o Brasil
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Instrument Serif", data: serif, style: "normal", weight: 400 },
      ],
    },
  );
}
