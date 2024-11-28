import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";
import { IService } from "@/features/services/types/services-type";
import Image from "next/image";

export const imageUrlColumn = {
  accessorKey: "imageUrl",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Hình ảnh" />
  ),
  cell: ({ row }: { row: Row<IService> }) => {
    const imageUrl = row.getValue("imageUrl") as string;
    return (
      <div className="relative h-10 w-10">
        <Image
          src={imageUrl || "/api/placeholder/100/100"}
          alt={row.getValue("name") as string}
          fill
          sizes="40px"
          unoptimized
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

export default imageUrlColumn;
