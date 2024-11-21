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

import { axiosAuth } from "@/lib/api/api-interceptor/api";
import { ASSIGNMENT_URL } from "@/constants/api-constant";

export async function assignStaffToBooking(
  params: string
): Promise<Result<void>> {
  noStore();

  const result = await apiRequest(() =>
    axiosAuth.put(`${ASSIGNMENT_URL.ASSIGNED_STAFF}/${params}`)
  );

  if (!result.success) {
    return { success: false, error: result.error };
  }

  revalidatePath("/dashboard/booking");
  return { success: true, data: undefined };
}
