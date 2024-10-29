"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Truck,
  Building2,
  MapPin,
  CalendarClock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
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
import {
  updateBookingOnlineDetail,
  updateBookingOnlineDetail1,
} from "../../action/bookings";
import BookingImages from "./booking-images";
import { IHouse } from "@/features/services/type/house-type";
import { formatDate, formatter } from "@/lib/utils";

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
    bookingDetails: booking?.bookingDetails || [],
  };

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues,
  });

  const onSubmit = async (data: BookingFormValues) => {
    console.log(data);
    try {
      setLoading(true);

      // // Gọi API thứ nhất
      // const result1 = await updateBookingOnlineDetail(params.id as string);
      // if (!result1.success) {
      //   throw new Error("API 1 failed");
      // }

      // // Gọi API thứ hai
      // const result2 = await updateBookingOnlineDetail1(
      //   params.id as string,
      //   data
      // );
      // if (!result2.success) {
      //   throw new Error("API 2 failed");
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
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.push("/dashboard/bookings")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại
        </Button>

        <div className="flex items-center space-x-4">
          <h2 className="text-3xl font-bold tracking-tight">Đơn dọn nhà</h2>
          {booking?.status && (
            <div
            // className={`px-3 py-1 rounded-full text-sm font-medium bg-${
            //   BookingStatusColors[booking.status ]
            // }-100 text-${BookingStatusColors[booking.status]}-700`}
            >
              Đang đợi đánh giá
            </div>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Mã đơn: {params.id}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarClock className="h-5 w-5 mr-2" />
              Thông tin chung
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Ngày tạo
              </p>
              <p>{formatDate(booking?.createdAt)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Ngày đặt
              </p>
              <p>{formatDate(booking?.bookingAt)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Tổng tiền
              </p>
              <p className="font-medium">{formatter.format(booking?.total!)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Đã đặt cọc
              </p>
              <p>{booking?.isDeposited ? "Rồi" : "Chưa"}</p>
            </div>
          </CardContent>
        </Card>
      </div>

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
                <FormField
                  control={form.control}
                  name="houseTypeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loại nhà</FormLabel>
                      <Select
                        disabled={loading || !canReview}
                        onValueChange={(value) =>
                          field.onChange(parseInt(value))
                        }
                        value={field.value.toString()}
                        defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn loại nhà" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {houseTypes?.map((type: IHouse) => (
                            <SelectItem
                              key={type.id}
                              value={type.id.toString()}
                            >
                              {type.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="roomNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Số phòng</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            disabled={loading || !canReview}
                            placeholder="Nhập số phòng"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="floorsNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Số tầng</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            disabled={loading || !canReview}
                            placeholder="Nhập số tầng"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="pickupAddress"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>
                        Địa chỉ cho nhân viên tới để dọn nhà
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading || !canReview}
                          placeholder="Nhập địa chỉ nhận đồ"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deliveryAddress"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Địa chỉ vận chuyển đi</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading || !canReview}
                          placeholder="Nhập địa chỉ giao đồ"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
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
