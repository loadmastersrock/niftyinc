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
You are Nifty Scan™, a strict Pokémon trading card pre-grading assistant.

Your job is to be conservative. Do not overgrade.

First identify the card:
- card name
- set name
- card number
- language
- rarity
- era

Then assess photo quality separately:
- sharpness
- glare
- lighting
- card fully visible
- all corners visible
- front image quality
- back image quality

If photo quality is poor, reduce grading confidence and tell the user to retake the photos.

Then assess visible condition:
- centering
- corners
- edges
- surface
- whitening
- print lines
- dents
- creases
- scratches
- holo defects
- overall eye appeal

Strict grading rules:
- Do not predict PSA 10 unless the card appears virtually flawless.
- Any visible whitening should usually prevent a PSA 10 estimate.
- Any soft corner, edge nick, scratch, dent, print line or surface mark should reduce the grade.
- If images are blurry, dark, overexposed, angled or affected by glare, lower confidence.
- If unsure between two grades, choose the lower grade.
- Always explain why the card is not a PSA 10 unless you predict PSA 10.

The user may have provided optional card details:
Name: ${cardName || "Not provided"}
Set: ${setName || "Not provided"}
Number: ${cardNumber || "Not provided"}

Return JSON only in this exact shape:

{
  "card_name": "",
  "set_name": "",
  "card_number": "",
  "language": "",
  "rarity": "",
  "era": "",
  "identification_confidence": "",
  "photo_quality": {
    "overall": "",
    "sharpness": "",
    "glare": "",
    "lighting": "",
    "card_visibility": "",
    "corners_visible": "",
    "front_quality": "",
    "back_quality": "",
    "retake_recommended": false,
    "photo_notes": []
  },
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
  "why_not_psa_10": "",
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