import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";
import { ITransaction } from "@/features/transactions/types/transaction-type";
import { Wallet, CreditCard } from "lucide-react"; // Import icons từ lucide-react

export const paymentMethodColumn = {
  accessorKey: "paymentMethod",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Hình thức thanh toán" />
  ),
  cell: ({ row }: { row: Row<ITransaction> }) => {
    const paymentMethod = row.getValue("paymentMethod") as string;

    const getPaymentBadge = (method: string) => {
      switch (method.toLowerCase()) {
        case 'momo':
          return (
            <div className="flex items-center gap-2 w-[140px]">
              <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-white" />
              </div>
              <span className="text-pink-500 font-medium">MoMo</span>
            </div>
          );
        case 'vnpay':
          return (
            <div className="flex items-center gap-2 w-[140px]">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-white" />
              </div>
              <span className="text-blue-500 font-medium">VNPay</span>
            </div>
          );
        case 'payos':
          return (
            <div className="flex items-center gap-2 w-[140px]">
              <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-white" />
              </div>
              <span className="text-purple-500 font-medium">Payos</span>
            </div>
          );
        case 'wallet':
          return (
            <div className="flex items-center gap-2 w-[140px]">
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                <Wallet className="w-4 h-4 text-white" />
              </div>
              <span className="text-orange-500 font-medium">Movemate Wallet</span>
            </div>
          );
        default:
          return (
            <div className="flex items-center gap-2 w-[140px]">
              <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-500 font-medium">{paymentMethod}</span>
            </div>
          );
      }
    };

    return getPaymentBadge(paymentMethod);
  },
  enableSorting: true,
  enableHiding: false,
} as const;