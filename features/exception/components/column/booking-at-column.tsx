import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";
import { IAssignment } from "../../types/assignemts-type";

export const bookingAtColumn = {
  accessorKey: "bookingAt",
  header: ({ column }: { column: Column<IAssignment, unknown> }) => (
    <DataTableColumnHeader column={column} title="Thời Gian Vận Chuyển" />
  ),
  cell: ({ row }: { row: Row<IAssignment> }) => {
    const bookingAtString = row.getValue("bookingAt") as string;
    if (!bookingAtString) {
      return null;
    }

    const bookingAt = new Date(bookingAtString);

    return (
      <div>
        {bookingAt.toLocaleString("vi-VN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    );
  },
  enableSorting: false,
  enableHiding: false,
} as const;

export default bookingAtColumn;
