"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useParams, useRouter } from "next/navigation";
import { Truck, Building2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertModal } from "@/components/modals/alert-modal";
import { toast } from "sonner";
import {
  BookingStatus,
  BookingStatusColors,
  BookingStatusIcons,
  BookingStatusNames,
} from "../../enums/booking-state-enum";
import { IBooking } from "../../type/booking-type";

import BookingImages from "./booking-images";
import { IHouse } from "@/features/services/type/house-type";
import FormFieldCustom from "@/components/form/form-field";
import SelectFormField from "@/components/form/select-form-field";
import NomarlInfo from "./normal-info";

const bookingSchema = z.object({
  truckCategoryId: z.number(),
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
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const canReview =
    (isReviewOnline && booking?.status === BookingStatus.ASSIGNED) ||
    booking?.status === BookingStatus.REVIEWING;

  const defaultValues: BookingFormValues = {
    truckCategoryId: 1,
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

      // // Gọi API thứ hai
      // const result = await updateBookingStatus(
      //   params.id as string,
      //   data
      // );
      // if (!result.success) {
      //   throw new Error("API failed");
      // }

      toast.success("Cập nhật đơn dọn nhà thành công");
      // router.push("/dashboard/bookings");
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi cập nhật");
      console.error("Error updating booking:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" mx-auto p-6">
      <NomarlInfo booking={booking} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <BookingImages bookingTrackers={booking?.bookingTrackers} />
          <div className="grid grid-cols-1 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="h-5 w-5 mr-2" />
                  Thông tin địa điểm
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6">
                <SelectFormField
                  control={form.control}
                  name="houseTypeId"
                  label="Loại nhà"
                  placeholder="Chọn loại nhà"
                  options={houseTypes} // list cần chọn
                  renderOption={(option) => option.name} // chọn loại render cần thiết
                  loading={loading}
                  canReview={canReview}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormFieldCustom
                    control={form.control}
                    name="roomNumber"
                    label="Số phòng"
                    placeholder="Nhập số phòng"
                    type="number"
                    disabled={loading || !canReview}
                  />
                  <FormFieldCustom
                    control={form.control}
                    name="floorsNumber"
                    label="Số tầng"
                    placeholder="Nhập số tầng"
                    type="number"
                    disabled={loading || !canReview}
                  />
                </div>
                <FormFieldCustom
                  control={form.control}
                  name="pickupAddress"
                  label="  Địa chỉ cho nhân viên tới để dọn nhà"
                  placeholder="Nhập địa chỉ nhận đồ"
                  classNameItem="col-span-2"
                  disabled={loading || !canReview}
                />
                <FormFieldCustom
                  control={form.control}
                  name="deliveryAddress"
                  label="Địa chỉ vận chuyển đi"
                  placeholder="Nhập địa chỉ giao đồ"
                  classNameItem="col-span-2"
                  disabled={loading || !canReview}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="h-5 w-5 mr-2" />
                  Dịch vụ đã chọn
                </CardTitle>
              </CardHeader>
              <CardContent>
                {booking?.bookingDetails &&
                booking.bookingDetails.length > 0 ? (
                  <div className="grid gap-4">
                    {booking.bookingDetails.map((detail, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 rounded-lg  bg-muted/40"
                      >
                        <div>
                          <p className="font-medium text-gray-500">
                            Dịch vụ {detail.serviceId}
                          </p>
                          <p className="text-sm text-gray-500">
                            Số lượng: {detail.quantity}
                          </p>
                          <p className="text-sm text-gray-500">
                            Số lượng: {detail.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    Chưa có dịch vụ nào được chọn
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center justify-end gap-4">
            {canReview && (
              <Button disabled={loading} type="submit">
                Xác nhận đánh giá
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ReviewUpdateBookingForm;
