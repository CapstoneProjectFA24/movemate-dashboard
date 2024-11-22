import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";

import { IAssignment } from "../../types/assignemts-type";

import { IUser } from "@/features/users/types/user-type";

export const customerPhoneColumn = {
  accessorKey: "users",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Số điện thoại" />
  ),
  cell: ({ row }: { row: Row<IAssignment> }) => {
    const user = row.getValue("users") as IUser;

    if (!user) {
      return null;
    }

    return (
      <div className="flex items-center">
        <span className="capitalize">{user.phone}</span>
      </div>
    );
  },
  enableSorting: false,
  enableHiding: false,
} as const;

export default customerPhoneColumn;
