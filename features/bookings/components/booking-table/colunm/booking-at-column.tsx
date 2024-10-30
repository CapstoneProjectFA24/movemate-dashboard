import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";
import { IBooking } from "../../../type/booking-type";
import { Badge } from "@/components/ui/badge";

const TIME_THRESHOLDS = {
  URGENT: 1,
  WARNING: 2,
  NORMAL: 3,
} as const;

const STATUS_CONFIG = {
  URGENT: {
    variant: "destructive" as const,
    label: "Cần review ngay",
  },
  WARNING: {
    variant: "warning" as const,
    label: "Cảnh báo",
  },
  NORMAL: {
    variant: "success" as const,
    label: "Bình thường",
  },
} as const;

const getHoursDifference = (bookingTime: string): number => {
  const now = new Date();
  const booking = new Date(bookingTime);
  return (Number(booking) - Number(now)) / (1000 * 60 * 60);
};

const getTimeStatus = (hoursDiff: number) => {
  if (hoursDiff <= TIME_THRESHOLDS.URGENT) {
    return STATUS_CONFIG.URGENT;
  }
  if (hoursDiff <= TIME_THRESHOLDS.WARNING) {
    return STATUS_CONFIG.WARNING;
  }
  return STATUS_CONFIG.NORMAL;
};

const BookingTimeDisplay = ({
  bookingTime,
  status,
}: {
  bookingTime: string;
  status: { variant: "destructive" | "warning" | "success"; label: string };
}) => (
  <div className="flex flex-col space-y-1">
    <div className="font-medium">{bookingTime}</div>
    <Badge variant={status.variant} className="w-24 flex items-center justify-center">{status.label}</Badge>
  </div>
);

export const bookingTimeColumn = {
  accessorKey: "bookingAt",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Ngày bookingAt" />
  ),
  cell: ({ row }: { row: Row<IBooking> }) => {
    const bookingTime = row.getValue("bookingAt") as string;
    const hoursDiff = getHoursDifference(bookingTime);
    const status = getTimeStatus(hoursDiff);

    return <BookingTimeDisplay bookingTime={bookingTime} status={status} />;
  },
  enableSorting: false,
  enableHiding: false,
} as const;

export default bookingTimeColumn;