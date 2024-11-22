export enum AssignmentType {
  TRUCK = "TRUCK",
  PORTER = "PORTER",
}

export const AssignmentTypeNames = {
  [AssignmentType.PORTER]: "Thiếu Nhân Viên Bốc Xếp",
  [AssignmentType.TRUCK]: "Thiếu Tài Xế",
};

export enum AssignmentStatus {
  WAITING = "WAITING",
}

export const AssignmentStatusName = {
    [AssignmentStatus.WAITING]: "Đang Chờ",
}
