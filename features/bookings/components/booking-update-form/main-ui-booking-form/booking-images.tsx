import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Image } from "lucide-react";
import { BookingTracker } from "../../../types/booking-type";

interface BookingImagesProps {
  bookingTrackers: BookingTracker[] | undefined;
}

const BookingImages = ({ bookingTrackers }: BookingImagesProps) => {
  const allImages =
    bookingTrackers?.flatMap(
      (tracker) =>
        tracker.trackerSources?.filter((source) => source.resourceUrl) || []
    ) || [];

  if (!allImages.length) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-base font-medium">
            <Image className="h-4 w-4 mr-2 text-primary" />
            Hình ảnh nhà khách hàng
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-sm text-gray-500 py-4">
            Chưa có hình ảnh nào được tải lên
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-base font-medium">
          <Image className="h-4 w-4 mr-2" />
          Hình ảnh nhà khách hàng ({allImages.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-3 overflow-x-auto py-2">
          {allImages.map((image, index) => (
            <div
              key={image.id || index}
              className="w-[150px] h-[150px] flex-shrink-0 relative rounded-md overflow-hidden border border-gray-200"
            >
              <img
                src={image.resourceUrl}
                alt={`Ảnh đơn hàng ${index + 1}`}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-200"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingImages;
