import { NextResponse } from "next/server";

const BASE = process.env.DEEPL_BASE || "https://api-free.deepl.com";
const KEY = process.env.DEEPL_API_KEY;

const mapTarget = (code) => {
  const c = (code || "").toLowerCase();
  if (c === "en" || c === "en-us") return "EN-US";
  if (c === "en-gb" || c === "en-uk" || c === "british") return "EN-GB";
  if (c === "pt" || c === "pt-br" || c === "br") return "PT-BR";
  if (c === "pt-pt") return "PT-PT";
  return (code || "").toUpperCase();
};

export async function POST(req) {
  try {
    const { q, target, source = "EN", formality } = await req.json();
    if (!q || !target) {
      return NextResponse.json({ error: "q and target required" }, { status: 400 });
    }
    if (!KEY) {
      return NextResponse.json({ error: "Server not configured" }, { status: 500 });
    }

    const body = {
      text: [q],
      source_lang: source.toUpperCase(),      // EN
      target_lang: mapTarget(target),         // e.g. ES, JA, PT-BR, EN-US
    };
    if (formality && formality !== "default") body.formality = formality;

    const r = await fetch(`${BASE}/v2/translate`, {
      method: "POST",
      headers: {
        Authorization: `DeepL-Auth-Key ${KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const j = await r.json();
    if (!r.ok) throw new Error(j?.message || JSON.stringify(j));

    const t = j?.translations?.[0];
    return NextResponse.json({
      text: t?.text || "",
      detected: t?.detected_source_language,
      provider: "deepl",
    });
  } catch (e) {
    return NextResponse.json({ error: e?.message || "Translation failed" }, { status: 500 });
  }
}
