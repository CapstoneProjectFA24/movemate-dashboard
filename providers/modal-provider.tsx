"use client";
import { useEffect, useState } from "react";

import { ConfirmEstimatedTimeModal } from "@/features/bookings/components/modal/confirm-estimate-time-modal";
import { CreateNewServicesBookingModal } from "@/components/modals/create-booking-services-modal";
import { CreateScheduleModal } from "@/features/bookings/components/modal/create-schedule-modal";
import { UpdateBookingServicesModalSheet } from "@/components/modals/update-booking-services-modal";
import { CreateServicesModal } from "@/features/services/components/services-modal/create-services-modal";
import { UpdateServicesModal } from "@/features/services/components/services-modal/update-services-modal";
import { ChatModal } from "@/components/modals/chat-modal/chat-modal";
import { CheckAssignmentModal } from "@/features/bookings/components/modal/check-assignment-modal";
import { ExceptionModal } from "@/features/exception/components/modal/exception-modal";
import { ChatUserModal } from "@/components/modals/chat-modal/chat-user-modal";
import { CreateHouseModal } from "@/features/services-settings/components/house-setting/house-setting-modal";

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
      <CreateServicesModal/>
      <UpdateServicesModal/>
      <ChatModal/>
      <ChatUserModal/>
      <CheckAssignmentModal/>
      <ExceptionModal/>
      <CreateHouseModal/>
    </>
  );
};
