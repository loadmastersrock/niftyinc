import OpenAI from "openai";
import { NextResponse } from "next/server";
import { getEstimatedCardValue } from "@/lib/value";

async function fileToDataUrl(file: File) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const base64 = buffer.toString("base64");
  return `data:${file.type};base64,${base64}`;
}

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key is missing on the server." },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const formData = await request.formData();

    const cardName = formData.get("cardName")?.toString() || "";
    const setName = formData.get("setName")?.toString() || "";
    const cardNumber = formData.get("cardNumber")?.toString() || "";

    const frontImage = formData.get("frontImage");
    const backImage = formData.get("backImage");

    if (!(frontImage instanceof File) || !(backImage instanceof File)) {
      return NextResponse.json(
        { error: "Front and back images are required." },
        { status: 400 }
      );
    }

    const frontDataUrl = await fileToDataUrl(frontImage);
    const backDataUrl = await fileToDataUrl(backImage);

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `
You are Nifty Scan™, a professional Pokémon trading card identification and pre-grading assistant.

First, identify the card from the uploaded images.

Use visible text, artwork, set symbol, card number, language, rarity and layout to identify:
- card name
- set name
- card number
- language
- likely rarity
- Pokémon TCG era

The user may have provided optional card details:
Name: ${cardName || "Not provided"}
Set: ${setName || "Not provided"}
Number: ${cardNumber || "Not provided"}

If the user's details conflict with the image, trust the image but mention uncertainty.

Then analyse visible condition only:
- centering
- corners
- edges
- surface
- whitening
- print lines
- dents or creases
- overall eye appeal

Be conservative. Do not claim this is an official PSA grade.

Return JSON only in this exact shape:

{
  "card_name": "",
  "set_name": "",
  "card_number": "",
  "language": "",
  "rarity": "",
  "era": "",
  "identification_confidence": "",
  "predicted_grade": "",
  "psa_10_probability": "",
  "confidence": "",
  "scores": {
    "centering": "",
    "corners": "",
    "edges": "",
    "surface": ""
  },
  "detected_issues": [],
  "recommendation": "",
  "disclaimer": ""
}
              `,
            },
            {
              type: "image_url",
              image_url: {
                url: frontDataUrl,
              },
            },
            {
              type: "image_url",
              image_url: {
                url: backDataUrl,
              },
            },
          ],
        },
      ],
    });

    const content = response.choices[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: "No analysis was returned." },
        { status: 500 }
      );
    }

    const result = JSON.parse(content);

    const value = await getEstimatedCardValue(
      result.card_name || cardName,
      result.set_name || setName,
      result.card_number || cardNumber,
      result.predicted_grade || "",
      result.psa_10_probability || ""
    );

    return NextResponse.json({
      ...result,
      value,
    });
  } catch (error) {
    console.error("Analyse error:", error);

    return NextResponse.json(
      { error: "Something went wrong while analysing the card." },
      { status: 500 }
    );
  }
}