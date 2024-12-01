import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";
import { IAssignment } from "@/features/exception/types/assignemts-type";

export const bookingIdColumn = {
  accessorKey: "bookingId",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Mã Đơn" />
  ),
  cell: ({ row }: { row: Row<IAssignment> }) => (
    <div className="w-[80px]">BOK{row.getValue("bookingId")}</div>
  ),
  enableSorting: false,
  enableHiding: false,
} as const;

export default bookingIdColumn;
