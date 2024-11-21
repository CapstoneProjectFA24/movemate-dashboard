
import { BookingDetail, IBooking } from "@/features/bookings/types/booking-type";
import { IService, ITruckCategory } from "@/features/services/types/services-type";
import { IUser } from "@/features/users/types/user-type";
import { create } from "zustand";


export type ModalType =
  | "updateBookingServicesModalSheet"
  | "createNewServicesBookingModal"
  | "createScheduleModal"
  | "confirmEstimatedTimeModal"
  | "createServicesModal"
  | "chatWithStaffModal"
;


export interface ModalData{
  // booking
  bookingDetail?: BookingDetail,
  booking?: IBooking ,
  bookingDetails?: BookingDetail[]

  // services
  service?: IService,
  truckCategorys?: ITruckCategory[]

  // user
  user?: IUser;
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