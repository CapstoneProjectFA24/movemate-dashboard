import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import { ITruckCategory } from "@/features/services/types/services-type";
import { Column, ColumnDef, Row } from "@tanstack/react-table";
import { useRouter } from "nextjs-toploader/app";

interface ActionMenuProps {
  row: Row<ITruckCategory>;
}

const ActionMenu = ({ row }: ActionMenuProps) => {
    const router = useRouter();
  return (
    <div>
      <Button
        type="button"
        variant="outline"
        onClick={() => router.push(`/dashboard/services_setting/${row.original?.id}`)}
        size="sm"
        className="text-orange-600 hover:text-orange-700"
      >
        Chỉnh sửa
      </Button>
    </div>
  );
};

export const actionColumn: ColumnDef<ITruckCategory> = {
  id: "actions",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Thao tác" />
  ),

  cell: ({ row }) => <ActionMenu row={row} />,
  enableSorting: false,
  enableHiding: false,
} as const;

export default actionColumn;
