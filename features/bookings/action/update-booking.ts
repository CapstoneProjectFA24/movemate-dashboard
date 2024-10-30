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
import { BOOKING_URL } from "@/constants/api-constant";
import { auth } from "@/lib/next-auth/auth";
import { axiosAuth } from "@/lib/api/api-interceptor/api";

export async function updateDetailStatus(
    params: string
  ): Promise<Result<void>> {
    noStore();
    const result = await apiRequest(() =>
      axiosAuth.put(`${BOOKING_URL.UPDATE_DETAILS_STATUS}/${params}`)
    );
  
    if (!result.success) {
      return { success: false, error: result.error };
    }
  
    console.log("actions");
    revalidatePath("/dashboard/bookings");
  
    return { success: true, data: undefined };
  }
  
  export async function updateBookingStatus(
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