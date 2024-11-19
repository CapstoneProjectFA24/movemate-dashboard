import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchParams } from "@/types/table";
import { Shell } from "@/components/shared/custom-ui/shell";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import {
  getBookingsOff,
  getBookingsOnl,
} from "@/features/bookings/action/bookings";
import { BookingTable } from "@/features/bookings/components/booking-table/booking-table";

export interface IndexPageProps {
  searchParams: SearchParams;
}
const ReviewerBookingPage = ({ searchParams }: IndexPageProps) => {
  const bookingOnlPromise = getBookingsOnl(searchParams);
  const bookingOffPromise = getBookingsOff(searchParams);

  return (
    <div className="2xl:flex-1 w-full">
      <Tabs defaultValue="offline" className="w-full">
        <TabsList>
          <TabsTrigger value="offline">Đánh giá tại nhà</TabsTrigger>
          <TabsTrigger value="online">Đánh giá trực tuyến</TabsTrigger>
        </TabsList>

        <TabsContent value="offline">
          <Shell>
            <React.Suspense
              fallback={
                <DataTableSkeleton
                  columnCount={5}
                  searchableColumnCount={1}
                  filterableColumnCount={2}
                  cellWidths={["10rem", "40rem", "12rem", "12rem", "8rem"]}
                  shrinkZero
                />
              }
            >
              <BookingTable bookingPromise={bookingOffPromise} />
            </React.Suspense>
          </Shell>
        </TabsContent>
        <TabsContent value="online">
          <Shell>
            <React.Suspense
              fallback={
                <DataTableSkeleton
                  columnCount={5}
                  searchableColumnCount={1}
                  filterableColumnCount={2}
                  cellWidths={["10rem", "40rem", "12rem", "12rem", "8rem"]}
                  shrinkZero
                />
              }
            >
              <BookingTable bookingPromise={bookingOnlPromise} />
            </React.Suspense>
          </Shell>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReviewerBookingPage;
