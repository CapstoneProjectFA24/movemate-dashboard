import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { ITruckCategory } from "@/features/services/types/services-type";
import { Row, type Column } from "@tanstack/react-table";

export const idColumn = {
  accessorKey: "id",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Mã loại xe" />
  ),
  cell: ({ row }: { row: Row<ITruckCategory> }) => (
    <div className="w-[80px]">#{row.getValue("id")}</div>
  ),
  enableSorting: false,
  enableHiding: false,
} as const;

export default idColumn;
