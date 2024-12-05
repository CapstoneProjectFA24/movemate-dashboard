import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { IPromotion } from "@/features/promotions/types/promotion-type";
import { Row, type Column } from "@tanstack/react-table";

export const serviceIdColumn = {
  accessorKey: "serviceId",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Dịch vụ khuyến mãi" />
  ),
  cell: ({ row }: { row: Row<IPromotion> }) => {
    return <div className="w-[80px]">#{row.getValue("serviceId")}</div>;
  },
  enableSorting: false,
  enableHiding: false,
} as const;

export default serviceIdColumn;
