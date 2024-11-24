"use client";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";

import { IBooking } from "../../types/booking-type";
import { IHouse } from "@/features/services/types/house-type";

import BookingImages from "./main-ui-booking-form/booking-images";
import NomarlInfo from "./main-ui-booking-form/normal-info";
import DetailServices from "./main-ui-booking-form/detail-services";
import UpdateBasicInfo from "./main-ui-booking-form/update-basic-info";
import AssignStaff from "./main-ui-booking-form/assign-staff";
import { useBookingStatus } from "../../hooks/use-booking-status";
import { updateDetailStatus } from "../../action/update-booking";
import AlertModal from "../modal/alert-modal";
import { useModal } from "@/hooks/use-modal";

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
  bookingAt: z.string(),
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
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const { onOpen } = useModal();

  const {
    statusMessage,
    canReviewOffline,
    canReviewOnline,
    canCreateSchedule,
    canConfirmReview,
    canUpdateServices,
    canConfirmArrival,
    canConfirmMoving,
    canConfirmSuggestion,
    isWaitingCustomer,
    isWaitingPayment,
    isStaffEnroute,
    isStaffArrived,
    isSuggested,
    isReviewed,
    isInProgress,
    isInTransit,
    isDelivered,
    isCompleted,
  } = useBookingStatus(booking);

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
    bookingAt: booking?.bookingAt || "",
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
    } finally {
      setLoading(false);
    }
  };

  const onConfirmReview = async () => {
    try {
      setLoading(true);
      if (canConfirmReview) {
        startTransition(async () => {
          const result = await updateDetailStatus(params.toString());
          if (!result.success) {
            toast.error(result.error);
            return;
          }
          toast.success("Xác nhận đánh giá thành công!");
        });
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi xác nhận đánh giá");
    } finally {
      setLoading(false);
    }
  };

  const onConfirmUpdate = async () => {
    try {
      setLoading(true);
      if (
        canUpdateServices ||
        canConfirmMoving ||
        canConfirmArrival ||
        (canConfirmSuggestion && !isReviewed)
      ) {
        const result = await updateDetailStatus(params.id.toString());
        if (!result.success) {
          toast.error(result.error);
          return;
        }
        toast.success("Cập nhật trạng thái thành công");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi cập nhật trạng thái");
    } finally {
      setLoading(false);
      setOpenUpdateModal(false);
    }
  };

  const getUpdateButtonLabel = () => {
    if (canConfirmMoving) return "Xác nhận di chuyển";
    if (canConfirmArrival) return "Xác nhận đã đến";

    if (isInProgress) return "Cập nhật tiến độ";
    if (isInTransit) return "Xác nhận đã giao";
    if (isDelivered) return "Hoàn thành đơn";
    return "Cập nhật";
  };

  const shouldShowUpdateButton =
    canConfirmMoving ||
    canConfirmArrival ||
    canUpdateServices ||
    (isInProgress && !isCompleted);

  const isButtonDisabled =
    loading || isWaitingCustomer || isWaitingPayment || isCompleted;

  return (
    <>
      <AlertModal
        isOpen={openUpdateModal}
        onClose={() => setOpenUpdateModal(false)}
        onConfirm={onConfirmUpdate}
        loading={loading}
        title="Cập nhật trạng thái"
        description="Bạn có chắc chắn muốn cập nhật trạng thái này?"
      />
      <div className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <NomarlInfo booking={booking} canReview={canUpdateServices} />
            <BookingImages bookingTrackers={booking?.bookingTrackers} />
            <DetailServices booking={booking} canReview={canUpdateServices} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UpdateBasicInfo
                control={form.control}
                houseTypes={houseTypes}
                loading={loading}
                canReview={canUpdateServices}
              />
              <AssignStaff booking={booking} />
            </div>

            <div className="flex items-center justify-end gap-4">
              {canCreateSchedule && (
                <Button
                  disabled={isButtonDisabled}
                  type="button"
                  onClick={() =>
                    onOpen("createScheduleModal", { booking: booking! })
                  }
                  className="dark:bg-secondary dark:hover:bg-secondary/90"
                >
                  Xếp lịch với khách
                </Button>
              )}
              {canConfirmSuggestion && !isReviewed && !canCreateSchedule && (
                <Button
                  disabled={isButtonDisabled}
                  type="button"
                  onClick={() =>
                    onOpen("confirmEstimatedTimeModal", { booking: booking! })
                  }
                  className="dark:bg-secondary dark:hover:bg-secondary/90"
                >
                  Xác nhận đề xuất
                </Button>
              )}
              {shouldShowUpdateButton &&
                !canCreateSchedule &&
                !canConfirmSuggestion && (
                  <Button
                    disabled={isButtonDisabled}
                    type="button"
                    onClick={() => setOpenUpdateModal(true)}
                    className="dark:bg-secondary dark:hover:bg-secondary/90"
                  >
                    {getUpdateButtonLabel()}
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
