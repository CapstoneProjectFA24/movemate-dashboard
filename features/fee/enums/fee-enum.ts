export enum FeeType {
  SYSTEM = "SYSTEM",
  PORTER = "PORTER",
  TRUCK = "TRUCK",
  DRIVER = "DRIVER",
  REVIEWER = "REVIEWER",
  WEEKEND = "WEEKEND",
  OUTSIDE = "OUTSIDE",
  HOLIDAY = "HOLIDAY",
}

export const FeeTypeName = {
  [FeeType.SYSTEM]: "Phí hệ thống",
  [FeeType.PORTER]: "Phí bốc vác",
  [FeeType.TRUCK]: "Phí vận chuyển",
  [FeeType.DRIVER]: "Phí vận chuyển + bốc vác",
  [FeeType.REVIEWER]: "Phí đánh giá",
  [FeeType.WEEKEND]: "Phí cuối tuần",
  [FeeType.OUTSIDE]: "Phí ngoại",
  [FeeType.HOLIDAY]: "Phí ngày lễ",
};
