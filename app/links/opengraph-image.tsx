import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Alex Lindholm - consultations, relocation and acceleration materials";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const portrait = await readFile(join(process.cwd(), "public/media/alex/linktree-portrait.jpg"));
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#F4F6FA", color: "#172238", padding: 64, alignItems: "center", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", position: "absolute", top: 0, left: 0, right: 0, height: 14, background: "#244FD8" }} />
      <div style={{ display: "flex", flexDirection: "column", width: 700, paddingRight: 40 }}>
        <div style={{ fontSize: 22, color: "#244FD8", letterSpacing: 3, marginBottom: 24 }}>CONNECT WITH</div>
        <div style={{ fontSize: 74, fontWeight: 700, letterSpacing: -3, lineHeight: 1.05 }}>Alex Lindholm</div>
        <div style={{ fontSize: 30, marginTop: 28, lineHeight: 1.4 }}>Consultations, relocation &amp; acceleration materials.</div>
        <div style={{ fontSize: 23, color: "#52627B", marginTop: 18 }}>Social profiles &amp; charity initiatives</div>
        <div style={{ display: "flex", marginTop: 38, fontSize: 24, color: "#244FD8", fontWeight: 700 }}>axlindholm.nl/links</div>
      </div>
      <img src={`data:image/jpeg;base64,${portrait.toString("base64")}`} width={300} height={300} style={{ borderRadius: 150, objectFit: "cover", border: "8px solid white" }} />
    </div>,
    size,
  );
}
