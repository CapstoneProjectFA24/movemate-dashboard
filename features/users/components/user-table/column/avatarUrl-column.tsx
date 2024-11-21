import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";
import Image from "next/image";
import { IUser } from "@/features/users/types/user-type";

export const avatarUrlColumn = {
  accessorKey: "avatarUrl",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Hình ảnh" />
  ),
  cell: ({ row }: { row: Row<IUser> }) => {
    const avatarUrl = row.getValue("avatarUrl") as string;
    return (
      <div className="relative h-10 w-10">
        <Image
          src={avatarUrl || "https://github.com/shadcn.png"}
          alt={row.getValue("name") as string}
          fill
          sizes="40px"
          className="rounded-md object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/api/placeholder/100/100";
          }}
        />
      </div>
    );
  },
  enableSorting: false,
  enableHiding: false,
} as const;

export default avatarUrlColumn;
