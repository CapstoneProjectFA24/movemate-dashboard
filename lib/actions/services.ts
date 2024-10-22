"use server";

import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { axiosAuth } from "@/lib/api/api-interceptor/api";

import {
  Result,
  ApiListResponse,
  ApiSingleResponse,
  apiRequest,
  fetchListData,
} from "@/lib/api/api-handler/generic";

import { SearchParams } from "@/types/table";
import { IService } from "@/types/dashboard";
import { SERVICES_URL } from "./action-key";

export async function getServices(
  searchParams: SearchParams
): Promise<ApiListResponse<IService>> {
  noStore();
  const result = await fetchListData<IService>(SERVICES_URL.GET_SERVICES, searchParams);
  if (!result.success) {
    console.error("Failed to fetch services:", result.error);
    return { data: [], pageCount: 0, error: result.error };
  }
  return result.data;
}
