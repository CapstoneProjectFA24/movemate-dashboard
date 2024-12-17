"use client";
import React from "react";
import { IBooking } from "../../../types/booking-type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  MessageCircle,
  MapPin,
  CreditCard,
  Calendar,
  Wallet,
} from "lucide-react";
import { formatDate, formatter } from "@/lib/utils";
import { useBookingStatus } from "@/features/bookings/hooks/use-booking-status";
import { useModal } from "@/hooks/use-modal";
import { useSession } from "next-auth/react";
import { useGetOrCreateUserConversation } from "@/features/chat-realtime/react-query/query";

interface BookingDetailProps {
  booking: IBooking | null;
  canReview: boolean;
}

const BookingDetail = ({ booking, canReview }: BookingDetailProps) => {
  const router = useRouter();
  const params = useParams();
  const { onOpen } = useModal();
  const { data: session } = useSession();

  const { mutateAsync: getOrCreateConversation } =
    useGetOrCreateUserConversation(
      booking?.id.toString()!,
      booking?.userId?.toString()!,
      session?.user.id.toString()!,
      session?.user.roleName.toLowerCase()!
    );

  const { statusMessage } = useBookingStatus(booking);

  const handleContact = () => {
    getOrCreateConversation();
    onOpen("chatWithUserModal", { booking: booking! });
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => router.push("/dashboard/bookings")}
            className="h-8"
            type="button"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-xl font-semibold">Đơn dọn nhà #{params.id}</h2>
            <Badge variant="secondary" className="mt-1">
              {statusMessage}
            </Badge>
          </div>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={handleContact}
          className="h-8"
          type="button"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Liên hệ với khách hàng
        </Button>
      </div>

      <Card className="shadow-md">
        <CardHeader className="border-b">
          <CardTitle className="text-lg font-semibold flex items-center">
            <CreditCard className="h-5 w-5 mr-2 text-primary" />
            Thông tin đơn hàng
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Thời gian */}
            <div className="space-y-4">
              <div className=" p-4 rounded-lg">
                <div className="flex items-center  mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="font-medium">Thời gian</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">
                      Ngày tạo
                    </div>
                    <div className="font-medium">
                      {formatDate(booking?.createdAt)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">
                      Ngày đặt
                    </div>
                    <div className="font-medium">
                      {formatDate(booking?.bookingAt)}
                    </div>
                  </div>
                  {booking?.isReviewOnline === false && (
                    <div>
                      <div className="text-sm text-muted-foreground mb-2">
                        Ngày hẹn đánh giá tại nhà cho khách hàng
                      </div>
                      <div className="font-medium">
                        {booking.reviewAt ? (
                          <div>{formatDate(booking?.reviewAt)}</div>
                        ) : (
                          "Chưa tạo lịch hẹn"
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Thông tin thanh toán */}
              <div className="p-4 rounded-lg">
                <div className="flex items-center  mb-2">
                  <Wallet className="h-4 w-4 mr-2" />
                  <span className="font-medium">Thông tin thanh toán</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground mb-2">
                      Tổng tiền:
                    </span>
                    <span className="font-semibold text-primary">
                      {formatter.format(booking?.total!)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground mb-2">
                      Tiền đặt cọc:
                    </span>
                    <span className="font-semibold text-primary">
                      {formatter.format(booking?.deposit!)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-sm text-muted-foreground mb-2">
                      Số tiền còn lại:
                    </span>
                    <span className="font-semibold text-primary">
                      {formatter.format(booking?.totalReal!)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm text-muted-foreground mb-2">
                      Trạng thái đặt cọc:
                    </span>
                    <Badge
                      variant={booking?.isDeposited ? "success" : "destructive"}
                    >
                      {booking?.isDeposited ? "Đã đặt cọc" : "Chưa đặt cọc"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Thông tin địa chỉ */}
            <div className=" p-4 rounded-lg">
              <div className="flex items-center  mb-4">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="font-medium">Thông tin địa chỉ</span>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="textext-sm text-muted-foreground mb-2">
                    Địa chỉ nhận:
                  </div>
                  <div className="p-3  rounded border">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      <span>{booking?.pickupAddress}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="textext-sm text-muted-foreground mb-2 ">
                    Địa chỉ giao:
                  </div>
                  <div className="p-3  rounded border">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      <span>{booking?.deliveryAddress}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingDetail;
