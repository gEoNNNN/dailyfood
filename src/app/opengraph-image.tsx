import { ImageResponse } from "next/og";

export const alt = "Daily Kebab Burger — kebab și burgeri în Chișinău";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ alignItems: "center", background: "#090909", color: "#f4cd24", display: "flex", height: "100%", justifyContent: "center", padding: 70, width: "100%" }}>
      <div style={{ alignItems: "center", display: "flex", flexDirection: "column" }}>
        <div style={{ background: "#f4cd24", borderRadius: 28, color: "#090909", display: "flex", fontSize: 120, fontWeight: 900, letterSpacing: -7, padding: "18px 54px" }}>DAILY</div>
        <div style={{ display: "flex", fontSize: 56, fontWeight: 800, letterSpacing: 5, marginTop: 24 }}>KEBAB · BURGER</div>
        <div style={{ color: "#ffffff", display: "flex", fontSize: 30, marginTop: 28 }}>Proaspăt pregătit în Chișinău</div>
      </div>
    </div>,
    size,
  );
}
