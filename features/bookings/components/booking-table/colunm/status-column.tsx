import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";
import { IBooking } from "../../../types/booking-type";
import {
  BookingStatus,
  BookingStatusColors,
  BookingStatusIcons,
  BookingStatusNames,
} from "@/features/bookings/enums/booking-state-enum";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const statusColum = {
  accessorKey: "status",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Trạng thái" />
  ),
  cell: ({ row }: { row: Row<IBooking> }) => {
    const status = row.getValue("status") as BookingStatus;
    if (!status) {
      return null;
    }
    const IconComponent = BookingStatusIcons[status];
    
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Badge 
              variant="outline"
              className={cn(
                "flex items-center gap-1",
                BookingStatusColors[status]
              )}
            >
              {IconComponent && (
                <IconComponent className="h-3 w-3" />
              )}
              {BookingStatusNames[status] || "Không xác định"}
            </Badge>
          </TooltipTrigger>
          <TooltipContent side="bottom" align="center"  className="p-0">
            <BookingTimeline booking={row.original} />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  },
  enableSorting: false,
  enableHiding: false,
  filterFn: (
    row: Row<IBooking>,
    columnId: string,
    filterValue: BookingStatus[]
  ) => {
    return filterValue.includes(row.getValue(columnId));
  },
} as const;

export default statusColum;



// time cho booking
const BookingTimeline = ({ booking }: { booking: IBooking }) => {
  const timelineSteps = [
    { 
      status: BookingStatus.PENDING, 
      time: booking.createdAt,
      description: "Đơn đặt chỗ được tạo"
    },
    { 
      status: BookingStatus.COMPLETED, 
      time: booking.bookingAt,
      description: "Thời gian đặt chỗ"
    },
    { 
      status: BookingStatus.COMPLETED, 
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
                BookingStatusColors[step.status]
              )} />
              {index !== timelineSteps.length - 1 && (
                <div className="absolute top-3 w-px h-4 bg-gray-200" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">
                {BookingStatusNames[step.status]}
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