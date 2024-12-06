import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";
import { formatter } from "@/lib/utils";
import { IRefund } from "../../../types/refund-type";

export const estimatedAmountColumn = {
  accessorKey: "estimatedAmount",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Số tiền yêu cầu" />
  ),
  cell: ({ row }: { row: Row<IRefund> }) => {
    const estimatedAmount = row.getValue("estimatedAmount") as number;
    const formatted = formatter.format(estimatedAmount);
    return <div className="font-medium ">{formatted}</div>;
  },

  enableSorting: false,
  enableHiding: false,
} as const;

export default estimatedAmountColumn;
