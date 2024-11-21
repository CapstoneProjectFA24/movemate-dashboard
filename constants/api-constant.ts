export const BASIC_URL ={
    GET_USERS : '/users',
    GET_TRANSACTIONS: "/transactions",
}

export const SERVICES_URL = {
  GET_SERVICES: "/services",
  CREATE_SERVICES: "/services/manage/create-service",
  UPDATE_SERVICES: "/services/manager",
  GET_HOUSE_TYPE: "/housetypes",
  GET_TRUCK_CATEGORY: "/truckcategorys",
};

export const BOOKING_URL = {
  GET_BOOKINGS : "/bookings",
  UPDATE_DETAILS_STATUS: "/bookingdetails/reviewer/update-status",
  UPDATE_BOOKING_STATUS: "/bookings/reviewer/update-booking",
  UPDATE_BOOKING_SCHEDULE: "/bookings/reviewer/review-at"
};


export const ASSIGNMENT_URL = {
  ASSIGNED_STAFF : "/assignments",
  CHECK_DRIVER_ASSIGNMENT : "/assignments/available-driver",
  CHECK_PORTER_ASSIGNMENT : "/assignments/available-porter"
}