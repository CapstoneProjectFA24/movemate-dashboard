"use server";

import { unstable_noStore as noStore, revalidatePath } from "next/cache";

import { Result, apiRequest } from "@/lib/api/api-handler/generic";

import { FEE_URL } from "@/constants/api-constant";
import { axiosAuth } from "@/lib/api/api-interceptor/api";

export async function createFee(data: any): Promise<Result<void>> {
  noStore();

  const result = await apiRequest(() =>
    axiosAuth.post(FEE_URL.FEES, data)
  );
  if (!result.success) {
    return { success: false, error: result.error };
  }

  revalidatePath(`/dashboard/fee`);
  return { success: true, data: undefined };
}
