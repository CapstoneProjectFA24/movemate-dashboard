"use client";
import React from "react";
import { IBooking } from "../../../types/booking-type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle, MapPin } from "lucide-react";
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

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Thông tin đơn hàng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-500 mb-1">Ngày tạo</div>
              <div>{formatDate(booking?.createdAt)}</div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">Ngày đặt</div>
              <div>{formatDate(booking?.bookingAt)}</div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">Tổng tiền</div>
              <div className="font-medium text-primary">
                {formatter.format(booking?.total!)}
              </div>
            </div>
            <div>
              <div className="text-gray-500 mb-1">Trạng thái đặt cọc</div>
              <div>{booking?.isDeposited ? "Đã đặt cọc" : "Chưa đặt cọc"}</div>
            </div>
            <div className="col-span-2">
              <div className="text-gray-500 mb-1">Địa chỉ nhận</div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                {booking?.pickupAddress}
              </div>
            </div>
            <div className="col-span-2">
              <div className="text-gray-500 mb-1">Địa chỉ giao</div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                {booking?.deliveryAddress}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingDetail;
