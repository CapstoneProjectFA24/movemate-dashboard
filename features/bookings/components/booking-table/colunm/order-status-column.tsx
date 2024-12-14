import React from "react";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";
import { IBooking } from "../../../types/booking-type";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { BookingStatus } from "@/features/bookings/hooks/use-booking-status";

type OrderStatus =
  | BookingStatus.PENDING
  | BookingStatus.ASSIGNED
  | BookingStatus.REVIEWING
  | BookingStatus.REVIEWED
  | BookingStatus.DEPOSITING
  | BookingStatus.IN_PROGRESS
  | BookingStatus.COMING
  | BookingStatus.CONFIRMED
  | BookingStatus.WAITING
  | BookingStatus.REFUNDING
  | BookingStatus.CANCELLED
  | BookingStatus.COMPLETED
  | BookingStatus.PAUSED
  | "COMPENSATION"
  | "CANCELED"
  | "PAID"
  | "NEW"
  | "ADVANCE";

type ReviewOnlineStatus = "true" | "false";

export const OrderStatusMap: Record<
  ReviewOnlineStatus,
  Record<OrderStatus, string>
> = {
  true: {
    [BookingStatus.PENDING]: "Đơn mới",
    [BookingStatus.ASSIGNED]: "Đơn mới",
    [BookingStatus.REVIEWING]: "Đơn mới",
    [BookingStatus.REVIEWED]: "Đơn mới",
    [BookingStatus.DEPOSITING]: "Đơn mới",
    [BookingStatus.IN_PROGRESS]: "Đã cọc",
    [BookingStatus.COMING]: "Đã cọc",
    [BookingStatus.CONFIRMED]: "Đã cọc",
    [BookingStatus.WAITING]: "Đơn mới",
    [BookingStatus.REFUNDING]: "Hoàn tiền",
    [BookingStatus.CANCELLED]: "Đã hủy",
    [BookingStatus.COMPLETED]: "Đã thanh toán",
    [BookingStatus.PAUSED]: "Đang có thay đổi",
    COMPENSATION: "Hoàn tiền",
    CANCELED: "Đã hủy",
    PAID: "Đã thanh toán",
    NEW: "Đơn mới",
    ADVANCE: "Đã cọc",
  },
  false: {
    [BookingStatus.PENDING]: "Đơn mới",
    [BookingStatus.ASSIGNED]: "Đơn mới",
    [BookingStatus.WAITING]: "Đơn mới",
    [BookingStatus.DEPOSITING]: "Đơn mới",
    [BookingStatus.IN_PROGRESS]: "Đã cọc",
    [BookingStatus.COMING]: "Đã cọc",
    [BookingStatus.CONFIRMED]: "Đã cọc",
    [BookingStatus.REVIEWING]: "Đã cọc",
    [BookingStatus.REVIEWED]: "Đã cọc",
    [BookingStatus.REFUNDING]: "Hoàn tiền",
    [BookingStatus.CANCELLED]: "Đã hủy",
    [BookingStatus.COMPLETED]: "Đã thanh toán",
    [BookingStatus.PAUSED]: "Đang có thay đổi",
    COMPENSATION: "Hoàn tiền",
    CANCELED: "Đã hủy",
    PAID: "Đã thanh toán",
    NEW: "Đơn mới",
    ADVANCE: "Đã cọc",
  },
};

// Helper function to get group from status
const getOrderStatusGroup = (
  status: OrderStatus,
  isReviewOnline: boolean
): string => {
  return OrderStatusMap[isReviewOnline ? "true" : "false"][status] || status;
};
// Column definitions
export const orderStatusColumn = {
  accessorKey: "status",
  id: "orderStatusColumn",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Trạng thái đơn hàng" />
  ),
  cell: ({ row }: { row: Row<IBooking> }) => {
    const status = row.original.status as OrderStatus;
    const isReviewOnline = row.original.isReviewOnline as boolean;
    if (!status) return null;

    const statusGroup = getOrderStatusGroup(status, isReviewOnline);

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Badge variant="outline" className={cn("flex items-center gap-1")}>
              {statusGroup}
            </Badge>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>
    );
  },
  enableSorting: true,
  enableHiding: false,
} as const;

export default orderStatusColumn;
