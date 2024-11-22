import { Column, ColumnDef, Row } from "@tanstack/react-table";
import { IAssignment } from "../../types/assignemts-type";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";

interface ActionMenuProps {
  row: Row<IAssignment>;
}

const ActionMenu = ({ row }: ActionMenuProps) => {
  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm">
        Phân Công
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="text-green-600 hover:text-green-700"
        onClick={() => {}}
      >
        <Wand2 className="h-4 w-4 mr-1" />
        Tự động
      </Button>
    </div>
  );
};

export const actionColumn: ColumnDef<IAssignment> = {
  id: "actions",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Thao tác" />
  ),

  cell: ({ row }) => <ActionMenu row={row} />,
  enableSorting: false,
  enableHiding: false,
} as const;

export default actionColumn;
