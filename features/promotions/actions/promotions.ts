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
  
  // export async function updateTruckCategory(
  //   data: any,
  //   params: string
  // ): Promise<Result<void>> {
  //   noStore();
  
  //   const result = await apiRequest(() =>
  //     axiosAuth.put(`${SERVICES_URL.MANAGE_TRUCK_CATEGORY}/${params}`, data)
  //   );
  //   if (!result.success) {
  //     return { success: false, error: result.error };
  //   }
  
  //   revalidatePath(`/dashboard/services_setting/${params}`);
  
  //   return { success: true, data: undefined };
  // }
  
  // export async function createTruckCategory(data: any): Promise<Result<void>> {
  //   noStore();
  
  //   const result = await apiRequest(() =>
  //     axiosAuth.post(SERVICES_URL.MANAGE_TRUCK_CATEGORY, data)
  //   );
  //   if (!result.success) {
  //     return { success: false, error: result.error };
  //   }
  
  //   revalidatePath(`/dashboard/services_setting`);
  //   return { success: true, data: undefined };
  // }
  
  
  // export async function deleteTruckCategory(params: string): Promise<Result<void>>{
  //   noStore();
  
  //   const result = await apiRequest(() =>
  //     axiosAuth.delete(`${SERVICES_URL.DELETE_TRUCK_CATEGORY}/${params}`)
  //   );
  //   if (!result.success) {
  //     return { success: false, error: result.error };
  //   }
  
  //   revalidatePath(`/dashboard/services_setting/${params}`);
  
  //   return { success: true, data: undefined };
  // }