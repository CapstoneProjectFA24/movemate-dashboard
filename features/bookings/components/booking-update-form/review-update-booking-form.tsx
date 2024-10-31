"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import {
  BookingStatus,
  BookingStatusColors,
  BookingStatusIcons,
  BookingStatusNames,
} from "../../enums/booking-state-enum";
import { IBooking } from "../../type/booking-type";

import BookingImages from "./main-ui-booking-form/booking-images";
import { IHouse } from "@/features/services/type/house-type";

import NomarlInfo from "./main-ui-booking-form/normal-info";
import DetailServices from "./main-ui-booking-form/detail-services";
import UpdateBasicInfo from "./main-ui-booking-form/update-basic-info";
import AssignStaff from "./main-ui-booking-form/assign-staff";
import { AlertModal } from "@/components/modals/alert-modal";
import { BookingStateAssign } from "../../enums/booking-state-assign";

const bookingSchema = z.object({
  houseTypeId: z.number(),
  pickupAddress: z.string().min(1, "Pickup address is required"),
  pickupPoint: z.string().min(1, "Pickup point is required"),
  deliveryAddress: z.string().min(1, "Delivery address is required"),
  deliveryPoint: z.string().min(1, "Delivery point is required"),
  estimatedDistance: z.string(),
  isRoundTrip: z.boolean(),
  roomNumber: z.string(),
  floorsNumber: z.string(),
  bookingDetails: z.array(
    z.object({
      serviceId: z.number(),
      quantity: z.number(),
    })
  ),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  booking: IBooking | null;
  houseTypes: IHouse[] | null;
  isReviewOnline?: boolean;
}

const ReviewUpdateBookingForm = ({
  booking,
  houseTypes,
  isReviewOnline = false,
}: BookingFormProps) => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const canReview =
    (isReviewOnline && booking?.status === BookingStatus.ASSIGNED) ||
    booking?.status === BookingStatus.REVIEWING;

  const isReview = true || false ;

  // logic
  // reviewOnline và reviewOff chỉ có thể cập nhật trạng thái khi REVIEWING
  // ngoại phụ một xíu là reviewOff thêm điều kiện là SUGGESTED trong assignments list trong booking đó và cần phải filter 
  //lấy role của  "staffType": "REVIEWER",
  const review = booking?.assignments!.some((assignment) => {
      assignment.status === BookingStateAssign.SUGGESTED && assignment.staffType === "REVIEWER"
  })
 
  console.log(review)

  const defaultValues: BookingFormValues = {
    houseTypeId: booking?.houseTypeId || 0,
    pickupAddress: booking?.pickupAddress || "",
    pickupPoint: booking?.pickupPoint || "",
    deliveryAddress: booking?.deliveryAddress || "",
    deliveryPoint: booking?.deliveryPoint || "",
    estimatedDistance: booking?.estimatedDistance || "",
    isRoundTrip: booking?.isRoundTrip || false,
    roomNumber: booking?.roomNumber || "",
    floorsNumber: booking?.floorsNumber || "",
    bookingDetails: (booking?.bookingDetails || []).map((detail) => ({
      serviceId: detail.serviceId ?? 0,
      quantity: detail.quantity ?? 1,
    })),
  };

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues,
  });

  const onSubmit = async (data: BookingFormValues) => {
    console.log(data);
    try {
      setLoading(true);

      toast.success("Cập nhật đơn dọn nhà thành công");
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi cập nhật");
      console.error("Error updating booking:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitUpdate = async () => {
    try {
      console.log("update ne");
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onSubmitUpdate}
        loading={loading}
      />
      <div className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <NomarlInfo booking={booking} />
            <BookingImages bookingTrackers={booking?.bookingTrackers} />
            <DetailServices booking={booking} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UpdateBasicInfo
                control={form.control}
                houseTypes={houseTypes}
                loading={loading}
                canReview={canReview}
              />

              <AssignStaff booking={booking} />
            </div>

            <div className="flex items-center justify-end gap-4">
              {canReview && (
                <Button
                  disabled={loading}
                  type="button"
                  onClick={() => setOpen(true)}
                >
                  Xác nhận đánh giá
                </Button>
              )}
              {canReview && (
                <Button disabled={loading} type="button">
                  Cập nhật
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default ReviewUpdateBookingForm;
