import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { IUser } from "@/features/users/type.ts/user-type";
import { Row, type Column } from "@tanstack/react-table";
import { AiOutlinePhone } from "react-icons/ai";

export const phoneColumn = {
  accessorKey: "phone",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Số điện thoại" />
  ),
  cell: ({ row }: { row: Row<IUser> }) => {
    return (
      <div className="flex items-center space-x-2 px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
        <AiOutlinePhone
          className="text-gray-500 dark:text-gray-400"
          aria-hidden="true"
        />
        <span className="max-w-[200px] truncate font-medium text-gray-800 dark:text-gray-200">
          {row.getValue("phone")}
        </span>
      </div>
    );
  },
  enableSorting: false,
} as const;

export default phoneColumn;
