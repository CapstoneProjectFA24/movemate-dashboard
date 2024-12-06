import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";
import { IRefund } from "../../../types/refund-type";

export const bookingIdColumn = {
  accessorKey: "bookingId",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Mã đơn" />
  ),
  cell: ({ row }: { row: Row<IRefund> }) => (
    <div className="w-[80px]">{row.getValue("bookingId")}</div>
  ),
  enableSorting: false,
  enableHiding: false,
} as const;

export default bookingIdColumn;
