"use server";

import { unstable_noStore as noStore, revalidatePath } from "next/cache";

import {
  Result,
  ApiListResponse,
  ApiSingleResponse,
  apiRequest,
  fetchListData,
} from "@/lib/api/api-handler/generic";

import { SearchParams } from "@/types/table";
import { SERVICES_URL } from "@/constants/api-constant";
import { IService } from "@/features/services/types/services-type";
import { ServiceType } from "@/features/services/enums/service-enum";

export async function getServicesUpdateBooking(
  type?: ServiceType
): Promise<ApiListResponse<IService>> {
  noStore();

  const result = await fetchListData<IService>(SERVICES_URL.GET_SERVICES, {
    type,
  });
  if (!result.success) {
    console.error("Failed to fetch services:", result.error);
    return { data: [], pageCount: 0, error: result.error };
  }
  return result.data;
}
