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