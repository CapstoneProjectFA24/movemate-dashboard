import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";
import { IService } from "@/features/services/types/services-type";
import { Badge } from "@/components/ui/badge";

export const inverseParentColumn = {
  accessorKey: "inverseParentService",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Số dịch vụ con" />
  ),

  cell: ({ row }: { row: Row<IService> }) => {
    const services = row.getValue("inverseParentService") as any[];
    return (
      <div className="flex items-center justify-start space-x-2">
        <Badge variant="outline" className="text-xs cursor-pointer px-2 py-1 rounded-lg border border-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-all">
          {services?.length || 0}
        </Badge>
      </div>
    );
  },

  enableSorting: false,

} as const;

export default inverseParentColumn;
