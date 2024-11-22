"use server";

import { unstable_noStore as noStore, revalidatePath } from "next/cache";

import { Result, apiRequest } from "@/lib/api/api-handler/generic";

import { ASSIGNMENT_URL } from "@/constants/api-constant";
import { axiosAuth } from "@/lib/api/api-interceptor/api";

export async function autoAssignDriver(params: string): Promise<Result<void>> {
  noStore();
  console.log(params)
  const result = await apiRequest(() =>
    axiosAuth.patch(`${ASSIGNMENT_URL.AUTO_ASSINGED_DRIVER}/${params}`)
  );
  if (!result.success) {
    return { success: false, error: result.error };
  }

  revalidatePath(`/dashboard/bookings_exception/${params}`);

  return { success: true, data: undefined };
}

export async function autoAssignPorter(params: string): Promise<Result<void>> {
  noStore();

  const result = await apiRequest(() =>
    axiosAuth.patch(`${ASSIGNMENT_URL.AUTO_ASSINGED_PORTER}/${params}`)
  );
  if (!result.success) {
    return { success: false, error: result.error };
  }

  revalidatePath(`/dashboard/bookings_exception/${params}`);

  return { success: true, data: undefined };
}

export async function manualAssignedStaff(
  data: any,
  params: string
): Promise<Result<void>> {
  noStore();

  console.log(data);
  const result = await apiRequest(() =>
    axiosAuth.patch(`${ASSIGNMENT_URL.MANUAL_ASSIGNED}/${params}`, data)
  );
  if (!result.success) {
    return { success: false, error: result.error };
  }

  revalidatePath(`/dashboard/bookings_exception/${params}`);

  return { success: true, data: undefined };
}
