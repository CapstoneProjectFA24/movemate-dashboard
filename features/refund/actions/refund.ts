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
import { ASSIGNMENT_URL } from "@/constants/api-constant";
import { IRefund } from "../types/refund-type";


export async function getRefunds(
    searchParams: SearchParams
  ): Promise<ApiListResponse<IRefund>> {
    noStore();
  
    const sesison = await auth();
    const userId = sesison?.user?.id;
  
    const modifiedSearchParams = {
      ...searchParams,
      userId: userId,
    };
    const result = await fetchListData<IRefund>(
      ASSIGNMENT_URL.ASSIGNMENTS_WAITING,
      modifiedSearchParams
    );
    if (!result.success) {
      console.error("Failed to fetch list IRefund:", result.error);
      return { data: [], pageCount: 0, error: result.error };
    }
  
    return result.data;
  }
  