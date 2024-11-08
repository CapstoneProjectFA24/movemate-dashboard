import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";
import { IService } from "@/features/services/type/services-type";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const isActivedColumn = {
  accessorKey: "isActived",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Trạng thái" />
  ),

  cell: ({ row }: { row: Row<IService> }) => {
    const isActived = row.getValue("isActived") as boolean;
    return (
      <Badge
        className={cn(
          "bg-opacity-10 text-xs cursor-pointer",
          isActived ? " text-green-500" : " text-red-500"
        )}
      >
        {isActived ? "Đang hoạt động" : "Không hoạt động"}
      </Badge>
    );
  },
  enableSorting: false,
  enableHiding: false,
} as const;

export default isActivedColumn;
