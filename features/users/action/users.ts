"use server";

import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { axiosAuth } from "@/lib/api/api-interceptor/api";
import {
  Result,
  ApiListResponse,
  ApiSingleResponse,
  apiRequest,
  fetchListData,
  fetchSingleData,
} from "@/lib/api/api-handler/generic";
import { SearchParams } from "@/types/table";
import { BASIC_URL } from "@/constants/api-constant";
import { IUser, UserRole } from "../types/user-type";

export async function getUsers(
  searchParams: SearchParams
): Promise<ApiListResponse<IUser>> {
  noStore();

  const result = await fetchListData<IUser>(BASIC_URL.GET_USERS, searchParams);
  if (!result.success) {
    console.error("Failed to fetch list user:", result.error);
    return { data: [], pageCount: 0, error: result.error };
  }
  return result.data;
}

export async function getUsersByRole(
  searchParams: SearchParams,
  roleName?: UserRole
): Promise<ApiListResponse<IUser>> {
  noStore();

  const url = roleName
    ? `${BASIC_URL.GET_USERS}?roleName=${roleName}`
    : BASIC_URL.GET_USERS;

  const result = await fetchListData<IUser>(url, searchParams);

  if (!result.success) {
    console.error(
      `Failed to fetch users${roleName ? ` with role ${roleName}` : ""}:`,
      result.error
    );
    return { data: [], pageCount: 0, error: result.error };
  }

  return result.data;
}

export async function getUserToAcceptEmployee(): Promise<ApiListResponse<IUser>>{
  const url =  `${BASIC_URL.GET_USERS}?roleName=DRIVER&isAccepted=false`


const result = await fetchListData<IUser>(url);

if (!result.success) {
  console.error(
    `Failed to fetch users `,
    result.error
  );
  return { data: [], pageCount: 0, error: result.error };
}

return result.data;
}

export async function getUsersById(params: string) : Promise<ApiSingleResponse<IUser>> {
  noStore();

  const result = await fetchSingleData<IUser>(`${BASIC_URL.GET_USERS}/${params}`)

  if (!result.success) {
    console.error("Failed to fetch user by id:", result.error);
    return { data: null };
  }
  return result.data;
}


export async function updateAccpet(
  params: string
): Promise<Result<void>> {
  noStore();

  console.log(params)
  const result = await apiRequest(() =>
    axiosAuth.put(`${BASIC_URL.GET_USERS}/accept-staff/${params}`)
  );
  if (!result.success) {
    return { success: false, error: result.error };
  }

  revalidatePath(`/dashboard/users/accept_employee`);

  return { success: true, data: undefined };
}