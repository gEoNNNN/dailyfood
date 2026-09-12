import { getSessionCookieName } from "../../../../lib/auth";

export const runtime = "nodejs";

export async function POST() {
  return Response.json({ ok: true }, {
    headers: {
      "Set-Cookie": `${getSessionCookieName()}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`,
      "Cache-Control": "no-store",
    },
  });
}
