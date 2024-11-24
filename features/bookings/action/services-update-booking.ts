"use server";

import { unstable_noStore as noStore } from "next/cache";
import { ApiListResponse, fetchListData } from "@/lib/api/api-handler/generic";

import { SERVICES_URL } from "@/constants/api-constant";
import { IService } from "@/features/services/types/services-type";
import { ServiceType } from "@/features/services/enums/service-enum";

export async function getServicesUpdateBooking(
  type?: ServiceType,
  houseTypeId?: number,
  floorsNumber?: string,
  estimatedDistance?: string
): Promise<ApiListResponse<IService>> {
  noStore();

  const queryParams = new URLSearchParams();

  if (type !== undefined) {
    queryParams.append("type", type.toString());
  }
  if (houseTypeId !== undefined) {
    queryParams.append("houseTypeId", houseTypeId.toString());
  }
  if (floorsNumber) {
    queryParams.append("floorsNumber", floorsNumber);
  }
  if (estimatedDistance) {
    queryParams.append("estimatedDistance", estimatedDistance);
  }

  const url = `${SERVICES_URL.GET_SERVICES}?${queryParams.toString()}`;

  const result = await fetchListData<IService>(url);

  if (!result.success) {
    console.error("Failed to fetch services:", result.error);
    return { data: [], pageCount: 0, error: result.error };
  }
  return result.data;
}
