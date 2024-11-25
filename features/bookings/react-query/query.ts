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
import axios from "axios";

export const useGetServicesToUpdateBooking = (
  type?: ServiceType,
  houseTypeId?: number,
  floorsNumber?: string,
  estimatedDistance?: string
) => {
  return useQuery<ApiListResponse<IService>>({
    queryKey: ["SERVICES_BOOKING", type, houseTypeId, floorsNumber, estimatedDistance],
    queryFn: () =>
      getServicesUpdateBooking(type, houseTypeId, floorsNumber, estimatedDistance),
  });
};

export const useGetCheckAvailableDriver = (params: string, loadingKey?: number) => {
  return useQuery<ApiSingleResponse<IAssigmentAvailable>>({
    queryKey: ["CHECK_DRIVER_ASSIGNMENT", params,, loadingKey],
    queryFn: () => getCheckAvailableDriver(params),
    staleTime: 0,  // Đánh dấu dữ liệu là cũ ngay lập tức
    refetchOnWindowFocus: true,  // Fetch lại dữ liệu mỗi khi tab trở lại
    refetchOnMount: true,  // Fetch lại dữ liệu mỗi lần component mount lại
  });
};
export const useGetCheckAvailablePorter = (params: string, loadingKey?: number) => {
  return useQuery<ApiSingleResponse<IAssigmentAvailable>>({
    queryKey: ["CHECK_PORTER_ASSIGNMENT", params,, loadingKey],
    queryFn: () => getCheckAvailablePorter(params),
    staleTime: 0,  // Đánh dấu dữ liệu là cũ ngay lập tức
    refetchOnWindowFocus: true,  // Fetch lại dữ liệu mỗi khi tab trở lại
    refetchOnMount: true,  // Fetch lại dữ liệu mỗi lần component mount lại
  });
};

export const useGetDurationVietmap = (
  pickupPoint: string,
  deliveryPoint: string
) => {
  return useQuery({
    queryKey: ["VIETMAP"],
    queryFn: async () => {
      if (!pickupPoint || !deliveryPoint) {
        throw new Error("Start pickupPoint and end deliveryPoint are required");
      }
      // https://maps.vietmap.vn/api/matrix?api-version=1.1&apikey=be00f7e132bdd086ccd57e21460209836f5d37ce56beaa42&point=10.767782,106.611362&point=10.774934,106.623477

      const { data } = await axios.get(
        `/api/vietmap?pickupPoint=${pickupPoint}&deliveryPoint=${deliveryPoint}`
      );
      return data;
    },
  });
};
