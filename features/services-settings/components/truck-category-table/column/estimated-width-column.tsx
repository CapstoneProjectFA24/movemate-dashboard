import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";

import { ITruckCategory } from "@/features/services/types/services-type";

export const estimatedWidthColumn = {
  accessorKey: "estimatedWidth",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Chiều rộng" />
  ),
  cell: ({ row }: { row: Row<ITruckCategory> }) => {
    const estimatedWidth = row.getValue("estimatedWidth") as string;

    return <div className="font-medium ">{estimatedWidth}</div>;
  },

  enableSorting: false,
  enableHiding: false,
} as const;

export default estimatedWidthColumn;
