import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const pickupPoint = searchParams.get("pickupPoint");
    const deliveryPoint = searchParams.get("deliveryPoint");
    const VIETMAP_API_KEY = "be00f7e132bdd086ccd57e21460209836f5d37ce56beaa42";

    const { data } = await axios.get(
      ` https://maps.vietmap.vn/api/matrix?api-version=1.1&apikey=${VIETMAP_API_KEY}&point=${pickupPoint}&point=${deliveryPoint}`
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
