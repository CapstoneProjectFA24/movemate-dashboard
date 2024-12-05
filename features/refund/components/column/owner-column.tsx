import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";
import { IRefund } from "../../types/refund-type";

export const ownerColumn = {
  id: "userInfo",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Thông tin khách hàng" />
  ),
  cell: ({ row }: { row: Row<IRefund> }) => {
    const owner = row.original.owner;
    return (
      <div className="flex items-center space-x-2">
        <span className="font-medium truncate">{owner.name}</span>
        <span className=" text-sm">{owner.phone}</span>
      </div>
    );
  },
  enableSorting: false,
  enableHiding: false,
} as const;

export default ownerColumn;
