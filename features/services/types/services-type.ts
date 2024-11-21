export type ITruckCategory = {
  id: number;
  categoryName: string;
  maxLoad: number;
  description: string;
  imgUrl: string;
  estimatedLength: string;
  estimatedWidth: string;
  estimatedHeight: string;
  summarize: string;
  price: number;
  totalTrips: number;
} | null;

export type IService = {
  id: number;
  name: string;
  description: string;
  isActived: boolean;
  tier: number;
  imageUrl: string;
  discountRate: number;
  type: string;
  amount: number;
  parentServiceId: number;
  inverseParentService: IService[];
  isQuantity?: boolean;
  quantityMax?: number | null;
  truckCategoryId?: number;
  truckCategory?: ITruckCategory;
};
