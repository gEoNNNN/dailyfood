import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div style={{ alignItems: "center", background: "#f4cd24", color: "#090909", display: "flex", fontSize: 132, fontWeight: 900, height: "100%", justifyContent: "center", letterSpacing: -12, width: "100%" }}>
      D
      <span style={{ background: "#d9231e", borderRadius: 10, height: 24, position: "absolute", right: 18, top: 18, width: 24 }} />
    </div>,
    size,
  );
}
