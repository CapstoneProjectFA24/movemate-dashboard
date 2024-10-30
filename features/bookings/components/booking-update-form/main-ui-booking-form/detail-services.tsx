"use client";
import React from "react";
import { IBooking } from "../../../type/booking-type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarClock, Edit } from "lucide-react";
import { formatter } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";

interface DetailServicesProps {
  booking: IBooking | null;
  // onUpdate: (detail: any) => void;
}

const DetailServices = ({
  booking,
}: // onUpdate
DetailServicesProps) => {
  const { onOpen } = useModal();
// console.log("booking:", booking)
// booking:  {
//   id: 163 
//   ....
//   bookingDetails: [
//     {
//       id: 568,
//       serviceId: 9,
//       bookingId: 163,
//       quantity: 2,
//       price: 600000,
//       status: null,
//       type: 'DISASSEMBLE',
//       name: 'Tháo lắp, đóng gói máy lạnh',
//       description: 'Mô tả cho dịch vụ con 1'
//     },
//     {
//       id: 569,
//       serviceId: 2,
//       bookingId: 163,
//       quantity: 2,
//       price: 240000,
//       status: null,
//       type: 'PORTER',
//       name: 'Bốc xếp (Bởi tài xế)',
//       description: 'Mô tả cho dịch vụ con 1'
//     },
//     {
//       id: 570,
//       serviceId: 18,
//       bookingId: 163,
//       quantity: 1,
//       price: 100000,
//       status: null,
//       type: 'SYSTEM',
//       name: 'Phí chờ',
//       description: 'Phí chờ 1h'
//     }
//   ],
// }
  return (
    <>
      {booking?.bookingDetails && booking.bookingDetails.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarClock className="h-5 w-5 mr-2 text-primary" />
              Chi tiết dịch vụ
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            {booking.bookingDetails.map((detail) => (
              <div
                key={detail.id}
                className="flex justify-between items-center p-2  border-b"
              >
                <div className="flex-1 mr-4">
                  <p className="text-sm font-medium">{detail.name}</p>
                  <p className="text-muted-foreground">{detail.description}</p>
                  <p className="text-muted-foreground">
                    Số lượng: {detail.quantity} - Đơn giá:
                    {formatter.format(detail.price!)}
                  </p>
                </div>
                <div className="flex-shrink-0 w-1/6">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() =>
                      onOpen("updateBookingServicesModalSheet", {bookingDetail: detail, bookingDetails: booking.bookingDetails})
                    }
                  >
                    <Edit className="h-4 w-4 text-primary" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default DetailServices;
