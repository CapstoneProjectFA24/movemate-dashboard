import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";
import { formatter } from "@/lib/utils";
import { IFee } from "../../../types/fee-type";

export const amountColumn = {
  accessorKey: "amount",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Giá tiền" />
  ),
  cell: ({ row }: { row: Row<IFee> }) => {
    const amount = row.getValue("amount") as number;
    const formatted = formatter.format(amount);
    return <div className="font-medium ">{formatted}</div>;
  },
  
  enableSorting: false,
  enableHiding: false,
} as const;

export default amountColumn;
