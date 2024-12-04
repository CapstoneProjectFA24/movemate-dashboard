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
import { IAssigmentAvailable } from "../types/assigment-available-type";

export async function getCheckAvailableDriver(
  params: string
): Promise<ApiSingleResponse<IAssigmentAvailable>> {
  noStore();
  const result = await fetchSingleData<IAssigmentAvailable>(
    `${ASSIGNMENT_URL.CHECK_DRIVER_ASSIGNMENT}/${params}`
  );
  if (!result.success) {
    // console.error(
    //   "Failed to fetch CHECK_DRIVER_ASSIGNMENT by ID:",
    //   result.error
    // );
    return { data: null };
  }

  return result.data;
}

export async function getCheckAvailablePorter(
  params: string
): Promise<ApiSingleResponse<IAssigmentAvailable>> {
  noStore();
  const result = await fetchSingleData<IAssigmentAvailable>(
    `${ASSIGNMENT_URL.CHECK_PORTER_ASSIGNMENT}/${params}`
  );
  if (!result.success) {
    // console.error(
    //   "Failed to fetch CHECK_PORTER_ASSIGNMENT by ID:",
    //   result.error
    // );
    return { data: null };
  }

  return result.data;
}

export async function assignStaffToBooking(
  params: string
): Promise<Result<void>> {
  noStore();

  const result = await apiRequest(() =>
    axiosAuth.patch(`${ASSIGNMENT_URL.ASSIGNMENTS}/${params}`)
  );

  if (!result.success) {
    return { success: false, error: result.error };
  }

  revalidatePath("/dashboard/booking");
  return { success: true, data: undefined };
}
