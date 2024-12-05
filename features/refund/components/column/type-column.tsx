import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";
import { RefundType, RefundTypeName } from "../../enums/refund-enums";
import { IRefund } from "../../types/refund-type";

const typeColumn = {
  accessorKey: "type",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Loại yêu cầu" />
  ),
  cell: ({ row }: { row: Row<IRefund> }) => {
    const type = row.getValue("type") as RefundType;
    if (!type) {
      return null;
    }
    return (
      <div className="flex items-center gap-2 animate-fade-in">
        <div
          className={`w-3 h-3 rounded-full ${
            type === RefundType.REFUND ? "bg-blue-500" : "bg-orange-500"
          } animate-pulse`}
        ></div>
        <span
          className={`font-medium ${
            type === RefundType.REFUND ? "text-blue-500" : "text-orange-500"
          }`}
        >
          {RefundTypeName[type]}
        </span>
      </div>
    );
  },
  enableSorting: false,
  enableHiding: false,
  filterFn: (
    row: Row<IRefund>,
    columnId: string,
    filterValue: RefundType[]
  ) => {
    return filterValue.includes(row.getValue(columnId));
  },
} as const;

export default typeColumn;
