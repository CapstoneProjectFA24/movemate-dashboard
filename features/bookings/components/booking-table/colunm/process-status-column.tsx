import React from "react";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";
import { IBooking } from "../../../type/booking-type";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { BookingStatus } from "@/features/bookings/hooks/use-booking-status";

type ProcessStatusKeys =
  | "PENDING.ASSIGNED"
  | "REVIEWING"
  | "IN_PROGRESS"
  | "SHIPPING"
  | "COMPLETED";
const ProcessStatus: Record<ProcessStatusKeys, BookingStatus[]> = {
  "PENDING.ASSIGNED": [BookingStatus.PENDING, BookingStatus.ASSIGNED],
  REVIEWING: [BookingStatus.REVIEWING],
  IN_PROGRESS: [BookingStatus.IN_PROGRESS],
  SHIPPING: [BookingStatus.IN_TRANSIT, BookingStatus.DELIVERED],
  COMPLETED: [BookingStatus.COMPLETED],
};

export const ProcessStatusNames: Record<ProcessStatusKeys, string> = {
  "PENDING.ASSIGNED": "Chờ kiểm tra",
  REVIEWING: "Đang kiểm tra",
  IN_PROGRESS: "Đang thực hiện",
  SHIPPING: "Đang vận chuyển",
  COMPLETED: "Hoàn thành",
};

const StatusColors: Record<ProcessStatusKeys, string> = {
  IN_PROGRESS: "bg-purple-100 text-purple-800",
  COMPLETED: "bg-green-100 text-green-800",
  "PENDING.ASSIGNED": "bg-blue-100 text-blue-800",
  REVIEWING: "bg-purple-100 text-purple-800",
  SHIPPING: "bg-orange-100 text-orange-800",
};

const getProcessStatusGroup = (status: BookingStatus): ProcessStatusKeys => {
  for (const [group, statuses] of Object.entries(ProcessStatus)) {
    if (statuses.includes(status)) {
      return group as ProcessStatusKeys;
    }
  }
  return "PENDING.ASSIGNED"; // Return as string
};

//   // Timeline component
// const BookingTimeline = ({ booking }: { booking: IBooking }) => {
//     const timelineSteps = [
//       {
//         status: getOrderStatusGroup(booking.status as BookingStatus),
//         time: booking.createdAt,
//         description: "Đơn đặt chỗ được tạo"
//       },
//       {
//         status: getProcessStatusGroup(booking.status as  BookingStatus),
//         time: booking.updatedAt,
//         description: "Cập nhật trạng thái"
//       },
//       {
//         status: 'COMPLETED',
//         time: booking.bookingAt,
//         description: "Hoàn thành đặt chỗ"
//       },
//     ].filter(step => step.time);

//     return (
//       <div className="w-64 p-2">
//         <h4 className="font-medium mb-2">Tiến trình</h4>
//         <div className="space-y-3">
//           {timelineSteps.map((step, index) => (
//             <div key={index} className="flex items-start gap-2">
//               <div className="relative flex items-center justify-center">
//                 <div className={cn(
//                   "w-2 h-2 rounded-full",
//                   // StatusColors[step.status]
//                 )} />
//                 {index !== timelineSteps.length - 1 && (
//                   <div className="absolute top-3 w-px h-4 bg-gray-200" />
//                 )}
//               </div>
//               <div className="flex-1">
//                 <p className="text-sm font-medium">
//                   {OrderStatusNames[step.status as keyof typeof OrderStatusNames] ||
//                    ProcessStatusNames[step.status as keyof typeof ProcessStatusNames]}
//                 </p>
//                 <p className="text-xs text-gray-500">
//                   {new Date(step.time as any).toLocaleString()}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

export const processStatusColumn = {
  accessorKey: "status",
  id: "processStatusColumn",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Trạng thái xử lý" />
  ),
  cell: ({ row }: { row: Row<IBooking> }) => {
    const status = row.getValue("status") as BookingStatus;
    if (!status) return null;

    const statusGroup = getProcessStatusGroup(status);

    return (
      <Badge
        variant="outline"
        className={cn("flex items-center gap-1", StatusColors[statusGroup])}
      >
        {ProcessStatusNames[statusGroup]}
      </Badge>
    );
  },
  enableSorting: false,
  enableHiding: false,
} as const;

export default processStatusColumn;
