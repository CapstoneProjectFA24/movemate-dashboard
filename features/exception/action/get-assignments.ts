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
import { IAssignment } from "../types/assignemts-type";
import { auth } from "@/lib/next-auth/auth";
import { ASSIGNMENT_URL } from "@/constants/api-constant";

export async function getAssignments(
  searchParams: SearchParams
): Promise<ApiListResponse<IAssignment>> {
  noStore();

  const sesison = await auth();
  const userId = sesison?.user?.id;

  const modifiedSearchParams = {
    ...searchParams,
    userId: userId,
  };
  const result = await fetchListData<IAssignment>(
    ASSIGNMENT_URL.ASSIGNMENTS,
    modifiedSearchParams
  );
  if (!result.success) {
    console.error("Failed to fetch list assignment:", result.error);
    return { data: [], pageCount: 0, error: result.error };
  }

  return result.data;
}
