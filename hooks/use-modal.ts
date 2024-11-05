
import { BookingDetail, IBooking } from "@/features/bookings/type/booking-type";
import { create } from "zustand";


export type ModalType =
  | "updateBookingServicesModalSheet"
  | "createNewServicesBookingModal"
  | "createScheduleModal"
  | "confirmEstimatedTimeModal"
;


export interface ModalData{
  bookingDetail?: BookingDetail,
  booking?: IBooking ,
  bookingDetails?: BookingDetail[]
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false }),
}));