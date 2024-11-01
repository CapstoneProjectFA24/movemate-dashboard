import { getBooking } from "@/features/bookings/action/bookings";
import ReviewUpdateBookingForm from "@/features/bookings/components/booking-update-form/review-update-booking-form";
import { getHouses } from "@/features/services/action/houses";
import React from "react";

const ReviewerBookingDetailPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const [bookingResponse, houseTypesResponse] = await Promise.all([
    getBooking(id),
    getHouses(),
  ]);

  return (
    <div>
      <ReviewUpdateBookingForm
        booking={bookingResponse?.data}
        houseTypes={houseTypesResponse?.data}
      />
    </div>
  );
};

export default ReviewerBookingDetailPage;
