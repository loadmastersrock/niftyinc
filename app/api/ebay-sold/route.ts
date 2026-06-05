import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

type SoldCompsItem = {
  title?: string;
  soldPrice?: string;
  soldCurrency?: string;
  shippingPrice?: string;
  endedAt?: string;
  url?: string;
};

function normalise(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function parsePrice(value: string | undefined) {
  if (!value) return null;
  const cleaned = value.replace(/[^0-9.]/g, "");
  const number = Number(cleaned);
  return Number.isFinite(number) ? number : null;
}

function median(numbers: number[]) {
  if (!numbers.length) return 0;

  const sorted = [...numbers].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }

  return sorted[middle];
}

function roundMoney(value: number) {
  return Math.round(value * 100) / 100;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const cardName = body.cardName?.toString() || "";
    const setName = body.setName?.toString() || "";
    const cardNumber = body.cardNumber?.toString() || "";

    if (!cardName && !cardNumber) {
      return NextResponse.json(
        { error: "Card name or card number is required." },
        { status: 400 }
      );
    }

    const cacheKey = normalise(`${cardName}-${setName}-${cardNumber}`);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data: cached } = await supabase
      .from("ebay_cache")
      .select("*")
      .eq("cache_key", cacheKey)
      .gte("created_at", sevenDaysAgo.toISOString())
      .maybeSingle();

    if (cached) {
      return NextResponse.json({
        source: "cache",
        average_price: cached.average_price,
        median_price: cached.median_price,
        lowest_price: cached.lowest_price,
        highest_price: cached.highest_price,
        sales_count: cached.sales_count,
        currency: cached.currency,
        items: cached.items || [],
      });
    }

    if (!process.env.SOLDCOMPS_API_KEY) {
      return NextResponse.json(
        { error: "SoldComps API key is missing on the server." },
        { status: 500 }
      );
    }

    const keyword = `${cardName} ${setName} ${cardNumber} pokemon`.trim();

    const url = new URL("https://api.sold-comps.com/v1/scrape");
    url.searchParams.set("keyword", keyword);
    url.searchParams.set("ebaySite", "ebay.co.uk");

    const soldCompsResponse = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${process.env.SOLDCOMPS_API_KEY}`,
      },
      cache: "no-store",
    });

    const rawResponse = await soldCompsResponse.json();

    if (!soldCompsResponse.ok) {
      return NextResponse.json(
        {
          error:
            rawResponse?.message ||
            rawResponse?.error ||
            "SoldComps lookup failed.",
        },
        { status: 500 }
      );
    }

    const items: SoldCompsItem[] = Array.isArray(rawResponse.items)
      ? rawResponse.items
      : [];

    const filteredItems = items
      .filter((item) => {
        const title = item.title?.toLowerCase() || "";
        return (
          !title.includes("psa") &&
          !title.includes("cgc") &&
          !title.includes("bgs") &&
          !title.includes("beckett") &&
          !title.includes("graded")
        );
      })
      .slice(0, 30);

    const prices = filteredItems
      .map((item) => parsePrice(item.soldPrice))
      .filter((price): price is number => price !== null && price > 0);

    if (!prices.length) {
      return NextResponse.json({
        source: "soldcomps",
        average_price: null,
        median_price: null,
        lowest_price: null,
        highest_price: null,
        sales_count: 0,
        currency: "GBP",
        items: [],
      });
    }

    const averagePrice = roundMoney(
      prices.reduce((total, price) => total + price, 0) / prices.length
    );

    const medianPrice = roundMoney(median(prices));
    const lowestPrice = roundMoney(Math.min(...prices));
    const highestPrice = roundMoney(Math.max(...prices));

    const currency =
      filteredItems.find((item) => item.soldCurrency)?.soldCurrency || "GBP";

    const cleanItems = filteredItems.slice(0, 10).map((item) => ({
      title: item.title || "Untitled listing",
      soldPrice: item.soldPrice || "",
      soldCurrency: item.soldCurrency || currency,
      shippingPrice: item.shippingPrice || "",
      endedAt: item.endedAt || "",
      url: item.url || "",
    }));

    await supabase.from("ebay_cache").upsert(
      {
        cache_key: cacheKey,
        card_name: cardName,
        set_name: setName,
        card_number: cardNumber,
        keyword,
        average_price: averagePrice,
        median_price: medianPrice,
        lowest_price: lowestPrice,
        highest_price: highestPrice,
        sales_count: prices.length,
        currency,
        items: cleanItems,
        raw_response: rawResponse,
        created_at: new Date().toISOString(),
      },
      {
        onConflict: "cache_key",
      }
    );

    return NextResponse.json({
      source: "soldcomps",
      average_price: averagePrice,
      median_price: medianPrice,
      lowest_price: lowestPrice,
      highest_price: highestPrice,
      sales_count: prices.length,
      currency,
      items: cleanItems,
    });
  } catch (error) {
    console.error("eBay sold lookup error:", error);

    return NextResponse.json(
      { error: "Something went wrong checking eBay sold prices." },
      { status: 500 }
    );
  }
}