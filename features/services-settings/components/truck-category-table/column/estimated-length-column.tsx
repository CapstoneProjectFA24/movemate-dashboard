import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";

import { ITruckCategory } from "@/features/services/types/services-type";

export const estimatedLengthColumn = {
  accessorKey: "estimatedLenght",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Chiều dài" />
  ),
  cell: ({ row }: { row: Row<ITruckCategory> }) => {
    const estimatedLenght = row.getValue("estimatedLenght") as string;

    return <div className="font-medium ">{estimatedLenght}</div>;
  },

  enableSorting: false,
  enableHiding: false,
} as const;

export default estimatedLengthColumn;
