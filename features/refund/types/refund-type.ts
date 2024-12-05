export type IRefund = {
  id: number;
  bookingId: number;
  type: string;
  time: string;
  status: string;
  bookingStatus: string;
  pickupAddress: string;
  deliveryAddress: string;
  deposit: number;
  total: number;
  totalReal: number;
  estimatedAmount: number;
  bookingAt: string;
  note: string;
  description: string;
  failedReason: string;
  owner: IOwner;
  trackerSources: ITrackerSource[];
};

export type IOwner = {
  id: number;
  name: string;
  phone: string;
  email: string;
};

export type ITrackerSource = {
  id: number;
  bookingTrackerId: number;
  resourceUrl: string;
  resourceCode: string;
  type: string;
};
