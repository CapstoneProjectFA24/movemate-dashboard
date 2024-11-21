import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IBooking } from "@/features/bookings/types/booking-type";
import { Truck } from "lucide-react";
import React from "react";

interface AssignStaffProps {
  booking: IBooking | null;
}

const AssignStaff = ({ booking }: AssignStaffProps) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Truck className="h-5 w-5 mr-2 text-primary" />
            Các nhân viên thực hiện quá trình
          </CardTitle>
        </CardHeader>
        <CardContent>
          {booking?.bookingDetails!?.length > 0 ? (
            <div className="grid gap-4">
              {booking?.bookingDetails!.map((detail, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/40"
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
    </>
  );
};

export default AssignStaff;
