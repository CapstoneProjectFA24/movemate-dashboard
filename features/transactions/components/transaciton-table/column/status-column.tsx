'use client'
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { ITransaction } from "@/features/transactions/types/transaction-type";
import { Row, type Column } from "@tanstack/react-table";
import { CheckCircle2, XCircle, Clock, AlertCircle } from "lucide-react";
import { useTheme } from "next-themes";


export const statusColumn = {
  accessorKey: "status",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Trạng thái" />
  ),
  cell: ({ row }: { row: Row<ITransaction> }) => {
    const status = row.getValue("status") as string;
    const { theme } = useTheme();   

    const getStatusBadge = (status: string) => {
      const themeStyles = {
        success: theme === "light" ? "bg-green-100 text-green-700" : "bg-green-500 text-black",
        failure: theme === "light" ? "bg-red-100 text-red-700" : "bg-red-500 text-black",
        pending: theme === "light" ? "bg-yellow-100 text-yellow-700" : "bg-yellow-500 text-black",
        cancelled: theme === "light" ? "bg-gray-100 text-gray-700" : "bg-gray-500 text-black",
        default: theme === "light" ? "bg-blue-100 text-blue-700" : "bg-blue-500 text-black",
      };

      const iconColor = theme === "light" ? "" : "text-white";

      switch (status.toLowerCase()) {
        case 'completed':
        case 'success':
          return (
            <div className="flex items-center gap-2 w-[140px]">
              <div className={`flex items-center px-3 py-1 rounded-full ${themeStyles.success}`}>
                <CheckCircle2 className={`w-4 h-4 mr-2 text-green-500 ${iconColor}`} />
                <span className="text-sm font-medium">Thành công</span>
              </div>
            </div>
          );
        case 'failed':
        case 'failure':
          return (
            <div className="flex items-center gap-2 w-[140px]">
              <div className={`flex items-center px-3 py-1 rounded-full ${themeStyles.failure}`}>
                <XCircle className={`w-4 h-4 mr-2 text-red-500 ${iconColor}`} />
                <span className="text-sm font-medium">Thất bại</span>
              </div>
            </div>
          );
        case 'pending':
          return (
            <div className="flex items-center gap-2 w-[140px]">
              <div className={`flex items-center px-3 py-1 rounded-full ${themeStyles.pending}`}>
                <Clock className={`w-4 h-4 mr-2 text-yellow-500 ${iconColor}`} />
                <span className="text-sm font-medium">Đang xử lý</span>
              </div>
            </div>
          );
        case 'cancelled':
          return (
            <div className="flex items-center gap-2 w-[140px]">
              <div className={`flex items-center px-3 py-1 rounded-full ${themeStyles.cancelled}`}>
                <XCircle className={`w-4 h-4 mr-2 text-gray-500 ${iconColor}`} />
                <span className="text-sm font-medium">Đã hủy</span>
              </div>
            </div>
          );
        default:
          return (
            <div className="flex items-center gap-2 w-[140px]">
              <div className={`flex items-center px-3 py-1 rounded-full ${themeStyles.default}`}>
                <AlertCircle className={`w-4 h-4 mr-2 text-blue-500 ${iconColor}`} />
                <span className="text-sm font-medium">{status}</span>
              </div>
            </div>
          );
      }
    };

    return getStatusBadge(status);
  },
  enableSorting: true,
  enableHiding: false,
} as const;

export default statusColumn;
