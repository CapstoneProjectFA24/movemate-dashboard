import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";

import { ITruckCategory } from "@/features/services/types/services-type";

export const maxloadColumn = {
  accessorKey: "maxLoad",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Tải vận" />
  ),
  cell: ({ row }: { row: Row<ITruckCategory> }) => {
    const maxLoad = row.getValue("maxLoad") as number;

    return <div className="font-medium ">{maxLoad}</div>;
  },

  enableSorting: false,
  enableHiding: false,
} as const;

export default maxloadColumn;
