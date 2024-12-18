import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";
import { IBooking } from "../../../types/booking-type";
import { formatter } from "@/lib/utils";

export const totalColumn = {
  accessorKey: "total",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Tổng giá tiền" />
  ),
  cell: ({ row }: { row: Row<IBooking> }) => {
    const total = row.getValue("total") as number;
    const formatted = formatter.format(total);
    return <div className="font-medium">{formatted}</div>;
  },
  enableSorting: true,
  enableHiding: false,
} as const;

export default totalColumn;
