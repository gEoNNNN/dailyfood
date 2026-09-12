import { createSessionToken, getSessionCookieName, getSessionMaxAge, verifyPassword } from "../../../../lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: { password?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_request" }, { status: 400 });
  }

  const password = typeof body.password === "string" ? body.password : "";
  if (!verifyPassword(password)) {
    return Response.json({ error: "invalid_password" }, { status: 401 });
  }

  const token = createSessionToken();
  return Response.json({ ok: true }, {
    headers: {
      "Set-Cookie": `${getSessionCookieName()}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${getSessionMaxAge()}`,
      "Cache-Control": "no-store",
    },
  });
}
