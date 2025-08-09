import { NextResponse } from "next/server";

const BASE = process.env.DEEPL_BASE || "https://api-free.deepl.com";
const KEY = process.env.DEEPL_API_KEY;

export async function GET() {
  try {
    const r = await fetch(`${BASE}/v2/languages?type=target`, {
      headers: { Authorization: `DeepL-Auth-Key ${KEY}` },
    });
    const j = await r.json();
    if (!r.ok) throw new Error(j?.message || "Failed to fetch languages");
    return NextResponse.json(j);
  } catch (e) {
    return NextResponse.json({ error: e?.message || "languages failed" }, { status: 500 });
  }
}
