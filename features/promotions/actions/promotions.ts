"use server";

import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { axiosAuth } from "@/lib/api/api-interceptor/api";
import {
  Result,
  ApiListResponse,
  ApiSingleResponse,
  apiRequest,
  fetchListData,
  fetchSingleData,
} from "@/lib/api/api-handler/generic";
import { SearchParams } from "@/types/table";
import { PROMOTION } from "@/constants/api-constant";
import { IPromotion } from "../types/promotion-type";

export async function getPromotionsSearchParams(
  searchParams: SearchParams
): Promise<ApiListResponse<IPromotion>> {
  noStore();

  const result = await fetchListData<IPromotion>(
    PROMOTION.PROMOTIONS,
    searchParams
  );
  if (!result.success) {
    console.error("Failed to fetch PROMOTION:", result.error);
    return { data: [], pageCount: 0, error: result.error };
  }
  return result.data;
}

export async function getPromotionById(
  params: string
): Promise<ApiSingleResponse<IPromotion>> {
  const result = await fetchSingleData<IPromotion>(
    `${PROMOTION.PROMOTIONS}/${params}`
  );
  if (!result.success) {
    console.error("Failed to fetch detail PROMOTION:", result.error);
    return { data: null, error: result.error };
  }

  return result.data;
}

export async function updatePromotion(
  data: any,
  params: string
): Promise<Result<void>> {
  noStore();

  const result = await apiRequest(() =>
    axiosAuth.put(`${PROMOTION.PROMOTIONS}/${params}`, data)
  );
  if (!result.success) {
    return { success: false, error: result.error };
  }

  revalidatePath(`/dashboard/promotions/${params}`);

  return { success: true, data: undefined };
}

export async function createPromotion(data: any): Promise<Result<void>> {
  noStore();

  const result = await apiRequest(() =>
    axiosAuth.post(PROMOTION.PROMOTIONS, data)
  );
  if (!result.success) {
    return { success: false, error: result.error };
  }

  revalidatePath(`/dashboard/promotions`);
  return { success: true, data: undefined };
}

export async function deletePromtion(
  params: string
): Promise<Result<void>> {
  noStore();

  const result = await apiRequest(() =>
    axiosAuth.delete(`${PROMOTION.PROMOTIONS}/${params}`)
  );
  if (!result.success) {
    return { success: false, error: result.error };
  }

  revalidatePath(`/dashboard/promotions/${params}`);

  return { success: true, data: undefined };
}
