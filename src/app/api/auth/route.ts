import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (email === "test@email.com" && password === "password123") {
    return NextResponse.json({ success: true, token: "mock-token" });
  }

  return NextResponse.json({ success: false, error: "Credenciales inválidas" }, { status: 401 });
}
