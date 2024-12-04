"use server";

import { IHouse } from "../types/house-type";
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
export async function getHousesSearchParams(
  searchParams: SearchParams
): Promise<ApiListResponse<IHouse>> {
  noStore();

  const result = await fetchListData<IHouse>(
    SERVICES_URL.GET_HOUSE_TYPE,
    searchParams
  );
  if (!result.success) {
    console.error("Failed to fetch housetypes:", result.error);
    return { data: [], pageCount: 0, error: result.error };
  }
  return result.data;
}

export async function updateHouses(
  data: any,
  params: string
): Promise<Result<void>> {
  noStore();

  const result = await apiRequest(() =>
    axiosAuth.put(`${SERVICES_URL.GET_HOUSE_TYPE}/${params}`, data)
  );
  if (!result.success) {
    return { success: false, error: result.error };
  }

  revalidatePath(`/dashboard/services_setting`);

  return { success: true, data: undefined };
}

export async function createHouses(data: any): Promise<Result<void>> {
  noStore();

  const result = await apiRequest(() =>
    axiosAuth.post(`${SERVICES_URL.GET_HOUSE_TYPE}`, data)
  );
  if (!result.success) {
    return { success: false, error: result.error };
  }

  revalidatePath(`/dashboard/services_setting`);

  return { success: true, data: undefined };
}


export async function deleteHouse(params: string): Promise<Result<void>>{
  noStore();

  const result = await apiRequest(() =>
    axiosAuth.delete(`${SERVICES_URL.GET_HOUSE_TYPE}/${params}`)
  );
  if (!result.success) {
    return { success: false, error: result.error };
  }

  revalidatePath(`/dashboard/services_setting`);

  return { success: true, data: undefined };
}