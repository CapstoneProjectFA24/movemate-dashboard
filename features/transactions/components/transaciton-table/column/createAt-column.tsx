import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";
import { formatter } from "@/lib/utils";
import { ITransaction } from "@/features/transactions/types/transaction-type";
import { TrendingDown, TrendingUp } from "lucide-react";

export const createdAtColumn = {
  accessorKey: "createdAt",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Ngày tạo" />
  ),
  cell: ({ row }: { row: Row<ITransaction> }) => {
    const createdAt = row.getValue("createdAt") as string;


    return (
      <div>
        <span className="tabular-nums tracking-tight">
            {createdAt}
        </span>
      </div>
    );
  },
  enableSorting: false,
  filterFn: (
    row: Row<ITransaction>,
    columnId: string,
    filterValue: ITransaction[]
  ) => {
    return filterValue.includes(row.getValue(columnId));
  },
} as const;

export default createdAtColumn;