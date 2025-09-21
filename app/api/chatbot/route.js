import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { message } = body;

  const prompt = `
  You are a career counseling assistant. 
  Guide students and parents with structured advice about:
  - College structure
  - Career opportunities after a course
  - Options after 10th/12th

  User: ${message}
  `;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    return NextResponse.json({ reply });
  } catch (err) {
    return NextResponse.json({ reply: "Error connecting to Gemini API" }, { status: 500 });
  }
}