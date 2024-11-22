import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";

import { IAssignment } from "../../types/assignemts-type";

import { IUser } from "@/features/users/types/user-type";

export const customerNameColumn = {
  accessorKey: "users",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Khách hàng" />
  ),
  cell: ({ row }: { row: Row<IAssignment> }) => {
    const user = row.getValue("users") as IUser;
    console.log(user);
    if (!user) {
      return null;
    }

    return (
      <div className="flex items-center">
        <span className="capitalize">{user.name}</span>
      </div>
    );
  },
  enableSorting: false,
  enableHiding: false,
} as const;

export default customerNameColumn;
