import React from "react";
import { IBooking } from "../../../type/booking-type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarClock, MapPin } from "lucide-react";
import { formatDate, formatter } from "@/lib/utils";
import { useBookingStatus } from "@/features/bookings/hooks/use-booking-status";
// import { BookingStatus } from "@/features/bookings/enums/booking-state-enum";

interface NomarlInfoProps {
  booking: IBooking | null;
  canReview: boolean;
}

const NomarlInfo = ({ booking, canReview }: NomarlInfoProps) => {
  const router = useRouter();
  const params = useParams();
  const {
    statusMessage,
    canReviewOffline,
    canReviewOnline,
    isWaitingForPayment,
    isStaffEnroute,
    isStaffArrived,
    isReviewed,
  } = useBookingStatus(booking);

  return (
    <>
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.push("/dashboard/bookings")}
          className="mb-4"
          type="button"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại
        </Button>

        <div className="flex items-center space-x-4">
          <h2 className="text-3xl font-bold tracking-tight">Đơn dọn nhà</h2>
          {statusMessage && <div>{statusMessage}</div>}
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Mã đơn: {params.id}
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <CalendarClock className="h-5 w-5 mr-2 text-primary" />
            Thông tin chung & Địa chỉ
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
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Địa chỉ nhận
            </p>
            <p>
              <MapPin className="h-4 w-4 mr-1 inline" />
              {booking?.pickupAddress}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Địa chỉ giao
            </p>
            <p>
              <MapPin className="h-4 w-4 mr-1 inline" />
              {booking?.deliveryAddress}
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default NomarlInfo;
