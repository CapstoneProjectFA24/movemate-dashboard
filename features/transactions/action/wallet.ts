
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
import { BASIC_URL } from "@/constants/api-constant";



export async function checkWalletMoney(data: any): Promise<Result<void>> {
    noStore();
  
    const result = await apiRequest(() =>
      axiosAuth.post(`${BASIC_URL.WALLETS}`, data)
    );
    if (!result.success) {
      return { success: false, error: result.error };
    }
  
    return { success: true, data: undefined };
  }