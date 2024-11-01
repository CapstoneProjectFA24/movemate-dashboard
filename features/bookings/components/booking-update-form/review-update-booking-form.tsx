"use client";
import { useState, useTransition } from "react";
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
import { BookingStateAssign } from "../../enums/booking-state-assign";
import { useBookingStatus } from "../../hooks/use-booking-status";
import AlertModal from "@/components/modals/alert-modal";
import { updateDetailStatus } from "../../action/update-booking";

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
}

const ReviewUpdateBookingForm = ({ booking, houseTypes }: BookingFormProps) => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const {
    statusMessage,
    canReviewOffline,
    canReviewOnline,
    isWaitingForPayment,
    isStaffEnroute,
    isStaffArrived,
    isReviewed,
    isInProgress,
    isInTransit,
    isDelivered,
    isCompleted,
    isSuggested,
  } = useBookingStatus(booking);
  console.log("canReviewOnline", canReviewOnline);
  console.log("canReviewOffline", canReviewOffline);
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

  const onConfirmReview = async () => {
    try {
      setLoading(true);
      if (canReviewOnline) {
        // Xử lý logic xác nhận đánh giá online  // TODO
        startTransition(async () => {
          const result = await updateDetailStatus(params.toString());
          if (!result.success) {
            toast.error(result.error);
            return;
          }

          toast.success("Cập nhật đánh giá thành công!");
        });
      }
      toast.error("Xác nhận đánh giá thành công");
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi xác nhận đánh giá");
    } finally {
      setLoading(false);
      setOpenReviewModal(false);
    }
  };

  const onConfirmUpdate = async () => {
    try {
      setLoading(true);
      if (canReviewOffline) {
        toast.success("Xác nhận đánh giá thành công");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi cập nhật đánh giá");
    } finally {
      setLoading(false);
      setOpenUpdateModal(false);
    }
  };

  const getButtonLabel = () => {
    if (isStaffEnroute) return "Xác nhận đã đến";
    if (isStaffArrived) return "Bắt đầu thực hiện";
    if (isInProgress) return "Cập nhật tiến độ";
    if (isInTransit) return "Xác nhận đã giao";
    if (isDelivered) return "Hoàn thành đơn";
    return "Cập nhật";
  };

  return (
    <>
      <AlertModal
        isOpen={openReviewModal}
        onClose={() => setOpenReviewModal(false)}
        onConfirm={onConfirmReview}
        loading={loading}
        title="Xác nhận đánh giá"
        description="Bạn có chắc chắn muốn xác nhận đánh giá này?"
      />
      <AlertModal
        isOpen={openUpdateModal}
        onClose={() => setOpenUpdateModal(false)}
        onConfirm={onConfirmUpdate}
        loading={loading}
        title="Cập nhật đánh giá"
        description="Bạn có chắc chắn muốn cập nhật trạng thái này?"
      />
      <div className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <NomarlInfo
              booking={booking}
              canReview={canReviewOffline || canReviewOnline}
            />
            <BookingImages bookingTrackers={booking?.bookingTrackers} />
            <DetailServices booking={booking} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UpdateBasicInfo
                control={form.control}
                houseTypes={houseTypes}
                loading={loading}
                canReview={canReviewOnline || canReviewOffline}
              />
              <AssignStaff booking={booking} />
            </div>

            <div className="flex items-center justify-end gap-4">
              {/* Button xác nhận đánh giá online */}
              {canReviewOnline && !isReviewed && (
                <Button
                  disabled={loading}
                  type="button"
                  onClick={() => setOpenReviewModal(true)}
                  className="bg-primary hover:bg-primary/90"
                >
                  Xác nhận đánh giá
                </Button>
              )}

              {/* Button cập nhật cho quy trình offline */}
              {canReviewOffline && !isCompleted && (
                <Button
                  disabled={loading || isWaitingForPayment}
                  type="button"
                  onClick={() => setOpenUpdateModal(true)}
                  className="bg-secondary hover:bg-secondary/90"
                >
                  {getButtonLabel()}
                </Button>
              )}

              {/* {(canReviewOffline || canReviewOnline) && !isCompleted && (
                <Button
                  disabled={loading || isWaitingForPayment}
                  type="submit"
                  className="bg-primary hover:bg-primary/90"
                >
                  Lưu thông tin
                </Button>
              )} */}
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default ReviewUpdateBookingForm;
