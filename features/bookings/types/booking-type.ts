export type IBooking = {
    id: number;
    userId?: number;
    houseTypeId?: number;
    deposit?: number;
    status?: string;
    pickupAddress?: string;
    pickupPoint?: string;
    deliveryAddress?: string;
    deliveryPoint?: string;
    isUseBox?: boolean;
    boxType?: string | null;
    estimatedDistance?: string;
    total?: number;
    totalReal?: number;
    estimatedDeliveryTime?: string | null;
    isDeposited?: boolean;
    isBonus?: boolean;
    isReported?: boolean;
    reportedReason?: string | null;
    isDeleted?: boolean;
    createdAt?: string;
    bookingAt?: string;
    createdBy?: string | null;
    updatedAt?: string;
    updatedBy?: string | null;
    review?: string | null;
    bonus?: string | null;
    typeBooking?: string;
    estimatedAcreage?: string | null;
    roomNumber?: string;
    floorsNumber?: string;
    isManyItems?: boolean;
    isCancel?: boolean;
    cancelReason?: string | null;
    isPorter?: boolean;
    isRoundTrip?: boolean;
    note?: string;
    totalFee?: number;
    feeInfo?: string | null;
    isReviewOnline?: boolean;
    reviewAt?: string;
    assignments?: Assignment[];
    bookingTrackers?: BookingTracker[];
    bookingDetails?: BookingDetail[];
    feeDetails?: FeeDetail[];
  };
  
  export type Assignment = {
    id?: number;
    userId?: number;
    bookingId?: number;
    status?: string;
    price?: number | null;
    staffType?: string;
    isResponsible?: boolean | null;
  };
  
  export type BookingTracker = {
    id?: number;
    bookingId?: number;
    time?: string;
    type?: string;
    location?: string | null;
    point?: string | null;
    description?: string | null;
    status?: string | null;
    trackerSources?: TrackerSource[];
  };
  
  export type TrackerSource = {
    id?: number;
    bookingTrackerId?: number;
    resourceUrl?: string;
    resourceCode?: string;
    type?: string;
  };
  
  export type BookingDetail = {
    id?: number;
    serviceId: number;
    bookingId?: number;
    quantity: number;
    price?: number;
    status?: string | null;
    type?: string;
    name?: string;
    description?: string;
  };
  
  export type FeeDetail = {
    id?: number;
    bookingId?: number;
    feeSettingId?: number;
    name?: string;
    description?: string;
    amount?: number;
    quantity?: number | null;
  };
  