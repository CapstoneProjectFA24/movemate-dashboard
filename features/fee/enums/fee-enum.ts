export enum FeeType {
  SYSTEM = "SYSTEM",
  PORTER = "PORTER",
  TRUCK = "TRUCK",
  DRIVER = "DRIVER",
  REVIEWER = "REVIEWER",
  WEEKEND = "WEEKEND",
  OUTSIDE = "OUTSIDE_BUSINESS_HOURS",
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

export const FeeLable = [
  { value: FeeType.SYSTEM, label: "Phí hệ thống" },
  { value: FeeType.PORTER, label: "Phí bốc vác" },
  { value: FeeType.TRUCK, label: "Phí vận chuyển" },
  { value: FeeType.DRIVER, label: "Phí vận chuyển + bốc vác" },
  { value: FeeType.REVIEWER, label: "Phí đánh giá" },
  { value: FeeType.WEEKEND, label: "Phí cuối tuần" },
  { value: FeeType.OUTSIDE, label: "Phí ngoại" },
  { value: FeeType.HOLIDAY, label: "Phí ngày lễ" },
];
