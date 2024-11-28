import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";
import { formatter } from "@/lib/utils";
import { ITransaction } from "@/features/transactions/types/transaction-type";
import { TrendingDown, TrendingUp } from "lucide-react";

export const amountColumn = {
  accessorKey: "amount",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Giá tiền" />
  ),
  cell: ({ row }: { row: Row<ITransaction> }) => {
    const amount = row.getValue("amount") as number;
    const isCredit = row.original.isCredit;
    const formatted = formatter.format(Math.abs(amount));

    return (
      <div className="flex items-center gap-2">
        {isCredit ? (
          <TrendingUp className="h-4 w-4 text-green-500" />
        ) : (
          <TrendingDown className="h-4 w-4 text-red-500" />
        )}
        <span className={`tabular-nums tracking-tight ${isCredit ? 'text-green-600' : 'text-red-600'}`}>
          {isCredit ? '+' : '-'}{formatted}
        </span>
      </div>
    );
  },
  enableSorting: true,
} as const;

export default amountColumn;