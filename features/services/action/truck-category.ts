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
import { ITruckCategory } from "../types/services-type";
import { SERVICES_URL } from "@/constants/api-constant";

export async function getTruckCategorys(): Promise<
  ApiListResponse<ITruckCategory>
> {
  noStore();
  const result = await fetchListData<ITruckCategory>(
    SERVICES_URL.GET_TRUCK_CATEGORY
  );
  if (!result.success) {
    console.error("Failed to fetch truck categories:", result.error);
    return { data: [], pageCount: 0, error: result.error };
  }
  return result.data;
}
