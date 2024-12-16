import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";
import { IService } from "@/features/services/types/services-type";
import { IRefund } from "../../../types/refund-type";
import { IWindraw } from "@/features/refund/types/windraw-type";
import { formatDate } from "@/lib/utils";

export const timeColumn = {
  accessorKey: "date",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Thời gian tạo" />
  ),
  cell: ({ row }: { row: Row<IWindraw> }) => {
    return (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium">
          {formatDate(row.getValue("date"))}
        </span>
      </div>
    );
  },
  enableSorting: false,
  enableHiding: false,
} as const;

export default timeColumn;
