import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";
import { IService } from "@/features/services/type/services-type";
import { Badge } from "@/components/ui/badge";

export const inverseParentColumn = {
  accessorKey: "inverseParentService",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Số dịch vụ con" />
  ),

  cell: ({ row }: { row: Row<IService> }) => {
    const services = row.getValue("inverseParentService") as any[];
    return (
      <div className="max-w-6 flex  ">
        <Badge variant="outline" className="text-xs cursor-pointer ">
          {services?.length || 0}
        </Badge>
      </div>
    );
  },
  enableSorting: false,

} as const;

export default inverseParentColumn;
