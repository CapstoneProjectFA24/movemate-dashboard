import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import { IPromotion } from "@/features/promotions/types/promotion-type";
import { Column, ColumnDef, Row } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";

interface ActionMenuProps {
  row: Row<IPromotion>;
}

const ActionMenu = ({ row }: ActionMenuProps) => {
  const router = useRouter();
  return (
    <div>
      <Button
        type="button"
        variant="outline"
        onClick={() => router.push(`/dashboard/promotions/${row.original?.id}`)}
        size="sm"
        className="dart:text-white hover:text-orange-700 space-x-2"
      >
        <Eye className="ml-auto h-4 w-4" />
        <span>Xem chi tiết</span>
      </Button>
    </div>
  );
};

export const actionColumn: ColumnDef<IPromotion> = {
  id: "actions",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Thao tác" />
  ),

  cell: ({ row }) => <ActionMenu row={row} />,
  enableSorting: false,
  enableHiding: false,
} as const;

export default actionColumn;
