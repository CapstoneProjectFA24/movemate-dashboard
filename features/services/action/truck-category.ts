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
import { ITruckCategory } from "../types/services-type";
import { SERVICES_URL } from "@/constants/api-constant";
import { axiosAuth } from "@/lib/api/api-interceptor/api";

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
export async function getTruckCategorysSearchParams(
  searchParams: SearchParams
): Promise<ApiListResponse<ITruckCategory>> {
  noStore();
  const result = await fetchListData<ITruckCategory>(
    SERVICES_URL.GET_TRUCK_CATEGORY,
    searchParams
  );
  if (!result.success) {
    console.error("Failed to fetch truck categories:", result.error);
    return { data: [], pageCount: 0, error: result.error };
  }
  return result.data;
}

export async function getTruckCategoryById(
  params: string
): Promise<ApiSingleResponse<ITruckCategory>> {
  const result = await fetchSingleData<ITruckCategory>(
    `${SERVICES_URL.GET_TRUCK_CATEGORY}/${params}`
  );
  if (!result.success) {
    console.error("Failed to fetch detail truck categories:", result.error);
    return { data: null, error: result.error };
  }

  return result.data;
}

export async function updateTruckCategory(
  data: any,
  params: string
): Promise<Result<void>> {
  noStore();

  console.log(data);
  const result = await apiRequest(() =>
    axiosAuth.put(`${SERVICES_URL.MANAGE_TRUCK_CATEGORY}/${params}`, data)
  );
  if (!result.success) {
    return { success: false, error: result.error };
  }

  revalidatePath(`/dashboard/services_setting/${params}`);

  return { success: true, data: undefined };
}

export async function createTruckCategory(data: any): Promise<Result<void>> {
  noStore();
console.log(data)
  const result = await apiRequest(() =>
    axiosAuth.post(SERVICES_URL.MANAGE_TRUCK_CATEGORY, data)
  );
  if (!result.success) {
    return { success: false, error: result.error };
  }

  revalidatePath(`/dashboard/services_setting`);
  return { success: true, data: undefined };
}


export async function deleteTruckCategory(params: string): Promise<Result<void>>{
  noStore();

  const result = await apiRequest(() =>
    axiosAuth.delete(`${SERVICES_URL.DELETE_TRUCK_CATEGORY}/${params}`)
  );
  if (!result.success) {
    return { success: false, error: result.error };
  }

  revalidatePath(`/dashboard/services_setting/${params}`);

  return { success: true, data: undefined };
}