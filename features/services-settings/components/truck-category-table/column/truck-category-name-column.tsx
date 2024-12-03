import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { ITruckCategory } from "@/features/services/types/services-type";
import { Row, type Column } from "@tanstack/react-table";

export const truckCategoryNameColumn = {
  accessorKey: "categoryName",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Tên loại xe" />
  ),
  cell: ({ row }: { row: Row<ITruckCategory> }) => {
    return (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue("categoryName")}
        </span>
      </div>
    );
  },
  enableSorting: false,
  enableHiding: false,
} as const;

export default truckCategoryNameColumn;
