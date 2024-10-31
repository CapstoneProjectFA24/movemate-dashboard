"use client";

import { CreateNewServicesBookingModal } from "@/features/bookings/components/booking-modal/create-booking-services-modal";
import { UpdateBookingServicesModalSheet } from "@/features/bookings/components/booking-modal/update-booking-services-modal";
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
    </>
  );
};
