"use client";

import { ApiListResponse, ApiSingleResponse } from "@/lib/api/api-handler/generic";
import { useQuery } from "@tanstack/react-query";
import { getUsersById } from "../action/users";
import { IUser } from "../types/user-type";
import { IGroup } from "../types/group-type";
import { getGroup } from "../action/group";

export const useGetUserById = (params: string) => {
  return useQuery<ApiSingleResponse<IUser>>({
    queryKey: ["USER_ID", params],
    queryFn: () => getUsersById(params),
  });
};


export const useGetGroup = () => {
  return useQuery<ApiListResponse<IGroup>>({
    queryKey: ["GROUP"],
    queryFn: () => getGroup(),
  })
}