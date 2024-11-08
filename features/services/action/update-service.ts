"use server";

import { unstable_noStore as noStore, revalidatePath } from "next/cache";

import { Result, apiRequest } from "@/lib/api/api-handler/generic";

import { SERVICES_URL } from "@/constants/api-constant";
import { axiosAuth } from "@/lib/api/api-interceptor/api";

export async function updateService(
  data: any,
  params: string
): Promise<Result<void>> {
  noStore();

  console.log(data);
  const result = await apiRequest(() =>
    axiosAuth.put(`${SERVICES_URL.UPDATE_SERVICES}/${params}`, data)
  );
  if (!result.success) {
    return { success: false, error: result.error };
  }

  revalidatePath(`/services/${params}`);

  return { success: true, data: undefined };
}
