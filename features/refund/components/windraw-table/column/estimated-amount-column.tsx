import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";
import { formatter } from "@/lib/utils";
import { IWindraw } from "@/features/refund/types/windraw-type";

export const estimatedAmountColumn = {
  accessorKey: "amount",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Số tiền yêu cầu" />
  ),
  cell: ({ row }: { row: Row<IWindraw> }) => {
    const amount = row.getValue("amount") as number;
    const formatted = formatter.format(amount);
    return <div className="font-medium ">{formatted}</div>;
  },

  enableSorting: false,
  enableHiding: false,
} as const;

export default estimatedAmountColumn;
