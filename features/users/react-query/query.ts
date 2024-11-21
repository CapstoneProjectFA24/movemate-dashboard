"use client";

import { ApiSingleResponse } from "@/lib/api/api-handler/generic";
import { useQuery } from "@tanstack/react-query";
import { getUsersById } from "../action/users";
import { IUser } from "../types/user-type";

export const useGetUserById = (params: string) => {
  return useQuery<ApiSingleResponse<IUser>>({
    queryKey: ["USER_ID", params],
    queryFn: () => getUsersById(params),
  });
};
