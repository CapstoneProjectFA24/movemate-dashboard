import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";
import { formatter } from "@/lib/utils";
import { ITransaction } from "@/features/transactions/type/transaction-type";
import { TrendingDown, TrendingUp } from "lucide-react";

export const amountColumn = {
  accessorKey: "amount",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Giá tiền" />
  ),
  cell: ({ row }: { row: Row<ITransaction> }) => {
    const amount = row.getValue("amount") as number;
    const formatted = formatter.format(Math.abs(amount));
    const isPositive = amount >= 0;

    return (
      <div>
        <span className="tabular-nums tracking-tight">
          {isPositive ? '+' : '-'}{formatted}
        </span>
      </div>
    );
  },
  enableSorting: true,
} as const;

export default amountColumn;