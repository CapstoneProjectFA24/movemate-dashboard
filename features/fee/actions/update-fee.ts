"use server";

import { unstable_noStore as noStore, revalidatePath } from "next/cache";

import { Result, apiRequest } from "@/lib/api/api-handler/generic";

import { FEE_URL } from "@/constants/api-constant";
import { axiosAuth } from "@/lib/api/api-interceptor/api";

export async function updateFee(
  data: any,
  params: string
): Promise<Result<void>> {
  noStore();

  console.log(data);
  const result = await apiRequest(() =>
    axiosAuth.put(`${FEE_URL.FEES}/${params}`, data)
  );
  if (!result.success) {
    return { success: false, error: result.error };
  }

  revalidatePath(`/dashboard/fee/${params}`);

  return { success: true, data: undefined };
}
