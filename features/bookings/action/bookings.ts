"use server";

import { unstable_noStore as noStore, revalidatePath } from "next/cache";

import {
  Result,
  ApiListResponse,
  ApiSingleResponse,
  apiRequest,
  fetchListData,
  fetchSingleData,
} from "@/lib/api/api-handler/generic";

import { SearchParams } from "@/types/table";
import { IBooking } from "../type/booking-type";
import { BOOKING_URL, SERVICES_URL } from "@/constants/api-constant";
import { auth } from "@/lib/next-auth/auth";
import { axiosAuth } from "@/lib/api/api-interceptor/api";

export async function getBookings(
  searchParams: SearchParams,
  isOnline: boolean
): Promise<ApiListResponse<IBooking>> {
  noStore();
  const sesison = await auth();
  const userId = sesison?.user?.id;

  const modifiedSearchParams = {
    ...searchParams,
    userId: userId,
    IsReviewOnl: isOnline,
  };

  const result = await fetchListData<IBooking>(
    BOOKING_URL.GET_BOOKINGS,
    modifiedSearchParams
  );
  if (!result.success) {
    console.error("Failed to fetch bookings:", result.error);
    return { data: [], pageCount: 0, error: result.error };
  }

  return result.data;
}

export async function getBooking(
  params: string
): Promise<ApiSingleResponse<IBooking>> {
  noStore();

  const result = await fetchSingleData<IBooking>(
    `${BOOKING_URL.GET_BOOKINGS}/${params}`
  );
  if (!result.success) {
    console.error("Failed to fetch booking by ID:", result.error);
    return { data: null };
  }
  return result.data;
}

export async function updateBookingOnlineDetail(
  params: string
): Promise<Result<void>> {
  noStore();
  const result = await apiRequest(() =>
    axiosAuth.put(`${BOOKING_URL.UPDATE_DETAILS_STATUS}/${params}`)
  );

  if (result.success) {
    revalidatePath("/dashboard/bookings");
    return { success: true, data: undefined };
  }

  return result;
}

export async function updateBookingOnlineDetail1(
  params: string,
  data: any
): Promise<Result<void>> {
  noStore();
  const result = await apiRequest(() =>
    axiosAuth.put(`${BOOKING_URL.UPDATE_BOOKING_STATUS}/${params}`, data)
  );

  if (result.success) {
    revalidatePath("/dashboard/bookings");
    return { success: true, data: undefined };
  }

  return result;
}
