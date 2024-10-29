"use server";

import { IHouse } from "../type/house-type";
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
import { SERVICES_URL } from "@/constants/api-constant";

export async function getHouses(): Promise<ApiListResponse<IHouse>> {
  noStore();

  const result = await fetchListData<IHouse>(SERVICES_URL.GET_HOUSE_TYPE);
  if (!result.success) {
    console.error("Failed to fetch housetypes:", result.error);
    return { data: [], pageCount: 0, error: result.error };
  }
  return result.data;
}
