"use client";

import { CreateNewServicesBookingModal } from "@/features/bookings/components/modal/create-booking-services-modal";
import { UpdateBookingServicesModalSheet } from "@/features/bookings/components/modal/update-booking-services-modal";
import { ConfirmEstimatedTimeModal } from "@/features/bookings/components/modal/confirm-estimate-time-modal";
import { CreateScheduleModal } from "@/features/bookings/components/modal/create-schedule-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <UpdateBookingServicesModalSheet />
      <CreateNewServicesBookingModal/>
      <CreateScheduleModal/>
      <ConfirmEstimatedTimeModal/>
    </>
  );
};
