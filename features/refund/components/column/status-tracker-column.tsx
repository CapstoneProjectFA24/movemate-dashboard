import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";
import {
  StatusTrackerType,
  StatusTrackerTypeName,
} from "../../enums/refund-enums";
import { IRefund } from "../../types/refund-type";
import { Check, AlertOctagon, Clock } from "lucide-react";

const statusTrackerColumn = {
  accessorKey: "status",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Trạng thái" />
  ),
  cell: ({ row }: { row: Row<IRefund> }) => {
    const status = row.getValue("status") as StatusTrackerType;
    if (!status) {
      return null;
    }
    return (
      <div className="flex items-center gap-2 animate-fade-in">
        {status === StatusTrackerType.WAITING && (
          <div className="flex items-center gap-2 text-yellow-600">
            <Clock size={16} />
            <span className="font-medium">{StatusTrackerTypeName[status]}</span>
          </div>
        )}
        {status === StatusTrackerType.AVAILABLE && (
          <div className="flex items-center gap-2 text-green-600">
            <Check size={16} />
            <span className="font-medium">{StatusTrackerTypeName[status]}</span>
          </div>
        )}
        {status === StatusTrackerType.NOTAVAILABLE && (
          <div className="flex items-center gap-2 text-red-600">
            <AlertOctagon size={16} />
            <span className="font-medium">{StatusTrackerTypeName[status]}</span>
          </div>
        )}
      </div>
    );
  },
  enableSorting: false,
  enableHiding: false,
  filterFn: (
    row: Row<IRefund>,
    columnId: string,
    filterValue: StatusTrackerType[]
  ) => {
    return filterValue.includes(row.getValue(columnId));
  },
} as const;

export default statusTrackerColumn;
