import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { IPromotion } from "@/features/promotions/types/promotion-type";
import { Row, type Column } from "@tanstack/react-table";

export const idColumn = {
  accessorKey: "id",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Mã khuyến mãi" />
  ),
  cell: ({ row }: { row: Row<IPromotion> }) => (
    <div className="w-[80px]">#{row.getValue("id")}</div>
  ),
  enableSorting: false,
  enableHiding: false,
} as const;

export default idColumn;
