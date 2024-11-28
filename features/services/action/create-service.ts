"use server";

import { unstable_noStore as noStore, revalidatePath } from "next/cache";

import { Result, apiRequest } from "@/lib/api/api-handler/generic";

import { SERVICES_URL } from "@/constants/api-constant";
import { axiosAuth } from "@/lib/api/api-interceptor/api";

export async function createServices(data: any): Promise<Result<void>> {
  noStore();

  const result = await apiRequest(() =>
    axiosAuth.post(SERVICES_URL.CREATE_SERVICES, data)
  );
  if (!result.success) {
    return { success: false, error: result.error };
  }

  revalidatePath(`/dashboard/services`);
  return { success: true, data: undefined };
}
