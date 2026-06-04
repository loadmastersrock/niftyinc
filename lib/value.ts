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
};

function extractNumber(value: string) {
  const match = value.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

export function getEstimatedCardValue(
  cardName: string,
  setName: string,
  cardNumber: string,
  predictedGrade: string,
  psa10Probability: string
): CardValueResult {
  const searchName = `${cardName} ${setName} ${cardNumber}`.trim();

  const psa10Chance = extractNumber(psa10Probability);
  const predicted = predictedGrade.toLowerCase();

  let gradeRecommendation: "GRADE" | "DO NOT GRADE" | "REVIEW" = "REVIEW";
  let decisionTitle = "REVIEW BEFORE GRADING";
  let decisionReason =
    "Nifty Value™ needs live sold-price data before making a firm financial recommendation.";
  let expectedProfit = "Pending value data";

  if (predicted.includes("10") || psa10Chance >= 60) {
    gradeRecommendation = "GRADE";
    decisionTitle = "GRADE THIS CARD";
    decisionReason =
      "The condition report suggests strong upside if the card achieves a high grade. Check recent sold prices before submitting.";
    expectedProfit = "Likely positive if PSA 10 value is strong";
  } else if (predicted.includes("8") || psa10Chance <= 20) {
    gradeRecommendation = "DO NOT GRADE";
    decisionTitle = "DO NOT GRADE YET";
    decisionReason =
      "The card appears unlikely to achieve a premium grade based on the visible condition report.";
    expectedProfit = "Likely poor unless raw value is already high";
  }

  return {
    raw_value: "Coming soon",
    psa9_value: "Coming soon",
    psa10_value: "Coming soon",
    submission_cost: "£18 estimate",
    expected_profit: expectedProfit,
    grade_recommendation: gradeRecommendation,
    decision_title: decisionTitle,
    decision_reason: decisionReason,
    value_summary: `Nifty Value™ will use recent sold listings to estimate raw, PSA 9 and PSA 10 values for ${searchName}. For now, compare this report with recent eBay sold listings before submitting.`,
  };
}