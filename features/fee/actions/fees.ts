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
import { auth } from "@/lib/next-auth/auth";
import { FEE_URL } from "@/constants/api-constant";
import { IFee } from "../types/fee-type";


export async function getFees(
    searchParams: SearchParams
  ): Promise<ApiListResponse<IFee>> {
    noStore();
  
    const sesison = await auth();
    const userId = sesison?.user?.id;
  
    const modifiedSearchParams = {
      ...searchParams,
      userId: userId,
    };
    const result = await fetchListData<IFee>(
        FEE_URL.GET_FEES,
      modifiedSearchParams
    );
    if (!result.success) {
      console.error("Failed to fetch list IFee:", result.error);
      return { data: [], pageCount: 0, error: result.error };
    }
  
    return result.data;
  }
  