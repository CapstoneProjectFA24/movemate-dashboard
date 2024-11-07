
import { BookingDetail, IBooking } from "@/features/bookings/type/booking-type";
import { IService, ITruckCategory } from "@/features/services/type/services-type";
import { create } from "zustand";


export type ModalType =
  | "updateBookingServicesModalSheet"
  | "createNewServicesBookingModal"
  | "createScheduleModal"
  | "confirmEstimatedTimeModal"
  | "createServicesModal"
;


export interface ModalData{
  // booking
  bookingDetail?: BookingDetail,
  booking?: IBooking ,
  bookingDetails?: BookingDetail[]

  // services
  service?: IService,
  truckCategorys?: ITruckCategory[]
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