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
import {
  Clock,
  UserCheck,
  Search,
  PlayCircle,
  CheckCircle2,
} from "lucide-react";

type ProcessStatusKeys =
  | "PENDING.ASSIGNED"
  | "WAITING.DEPOSITING.REVIEWED"
  | "REVIEWING"
  | "IN_PROGRESS.COMING.CONFIRMED"
  | "COMPLETED";

const ProcessStatus: Record<ProcessStatusKeys, BookingStatus[]> = {
  "PENDING.ASSIGNED": [BookingStatus.PENDING, BookingStatus.ASSIGNED],
  "WAITING.DEPOSITING.REVIEWED": [
    BookingStatus.WAITING,
    BookingStatus.DEPOSITING,
    BookingStatus.REVIEWED,
  ],
  REVIEWING: [BookingStatus.REVIEWING],
  "IN_PROGRESS.COMING.CONFIRMED": [
    BookingStatus.IN_PROGRESS,
    BookingStatus.COMING,
  ],
  COMPLETED: [BookingStatus.COMPLETED],
};

export const ProcessStatusNames: Record<ProcessStatusKeys, string> = {
  "PENDING.ASSIGNED": "Chờ kiểm tra",
  "WAITING.DEPOSITING.REVIEWED": "Chờ khách xác nhận",
  REVIEWING: "Đang kiểm tra",
  "IN_PROGRESS.COMING.CONFIRMED": "Đang thực hiện",
  COMPLETED: "Hoàn thành",
};

const StatusConfig: Record<
  ProcessStatusKeys,
  {
    lightMode: string;
    darkMode: string;
    icon: React.ReactNode;
  }
> = {
  "PENDING.ASSIGNED": {
    lightMode: "bg-yellow-500 text-white border-blue-300 hover:bg-blue-200/80",
    darkMode: "dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700 dark:hover:bg-blue-800/90",
    icon: <Clock className="w-3.5 h-3.5" />,
  },
  "WAITING.DEPOSITING.REVIEWED": {
    lightMode: "bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200/80",
    darkMode: "dark:bg-amber-900 dark:text-amber-200 dark:border-amber-700 dark:hover:bg-amber-800/90",
    icon: <UserCheck className="w-3.5 h-3.5" />,
  },
  REVIEWING: {
    lightMode: "bg-purple-100 text-purple-800 border-purple-300 hover:bg-purple-200/80",
    darkMode: "dark:bg-purple-900 dark:text-purple-200 dark:border-purple-700 dark:hover:bg-purple-800/90",
    icon: <Search className="w-3.5 h-3.5" />,
  },
  "IN_PROGRESS.COMING.CONFIRMED": {
    lightMode: "bg-indigo-100 text-indigo-800 border-indigo-300 hover:bg-indigo-200/80",
    darkMode: "dark:bg-indigo-900 dark:text-indigo-200 dark:border-indigo-700 dark:hover:bg-indigo-800/90",
    icon: <PlayCircle className="w-3.5 h-3.5" />,
  },
  COMPLETED: {
    lightMode: "bg-green-500 text-white border-emerald-300 hover:bg-emerald-200/80",
    darkMode: "dark:bg-emerald-900 dark:text-emerald-200 dark:border-emerald-700 dark:hover:bg-emerald-800/90",
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
  },
};

const getProcessStatusGroup = (status: BookingStatus): ProcessStatusKeys => {
  for (const [group, statuses] of Object.entries(ProcessStatus)) {
    if (statuses.includes(status)) {
      return group as ProcessStatusKeys;
    }
  }
  return "PENDING.ASSIGNED";
};

// Timeline component
// const BookingTimeline = ({ booking }: { booking: IBooking }) => {
//   const timelineSteps = [
//     {
//       status: getOrderStatusGroup(booking.status as BookingStatus),
//       time: booking.createdAt,
//       description: "Đơn đặt chỗ được tạo",
//     },
//     {
//       status: "COMPLETED",
//       time: booking.bookingAt,
//       description: "Hoàn thành đặt chỗ",
//     },
//   ].filter((step) => step.time);

//   return (
//     <div className="w-64 p-2">
//       <h4 className="font-medium mb-2">Tiến trình</h4>
//       <div className="space-y-3">
//         {timelineSteps.map((step, index) => (
//           <div key={index} className="flex items-start gap-2">
//             <div className="relative flex items-center justify-center">
//               <div
//                 className={cn(
//                   "w-2 h-2 rounded-full"
//                   // StatusColors[step.status]
//                 )}
//               />
//               {index !== timelineSteps.length - 1 && (
//                 <div className="absolute top-3 w-px h-4 bg-gray-200" />
//               )}
//             </div>
//             <div className="flex-1">
//               <p className="text-sm font-medium">
//                 {OrderStatusNames[step.status as keyof typeof OrderStatusNames]}
//               </p>
//               <p className="text-xs text-gray-500">
//                 {new Date(step.time as any).toLocaleString()}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

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
    const config = StatusConfig[statusGroup];

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Badge
              variant="outline"
              className={cn(
                "flex items-center gap-1.5 px-2 py-0.5",
                "border",
                config.lightMode,
                config.darkMode,
                "text-xs font-medium",
                "transition-colors duration-200"
              )}
            >
              {config.icon}
              <span>{ProcessStatusNames[statusGroup]}</span>
            </Badge>
          </TooltipTrigger>
          {/* <TooltipContent side="bottom" align="center" className="p-0">
            <BookingTimeline booking={row.original} />
          </TooltipContent> */}
        </Tooltip>
      </TooltipProvider>
    );
  },
  enableSorting: false,
  enableHiding: false,
} as const;

export default processStatusColumn;