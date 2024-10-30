import React from "react";
import { IBooking } from "../../../type/booking-type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarClock, Edit } from "lucide-react";
import { formatter } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DetailServicesProps {
  booking: IBooking | null;
  // onUpdate: (detail: any) => void;
}

const DetailServices = ({
  booking,
}: // onUpdate
DetailServicesProps) => {
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
                className="flex justify-between items-center p-2 border-b"
              >
                <div>
                  <p className="text-sm font-medium">{detail.name}</p>
                  <p>{detail.description}</p>
                  <p className="text-muted-foreground">
                    Số lượng: {detail.quantity} - Đơn giá:{" "}
                    {formatter.format(detail.price!)}
                  </p>
                </div>
                <Button size="icon" variant="outline" onClick={() => {}}>
                  <Edit className="h-4 w-4 text-primary" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default DetailServices;
