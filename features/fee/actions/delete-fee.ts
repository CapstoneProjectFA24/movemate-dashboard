"use server";

import { unstable_noStore as noStore, revalidatePath } from "next/cache";

import { Result, apiRequest } from "@/lib/api/api-handler/generic";

import { FEE_URL } from "@/constants/api-constant";
import { axiosAuth } from "@/lib/api/api-interceptor/api";

export async function deleteFee(params: string): Promise<Result<void>> {
  noStore();

  const result = await apiRequest(() =>
    axiosAuth.delete(`${FEE_URL.FEES}/${params}`)
  );
  if (!result.success) {
    return { success: false, error: result.error };
  }

  revalidatePath(`/dashboard/fee/${params}`);

  return { success: true, data: undefined };
}
