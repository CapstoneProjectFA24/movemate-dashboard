export enum RefundType {
  REFUND = "REFUND",
  MONETARY = "MONETARY",
}

export const RefundTypeName = {
  [RefundType.REFUND]: "Yêu cầu hoàn tiền",
  [RefundType.MONETARY]: "Yêu cầu bồi thường",
};

export enum StatusTrackerType {
  PENDING = "PENDING",
  WAITING = "WAITING",
  AVAILABLE = "AVAILABLE",
  NOTAVAILABLE = "NOTAVAILABLE",
}

export const StatusTrackerTypeName = {
  [StatusTrackerType.WAITING]: "Chờ xác thực",
  [StatusTrackerType.AVAILABLE]: "Xử lý xong",
  [StatusTrackerType.NOTAVAILABLE]: "Không chấp thuận",
};
