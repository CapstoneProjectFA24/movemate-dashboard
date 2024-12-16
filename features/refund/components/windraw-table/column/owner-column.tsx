import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";
import { IRefund } from "../../../types/refund-type";
import { IWindraw } from "@/features/refund/types/windraw-type";

export const bankNameColumn = {
  id: "bankName",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Ngân hàng" />
  ),
  cell: ({ row }: { row: Row<IWindraw> }) => {
    const bankName = row.original.bankName;
    return (
      <div className="flex items-center space-x-2">
        <span className="font-medium truncate">{bankName}</span>
      </div>
    );
  },
  enableSorting: false,
  enableHiding: false,
} as const;

export default bankNameColumn;
