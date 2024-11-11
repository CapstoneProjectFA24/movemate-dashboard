import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { ITransaction } from "@/features/transactions/type/transaction-type";
import { Row, type Column } from "@tanstack/react-table";
import { CheckCircle2, XCircle, Clock, AlertCircle } from "lucide-react";

export const statusColumn = {
  accessorKey: "status",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Trạng thái" />
  ),
  cell: ({ row }: { row: Row<ITransaction> }) => {
    const status = row.getValue("status") as string;

    const getStatusBadge = (status: string) => {
      switch (status.toLowerCase()) {
        case 'completed':
        case 'success':
          return (
            <div className="flex items-center gap-2 w-[140px]">
              <div className="flex items-center px-3 py-1 rounded-full bg-green-100">
                <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                <span className="text-green-700 text-sm font-medium">Thành công</span>
              </div>
            </div>
          );
        case 'failed':
        case 'failure':
          return (
            <div className="flex items-center gap-2 w-[140px]">
              <div className="flex items-center px-3 py-1 rounded-full bg-red-100">
                <XCircle className="w-4 h-4 mr-2 text-red-500" />
                <span className="text-red-700 text-sm font-medium">Thất bại</span>
              </div>
            </div>
          );
        case 'pending':
          return (
            <div className="flex items-center gap-2 w-[140px]">
              <div className="flex items-center px-3 py-1 rounded-full bg-yellow-100">
                <Clock className="w-4 h-4 mr-2 text-yellow-500" />
                <span className="text-yellow-700 text-sm font-medium">Đang xử lý</span>
              </div>
            </div>
          );
        case 'cancelled':
          return (
            <div className="flex items-center gap-2 w-[140px]">
              <div className="flex items-center px-3 py-1 rounded-full bg-gray-100">
                <XCircle className="w-4 h-4 mr-2 text-gray-500" />
                <span className="text-gray-700 text-sm font-medium">Đã hủy</span>
              </div>
            </div>
          );
        default:
          return (
            <div className="flex items-center gap-2 w-[140px]">
              <div className="flex items-center px-3 py-1 rounded-full bg-blue-100">
                <AlertCircle className="w-4 h-4 mr-2 text-blue-500" />
                <span className="text-blue-700 text-sm font-medium">{status}</span>
              </div>
            </div>
          );
      }
    };

    return getStatusBadge(status);
  },
  enableSorting: false,
  enableHiding: false,
} as const;

export default statusColumn;