import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";
import { IBooking } from "../../../types/booking-type";

export const estimatedDistanceColumn = {
  accessorKey: "estimatedDistance",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Quãng đường" />
  ),
  cell: ({ row }: { row: Row<IBooking> }) => {
    const estimatedDistance = row.getValue("estimatedDistance") as string;

    return (
      <div className="font-medium">
        {parseFloat(estimatedDistance).toFixed(2)} km
      </div>
    );
  },
  enableSorting: true,
  enableHiding: false,
} as const;

export default estimatedDistanceColumn;
