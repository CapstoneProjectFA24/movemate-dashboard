import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchParams } from "@/types/table";
import { Shell } from "@/components/shared/custom-ui/shell";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { getBookings } from "@/features/bookings/action/bookings";
import { BookingTable } from "@/features/bookings/components/booking-table/booking-table";

export interface IndexPageProps {
  searchParams: SearchParams;
}
const ReviewerBookingPage = ({ searchParams }: IndexPageProps) => {
  const isOnline = searchParams.isOnline === "false" ? false : true;
  const currentTab = isOnline ? "online" : "offline";

  const createTabUrl = (tab: string) => {
    const params = new URLSearchParams(searchParams as Record<string, string>);
    params.set("isOnline", tab === "online" ? "true" : "false");
    return `?${params.toString()}`;
  };

  const bookingPromise = getBookings(searchParams, isOnline);

  return (
    <div className="2xl:flex-1 w-full">
      <Tabs defaultValue={currentTab} className="w-full">
        <TabsList>
          <TabsTrigger value="online" asChild>
            <a href={createTabUrl("online")}>Đánh giá trực tuyến</a>
          </TabsTrigger>
          <TabsTrigger value="offline" asChild>
            <a href={createTabUrl("offline")}>Đánh giá tại nhà</a>
          </TabsTrigger>
        </TabsList>

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
              {isOnline && <BookingTable bookingPromise={bookingPromise} />}
            </React.Suspense>
          </Shell>
        </TabsContent>

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
              {!isOnline && <BookingTable bookingPromise={bookingPromise} />}
            </React.Suspense>
          </Shell>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReviewerBookingPage;
