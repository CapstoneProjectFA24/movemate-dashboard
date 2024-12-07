export type IStatisticTruckCategory = {
  totalTruckCategories: number;
  truckCategories: ItruckCategories[];
};

export type ItruckCategories = {
  truckCategoryId: number;
  truckCategoryName: string;
  totalTrucks: number;
  totalBookings: number;
};
