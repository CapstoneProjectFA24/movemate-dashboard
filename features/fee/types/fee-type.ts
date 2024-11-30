export type IFee = {
  id: number;
  serviceId?: number;
  houseTypeId?: number;
  name?: string;
  description?: string;
  amount?: number;
  isActived?: boolean;
  type?: string;
  unit?: string;
  rangeMin?: number;
  rangeMax?: number;
  discountRate?: number;
  floorPercentage?: number;
};
