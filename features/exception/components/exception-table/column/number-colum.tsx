import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";
import { IAssignment } from "@/features/exception/types/assignemts-type";
export const numberColumn = {
  accessorKey: "number",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Số lượng" />
  ),
  cell: ({ row }: { row: Row<IAssignment> }) => (
    <div>{row.getValue("number")}</div>
  ),
  enableSorting: false,
  enableHiding: false,
} as const;

export default numberColumn;
