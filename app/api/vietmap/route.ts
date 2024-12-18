import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// Add this to disable static generation for this route
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Use NextRequest instead of Request
    const pickupPoint = request.nextUrl.searchParams.get("pickupPoint");
    const deliveryPoint = request.nextUrl.searchParams.get("deliveryPoint");
    
    if (!pickupPoint || !deliveryPoint) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const VIETMAP_API_KEY = "be00f7e132bdd086ccd57e21460209836f5d37ce56beaa42";

    const { data } = await axios.get(
      `https://maps.vietmap.vn/api/matrix?api-version=1.1&apikey=${VIETMAP_API_KEY}&point=${pickupPoint}&point=${deliveryPoint}`
    );

    return NextResponse.json(data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data);
      return NextResponse.json(
        { error: error.response?.data || "Failed to fetch data from Vietmap" },
        { status: error.response?.status || 500 }
      );
    }

    console.error("Error fetching Vietmap data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from Vietmap" },
      { status: 500 }
    );
  }
}