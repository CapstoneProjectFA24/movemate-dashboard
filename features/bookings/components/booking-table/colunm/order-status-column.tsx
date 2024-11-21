import React from 'react';
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";
import { IBooking } from "../../../types/booking-type";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { BookingStatus } from '@/features/bookings/hooks/use-booking-status';

// Define status groupings
const OrderStatus = {
  NEW: [BookingStatus.PENDING, BookingStatus.ASSIGNED, BookingStatus.WAITING],
  DEPOSITING: [BookingStatus.DEPOSITING],
  IN_PROGRESS: [BookingStatus.REVIEWING, BookingStatus.IN_PROGRESS, BookingStatus.IN_TRANSIT],
  COMPLETED: [BookingStatus.COMPLETED, BookingStatus.DELIVERED],
  CANCELLED: [BookingStatus.CANCELLED, BookingStatus.REFUNDED]
};

const ProcessStatus = {
  PENDING_REVIEW: [BookingStatus.PENDING, BookingStatus.ASSIGNED],
  REVIEWING: [BookingStatus.REVIEWING],
  IN_PROGRESS: [BookingStatus.IN_PROGRESS],
  SHIPPING: [BookingStatus.IN_TRANSIT, BookingStatus.DELIVERED],
  COMPLETED: [BookingStatus.COMPLETED]
};

// Vietnamese status names for each group
export const OrderStatusNames = {
  NEW: "Đơn mới",
  DEPOSITING: "Chờ thanh toán",
  IN_PROGRESS: "Đang xử lý",
  COMPLETED: "Hoàn thành",
  CANCELLED: "Đã hủy"
};

const ProcessStatusNames = {
  PENDING_REVIEW: "Chờ kiểm tra",
  REVIEWING: "Đang kiểm tra",
  IN_PROGRESS: "Đang thực hiện",
  SHIPPING: "Đang vận chuyển",
  COMPLETED: "Hoàn thành"
};

// Status colors
const StatusColors = {
  NEW: "bg-blue-100 text-blue-800",
  DEPOSITING: "bg-yellow-100 text-yellow-800",
  IN_PROGRESS: "bg-purple-100 text-purple-800",
  COMPLETED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
  PENDING_REVIEW: "bg-blue-100 text-blue-800",
  REVIEWING: "bg-purple-100 text-purple-800",
  SHIPPING: "bg-orange-100 text-orange-800"
};

// Helper function to get group from status
const getOrderStatusGroup = (status: BookingStatus) => {
  for (const [group, statuses] of Object.entries(OrderStatus)) {
    if (statuses.includes(status)) {
      return group as keyof typeof OrderStatusNames;
    }
  }
  return 'NEW';
};

const getProcessStatusGroup = (status: BookingStatus) => {
  for (const [group, statuses] of Object.entries(ProcessStatus)) {
    if (statuses.includes(status)) {
      return group as keyof typeof ProcessStatusNames;
    }
  }
  return 'PENDING_REVIEW';
};

// Timeline component
const BookingTimeline = ({ booking }: { booking: IBooking }) => {
  const timelineSteps = [
    { 
      status: getOrderStatusGroup(booking.status as BookingStatus),
      time: booking.createdAt,
      description: "Đơn đặt chỗ được tạo"
    },
    { 
      status: getProcessStatusGroup(booking.status as  BookingStatus),
      time: booking.updatedAt,
      description: "Cập nhật trạng thái"
    },
    { 
      status: 'COMPLETED',
      time: booking.bookingAt,
      description: "Hoàn thành đặt chỗ"
    },
  ].filter(step => step.time);

  return (
    <div className="w-64 p-2">
      <h4 className="font-medium mb-2">Tiến trình</h4>
      <div className="space-y-3">
        {timelineSteps.map((step, index) => (
          <div key={index} className="flex items-start gap-2">
            <div className="relative flex items-center justify-center">
              <div className={cn(
                "w-2 h-2 rounded-full",
                // StatusColors[step.status]
              )} />
              {index !== timelineSteps.length - 1 && (
                <div className="absolute top-3 w-px h-4 bg-gray-200" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">
                {OrderStatusNames[step.status as keyof typeof OrderStatusNames] || 
                 ProcessStatusNames[step.status as keyof typeof ProcessStatusNames]}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(step.time as any).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
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
              className={cn("flex items-center gap-1", StatusColors[statusGroup])}
            >
              {OrderStatusNames[statusGroup]}
            </Badge>
          </TooltipTrigger>
          <TooltipContent side="bottom" align="center" className="p-0">
            <BookingTimeline booking={row.original} />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  },
  enableSorting: false,
  enableHiding: false,
} as const;
export default orderStatusColumn;

// export const processStatusColumn = {
//   accessorKey: "status",
//   header: ({ column }: { column: Column<any, unknown> }) => (
//     <DataTableColumnHeader column={column} title="Trạng thái xử lý" />
//   ),
//   cell: ({ row }: { row: Row<IBooking> }) => {
//     const status = row.getValue("status") as BookingStatus;
//     if (!status) return null;
    
//     const statusGroup = getProcessStatusGroup(status);
    
//     return (
//       <Badge 
//         variant="outline"
//         className={cn("flex items-center gap-1", StatusColors[statusGroup])}
//       >
//         {ProcessStatusNames[statusGroup]}
//       </Badge>
//     );
//   },
//   enableSorting: false,
//   enableHiding: false,
// } as const;

// export default processStatusColumn
    