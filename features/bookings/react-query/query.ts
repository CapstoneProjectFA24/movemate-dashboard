"use client";

import { IService } from "@/features/services/type/services-type";
import { ApiListResponse } from "@/lib/api/api-handler/generic";
import { useQuery } from "@tanstack/react-query";
import { getServicesUpdateBooking } from "../action/services-update-booking";
import { ServiceType } from "@/features/services/enums/service-enum";

export const useGetServicesToUpdateBooking = (type?: ServiceType) => {
  return useQuery<ApiListResponse<IService>>({
    queryKey: ["SERVICES_BOOKING", type],
    queryFn: () => getServicesUpdateBooking(type),
  });
};
