import { supabase } from "@/lib/supabase";

export type CardValueResult = {
  raw_value: string;
  psa9_value: string;
  psa10_value: string;
  submission_cost: string;
  expected_profit: string;
  grade_recommendation: "GRADE" | "DO NOT GRADE" | "REVIEW";
  decision_title: string;
  decision_reason: string;
  value_summary: string;
  sources?: {
    ebay?: string;
    pricecharting?: string;
    tcgplayer?: string;
    cardmarket?: string;
  };
};

type CardValueRow = {
  card_name: string;
  set_name: string | null;
  card_number: string | null;
  raw_low: number | null;
  raw_high: number | null;
  psa9_low: number | null;
  psa9_high: number | null;
  psa10_low: number | null;
  psa10_high: number | null;
  source_ebay: string | null;
  source_pricecharting: string | null;
  source_tcgplayer: string | null;
  source_cardmarket: string | null;
  notes: string | null;
};

function formatRange(low: number | null, high: number | null) {
  if (low === null || high === null) return "Coming soon";
  return `£${Math.round(low)}-£${Math.round(high)}`;
}

function extractNumber(value: string) {
  const match = value.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function calculateDecision(
  predictedGrade: string,
  psa10Probability: string,
  value: CardValueRow | null
): Pick<
  CardValueResult,
  "expected_profit" | "grade_recommendation" | "decision_title" | "decision_reason"
> {
  const psa10Chance = extractNumber(psa10Probability);
  const predicted = predictedGrade.toLowerCase();

  if (!value || value.raw_low === null || value.psa9_low === null) {
    return {
      expected_profit: "Pending value data",
      grade_recommendation: "REVIEW",
      decision_title: "REVIEW BEFORE GRADING",
      decision_reason:
        "Nifty Value™ needs more market data before making a firm financial recommendation.",
    };
  }

  const submissionCost = 18;
  const rawAverage = ((value.raw_low || 0) + (value.raw_high || 0)) / 2;
  const psa9Average = ((value.psa9_low || 0) + (value.psa9_high || 0)) / 2;
  const psa10Average = ((value.psa10_low || 0) + (value.psa10_high || 0)) / 2;

  const weightedExpectedValue =
    psa10Average * (psa10Chance / 100) +
    psa9Average * (1 - psa10Chance / 100);

  const expectedProfit = Math.round(
    weightedExpectedValue - rawAverage - submissionCost
  );

  if (predicted.includes("10") || expectedProfit > 20 || psa10Chance >= 60) {
    return {
      expected_profit: expectedProfit >= 0 ? `+£${expectedProfit}` : `-£${Math.abs(expectedProfit)}`,
      grade_recommendation: "GRADE",
      decision_title: "GRADE THIS CARD",
      decision_reason:
        "The value spread suggests there may be enough upside after grading fees if the card achieves a strong grade.",
    };
  }

  if (predicted.includes("8") || expectedProfit < -10 || psa10Chance <= 20) {
    return {
      expected_profit: expectedProfit >= 0 ? `+£${expectedProfit}` : `-£${Math.abs(expectedProfit)}`,
      grade_recommendation: "DO NOT GRADE",
      decision_title: "DO NOT GRADE YET",
      decision_reason:
        "Based on the current value spread and condition estimate, the grading upside does not look strong enough.",
    };
  }

  return {
    expected_profit: expectedProfit >= 0 ? `+£${expectedProfit}` : `-£${Math.abs(expectedProfit)}`,
    grade_recommendation: "REVIEW",
    decision_title: "REVIEW BEFORE GRADING",
    decision_reason:
      "This card may be worth grading, but the expected return is close enough that recent sold listings should be checked first.",
  };
}

export async function getEstimatedCardValue(
  cardName: string,
  setName: string,
  cardNumber: string,
  predictedGrade: string,
  psa10Probability: string
): Promise<CardValueResult> {
  const cleanCardName = cardName?.trim() || "";
  const cleanSetName = setName?.trim() || "";
  const cleanCardNumber = cardNumber?.trim() || "";

  const { data } = await supabase
    .from("card_values")
    .select("*")
    .ilike("card_name", cleanCardName)
    .ilike("set_name", cleanSetName)
    .ilike("card_number", cleanCardNumber)
    .maybeSingle<CardValueRow>();

  const decision = calculateDecision(
    predictedGrade,
    psa10Probability,
    data || null
  );

  if (!data) {
    return {
      raw_value: "Coming soon",
      psa9_value: "Coming soon",
      psa10_value: "Coming soon",
      submission_cost: "£18 estimate",
      ...decision,
      value_summary: `Nifty Value™ has not found stored market data for ${cleanCardName} ${cleanSetName} ${cleanCardNumber}. Add this card to the card_values table to show raw, PSA 9 and PSA 10 estimates.`,
      sources: {},
    };
  }

  return {
    raw_value: formatRange(data.raw_low, data.raw_high),
    psa9_value: formatRange(data.psa9_low, data.psa9_high),
    psa10_value: formatRange(data.psa10_low, data.psa10_high),
    submission_cost: "£18 estimate",
    ...decision,
    value_summary:
      data.notes ||
      "Nifty Value™ compares raw, PSA 9 and PSA 10 estimates across available market sources.",
    sources: {
      ebay: data.source_ebay || undefined,
      pricecharting: data.source_pricecharting || undefined,
      tcgplayer: data.source_tcgplayer || undefined,
      cardmarket: data.source_cardmarket || undefined,
    },
  };
}