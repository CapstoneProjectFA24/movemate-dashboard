import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { IUser } from "@/features/users/types/user-type";
import { Row, type Column } from "@tanstack/react-table";

export const groupIdColumn = {
  accessorKey: "groupId",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Tổ" />
  ),
  cell: ({ row }: { row: Row<IUser> }) => {
    const groupId = row.getValue("groupId") as number;
    return groupId ? (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium">{groupId}</span>
      </div>
    ) : (
      <span className="text-muted-foreground">Chưa có tổ</span>
    );
  },
  enableSorting: false,
} as const;

export default groupIdColumn;
