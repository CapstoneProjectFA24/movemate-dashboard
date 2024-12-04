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
import { MANAGE_SCHEDULE_URL } from "@/constants/api-constant";
import { IGroup } from "../types/group-type";

export async function getGroup(): Promise<ApiListResponse<IGroup>> {
  noStore();

  const result = await fetchListData<IGroup>(MANAGE_SCHEDULE_URL.GROUP);
  if (!result.success) {
    console.error("Failed to fetch GROUP:", result.error);
    return { data: [], pageCount: 0, error: result.error };
  }
  return result.data;
}

export async function updateGroup(
  data: any,
  params: string
): Promise<Result<void>> {
  noStore();

  const result = await apiRequest(() =>
    axiosAuth.put(`${MANAGE_SCHEDULE_URL.GROUP}/${params}`, data)
  );
  if (!result.success) {
    return { success: false, error: result.error };
  }

  revalidatePath(`/dashboard/users/manage_shift`);

  return { success: true, data: undefined };
}

export async function createGroup(data: any): Promise<Result<void>> {
  noStore();

  const result = await apiRequest(() =>
    axiosAuth.post(`${MANAGE_SCHEDULE_URL.GROUP}`, data)
  );
  if (!result.success) {
    return { success: false, error: result.error };
  }

  revalidatePath(`/dashboard/users/manage_shift`);

  return { success: true, data: undefined };
}

export async function deleteGroup(params: string): Promise<Result<void>> {
  noStore();

  const result = await apiRequest(() =>
    axiosAuth.delete(`${MANAGE_SCHEDULE_URL.GROUP}/${params}`)
  );
  if (!result.success) {
    return { success: false, error: result.error };
  }

  revalidatePath(`/dashboard/users/manage_shift`);

  return { success: true, data: undefined };
}
