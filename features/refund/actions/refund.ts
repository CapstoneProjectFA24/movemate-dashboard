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
import { auth } from "@/lib/next-auth/auth";
import { BOOKING_URL } from "@/constants/api-constant";
import { IRefund } from "../types/refund-type";
import { axiosAuth } from "@/lib/api/api-interceptor/api";

export async function getRefunds(
  searchParams: SearchParams
): Promise<ApiListResponse<IRefund>> {
  noStore();

  const result = await fetchListData<IRefund>(BOOKING_URL.REFUND, searchParams);
  if (!result.success) {
    console.error("Failed to fetch list IRefund:", result.error);
    return { data: [], pageCount: 0, error: result.error };
  }

  return result.data;
}

export async function refundMoney(
  data: any,
  params: string
): Promise<Result<void>> {
  noStore();

  const result = await apiRequest(() =>
    axiosAuth.put(`${BOOKING_URL.REFUND}/refund/${params}`, data)
  );
  if (!result.success) {
    return { success: false, error: result.error };
  }

  revalidatePath(`/dashboard/refund`);

  return { success: true, data: undefined };
}



export async function moneytaryMoney(
  data: any,
  params: string
): Promise<Result<void>> {
  noStore();
console.log(data)
  const result = await apiRequest(() =>
    axiosAuth.put(`${BOOKING_URL.MONEYTARY}/${params}`, data)
  );
  if (!result.success) {
    return { success: false, error: result.error };
  }

  revalidatePath(`/dashboard/refund`);

  return { success: true, data: undefined };
}
