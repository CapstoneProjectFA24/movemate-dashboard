import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { ITransaction } from "@/features/transactions/types/transaction-type";
import { Row, type Column } from "@tanstack/react-table";

export const idColumn = {
  accessorKey: "id",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Mã dịch vụ" />
  ),
  cell: ({ row }: { row: Row<ITransaction> }) => (
    <div className="w-[80px]">#{row.getValue("id")}</div>
  ),
  enableSorting: false,
  enableHiding: false,
} as const;

export default idColumn;
