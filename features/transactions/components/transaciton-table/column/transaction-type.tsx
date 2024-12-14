import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";
import { ITransaction } from "@/features/transactions/types/transaction-type";

export const transactionTypeMap = {
  RECHARGE: "Nạp tiền",
  DEPOSIT: "Đặt cọc",
  PAYMENT: "Thanh toán",
  RECEIVE: "Nhận tiền",
  TRANFER: "Chuyển tiền",
  WITHDRAW: "Rút tiền",
} as const;

export type TransactionType = keyof typeof transactionTypeMap;

export const transTypeColumn = {
  accessorKey: "transactionType",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Kiểu thanh toán" />
  ),
  cell: ({ row }: { row: Row<ITransaction> }) => {
    const type = row.getValue("transactionType") as TransactionType;
    return (
      <div className="w-[120px]">
        {transactionTypeMap[type] || type}
      </div>
    );
  },
  enableSorting: true,
  enableHiding: false,
} as const;