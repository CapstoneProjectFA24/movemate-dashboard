"user server";

import { unstable_noStore as noStore, revalidatePath } from "next/cache";

import {
  Result,
  ApiListResponse,
  ApiSingleResponse,
  apiRequest,
  fetchListData,
} from "@/lib/api/api-handler/generic";

import { SearchParams } from "@/types/table";
import { IBooking } from "../type/booking-type";
import { SERVICES_URL } from "@/constants/api-constant";
import { auth } from "@/lib/next-auth/auth";

export async function getBookings(
  searchParams: SearchParams
): Promise<ApiListResponse<IBooking>> {
  noStore();
  const sesison = await auth();
  const userId = sesison?.user?.id;

  const modifiedSearchParams = { ...searchParams, userId: userId };

  const result = await fetchListData<IBooking>(
    SERVICES_URL.GET_BOOKINGS,
    modifiedSearchParams
  );
  if (!result.success) {
    console.error("Failed to fetch bookings:", result.error);
    return { data: [], pageCount: 0, error: result.error };
  }

  return result.data;
}
