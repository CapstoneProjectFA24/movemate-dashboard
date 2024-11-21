import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { IUser } from "@/features/users/types/user-type";
import { Row, type Column } from "@tanstack/react-table";

export const emailColumn = {
  accessorKey: "email",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Email" />
  ),
  cell: ({ row }: { row: Row<IUser> }) => {
    return (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue("email")}
        </span>
      </div>
    );
  },
  enableSorting: false,

} as const;

export default emailColumn;
