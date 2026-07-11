import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Breaking.X.global Dashboard testing ke liye sample statistics data
    const mockEarningsData = {
      totalEarnings: 124.50, // USD
      totalImpressions: 45200,
      totalClicks: 1840,
      ctr: "4.07%",
      dailyStats: [
        { date: "05 July", earnings: 12.40, clicks: 150 },
        { date: "06 July", earnings: 18.20, clicks: 210 },
        { date: "07 July", earnings: 15.10, clicks: 190 },
        { date: "08 July", earnings: 22.80, clicks: 310 },
        { date: "09 July", earnings: 28.30, clicks: 420 },
        { date: "10 July", earnings: 27.70, clicks: 360 },
      ]
    };

    return NextResponse.json(mockEarningsData, { status: 200 });
  } catch (error) {
    console.error("Earnings API Error:", error);
    return NextResponse.json({ error: "Failed to fetch earnings" }, { status: 500 });
  }
}