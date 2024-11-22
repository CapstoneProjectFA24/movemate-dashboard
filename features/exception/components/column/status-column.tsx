import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";

import { IAssignment } from "../../types/assignemts-type";
import {
    AssignmentStatus,
    AssignmentStatusName,
} from "../../enums/exception-enum";
import { Badge } from "@/components/ui/badge";

export const statusColumn = {
  accessorKey: "status",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Trạng thái" />
  ),
  cell: ({ row }: { row: Row<IAssignment> }) => {
    const status = row.getValue("status") as AssignmentStatus;
    if (!status) {
      return null;
    }

    return (
      <div className="flex items-center">
        <span className="capitalize">
          <Badge variant="outline">
            {AssignmentStatusName[status] || "Không xác định"}
          </Badge>
        </span>
      </div>
    );
  },
  enableSorting: false,
  enableHiding: false,
  filterFn: (
    row: Row<IAssignment>,
    columnId: string,
    filterValue: AssignmentStatus[]
  ) => {
    return filterValue.includes(row.getValue(columnId));
  },
} as const;

export default statusColumn;
