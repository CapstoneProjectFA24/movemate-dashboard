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
      <div className={`
        flex items-center gap-2 font-medium
        ${isPositive ? 'text-green-600' : 'text-red-600'}
        transition-all duration-200 ease-in-out
        hover:scale-105
        rounded-lg py-1 px-2
        ${isPositive ? 'bg-green-50' : 'bg-red-50'}
      `}>
        {isPositive ? (
          <TrendingUp className="w-4 h-4" />
        ) : (
          <TrendingDown className="w-4 h-4" />
        )}
        <span className="tabular-nums tracking-tight">
          {isPositive ? '+' : '-'}{formatted}
        </span>
      </div>
    );
  },
  enableSorting: true,
  enableHiding: false,
} as const;

export default amountColumn;