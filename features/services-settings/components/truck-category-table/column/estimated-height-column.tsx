import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";

import { ITruckCategory } from "@/features/services/types/services-type";

export const estimatedHeightColumn = {
  accessorKey: "estimatedHeight",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Chiều cao" />
  ),
  cell: ({ row }: { row: Row<ITruckCategory> }) => {
    const estimatedHeight = row.getValue("estimatedHeight") as string;

    return <div className="font-medium ">{estimatedHeight}</div>;
  },

  enableSorting: false,
  enableHiding: false,
} as const;

export default estimatedHeightColumn;
