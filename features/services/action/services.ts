"use server";

import { unstable_noStore as noStore, revalidatePath } from "next/cache";

import {
  Result,
  ApiListResponse,
  ApiSingleResponse,
  apiRequest,
  fetchSingleData,
  fetchListData,
} from "@/lib/api/api-handler/generic";

import { SearchParams } from "@/types/table";
import { IService } from "../types/services-type";
import { SERVICES_URL } from "@/constants/api-constant";

export async function getServices(
  searchParams: SearchParams
): Promise<ApiListResponse<IService>> {
  noStore();
  const result = await fetchListData<IService>(
    SERVICES_URL.GET_SERVICES,
    searchParams
  );
  if (!result.success) {
    console.error("Failed to fetch services:", result.error);
    return { data: [], pageCount: 0, error: result.error };
  }
  return result.data;
}

export async function getServiceById(
  params: string
): Promise<ApiSingleResponse<IService>> {
  const result = await fetchSingleData<IService>(
    `${SERVICES_URL.GET_SERVICES}/${params}`
  );
  if (!result.success) {
    console.error("Failed to fetch detail services:", result.error);
    return { data: null, error: result.error };
  }

  return result.data;
}
