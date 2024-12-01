import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";

import { IAssignment } from "@/features/exception/types/assignemts-type";

import {
  AssignmentType,
  AssignmentTypeNames,
} from "@/features/exception/enums/exception-enum";

import { Badge } from "@/components/ui/badge";

export const typeColum = {
  accessorKey: "type",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Loại ngoại lệ" />
  ),
  cell: ({ row }: { row: Row<IAssignment> }) => {
    const type = row.getValue("type") as AssignmentType;
    if (!type) {
      return null;
    }

    return (
      <div className="flex items-center">
        <span className="capitalize">
          <Badge variant="outline">
            {AssignmentTypeNames[type] || "Không xác định"}
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
    filterValue: AssignmentType[]
  ) => {
    return filterValue.includes(row.getValue(columnId));
  },
} as const;

export default typeColum;
