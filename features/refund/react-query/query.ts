"use client";

import { ApiListResponse, ApiSingleResponse } from "@/lib/api/api-handler/generic";
import { useQuery } from "@tanstack/react-query";
import { IWallet } from "../types/wallet-type";
import { getWallet } from "../actions/refund";



export const useGetWallet = () => {
  return useQuery<ApiSingleResponse<IWallet>>({
    queryKey: ["WALLET"],
    queryFn: () => getWallet(),
  })
}