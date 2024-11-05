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
import { ITransaction } from "../type/transaction-type";

export async function getTransactions(
  searchParams: SearchParams
): Promise<ApiListResponse<ITransaction>> {
  noStore();

  const result = await fetchListData<ITransaction>(BASIC_URL.GET_TRANSACTIONS, searchParams);
  if (!result.success) {
    console.error("Failed to fetch list transactions:", result.error);
    return { data: [], pageCount: 0, error: result.error };
  }
  return result.data;
}

