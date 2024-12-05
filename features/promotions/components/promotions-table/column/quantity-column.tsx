import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";
import { formatter } from "@/lib/utils";
import { IPromotion } from "@/features/promotions/types/promotion-type";

export const quantityColumn = {
  accessorKey: "quantity",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Số lượng voucher" />
  ),
  cell: ({ row }: { row: Row<IPromotion> }) => {
    const quantity = row.getValue("quantity") as number;
    return <div className="font-medium ">{quantity}</div>;
  },

  enableSorting: false,
  enableHiding: false,
} as const;

export default quantityColumn;
