import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";
import { ITransaction } from "@/features/transactions/type/transaction-type";

export const transTypeColumn = {
  accessorKey: "transactionType",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Kiểu thanh toán" />
  ),
  cell: ({ row }: { row: Row<ITransaction> }) => {
    return <div className="w-[80px]">{row.getValue("transactionType")}</div>;
  },
  enableSorting: false,
  enableHiding: false,
} as const;