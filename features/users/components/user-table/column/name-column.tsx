import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { IUser } from "@/features/users/type.ts/user-type";
import { Row, type Column } from "@tanstack/react-table";

export const nameColumn = {
  accessorKey: "name",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Tên nhân viên" />
  ),
  cell: ({ row }: { row: Row<IUser> }) => {
    return (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue("name")}
        </span>
      </div>
    );
  },
  enableSorting: false,
  enableHiding: false,
} as const;

export default nameColumn;
