import React from "react";
import { IBooking } from "../../type/booking-type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarClock } from "lucide-react";
import { formatDate, formatter } from "@/lib/utils";

interface NomarlInfoProps {
  booking: IBooking | null;
}

const NomarlInfo = ({ booking }: NomarlInfoProps) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
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
    </>
  );
};

export default NomarlInfo;
