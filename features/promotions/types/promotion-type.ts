export type IPromotion = {
  id: number;
  name?: string;
  description?: string;
  quantity?: number;
  startDate?: string;
  endDate?: string;
  serviceId?: number;
  discountRate?: number;
  discountMax?: number;
  requireMin?: number;
  discountMin?: number;
  // vouchers : list...
};
