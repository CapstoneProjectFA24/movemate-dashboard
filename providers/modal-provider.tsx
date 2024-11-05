"use client";


import { ConfirmEstimatedTimeModal } from "@/features/bookings/components/modal/confirm-estimate-time-modal";
import { CreateNewServicesBookingModal } from "@/components/modals/create-booking-services-modal";
import { CreateScheduleModal } from "@/features/bookings/components/modal/create-schedule-modal";
import { UpdateBookingServicesModalSheet } from "@/components/modals/update-booking-services-modal";
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
