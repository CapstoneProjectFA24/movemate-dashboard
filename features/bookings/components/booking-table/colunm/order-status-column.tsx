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
import {
  AssignmentStatus,
  BookingStatus,
} from "@/features/bookings/hooks/use-booking-status";

// Define status groupings
const OrderStatus = {
  NEW: [BookingStatus.PENDING, BookingStatus.ASSIGNED, BookingStatus.WAITING],
  DEPOSITING: [BookingStatus.DEPOSITING],
  IN_PROGRESS: [
    BookingStatus.REVIEWING,
    BookingStatus.IN_PROGRESS,
    BookingStatus.COMING,
  ],
  // PAYMENT: [BookingStatus.IN_PROGRESS && AssignmentStatus. ],
  COMPLETED: [BookingStatus.COMPLETED, BookingStatus.DELIVERED],
  CANCELLED: [BookingStatus.CANCELLED, BookingStatus.REFUNDED],
};

// Vietnamese status names for each group
export const OrderStatusNames = {
  NEW: "Đơn mới",
  DEPOSITING: "Chờ khách đặt cọc",
  // PAYMENT: "Chờ khách thanh toán",
  IN_PROGRESS: "Đang xử lý",
  COMPLETED: "Hoàn thành",
  CANCELLED: "Đã hủy",
};



// Helper function to get group from status
const getOrderStatusGroup = (status: BookingStatus) => {
  for (const [group, statuses] of Object.entries(OrderStatus)) {
    if (statuses.includes(status)) {
      return group as keyof typeof OrderStatusNames;
    }
  }
  return "NEW";
};

// Column definitions
export const orderStatusColumn = {
  accessorKey: "status",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Trạng thái đơn hàng" />
  ),
  cell: ({ row }: { row: Row<IBooking> }) => {
    const status = row.getValue("status") as BookingStatus;
    if (!status) return null;

    const statusGroup = getOrderStatusGroup(status);

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Badge
              variant="outline"
              className={cn(
                "flex items-center gap-1",
              )}
            >
              {OrderStatusNames[statusGroup]}
            </Badge>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>
    );
  },
  enableSorting: false,
  enableHiding: false,
} as const;
export default orderStatusColumn;
