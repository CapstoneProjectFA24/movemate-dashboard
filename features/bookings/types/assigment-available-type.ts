export type IAssigmentAvailable = {
  bookingNeedStaffs?: number;
  countStaffInslots?: number;
  countOtherStaff?: number;
  staffType?: string;
  isSuccessed?: boolean;
  assignmentInBooking?: IAssignmentInBooking[];
  staffInSlot?: IStaff[];
  otherStaffs?: IStaff[];
};

export type IAssignmentInBooking = {
  id?: number;
  userId?: number;
  bookingId?: number;
  status?: string;
  staffType?: string;
  isResponsible?: boolean;
};

export type IStaff = {
  id?: number;
  roleName?: string;
  name?: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
};
