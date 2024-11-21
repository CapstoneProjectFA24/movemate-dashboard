"use client";

import { IService } from "@/features/services/types/services-type";
import {
  ApiListResponse,
  ApiSingleResponse,
} from "@/lib/api/api-handler/generic";
import { useQuery } from "@tanstack/react-query";
import { getServicesUpdateBooking } from "../action/services-update-booking";
import { ServiceType } from "@/features/services/enums/service-enum";
import { IAssigmentAvailable } from "../types/assigment-available-type";
import {
  getCheckAvailableDriver,
  getCheckAvailablePorter,
} from "../action/assignments";

export const useGetServicesToUpdateBooking = (type?: ServiceType) => {
  return useQuery<ApiListResponse<IService>>({
    queryKey: ["SERVICES_BOOKING", type],
    queryFn: () => getServicesUpdateBooking(type),
  });
};

export const useGetCheckAvailableDriver = (params: string) => {
  return useQuery<ApiSingleResponse<IAssigmentAvailable>>({
    queryKey: ["CHECK_DRIVER_ASSIGNMENT", params],
    queryFn: () => getCheckAvailableDriver(params),
  });
};
export const useGetCheckAvailablePorter = (params: string) => {
  return useQuery<ApiSingleResponse<IAssigmentAvailable>>({
    queryKey: ["CHECK_PORTER_ASSIGNMENT", params],
    queryFn: () => getCheckAvailablePorter(params),
  });
};
