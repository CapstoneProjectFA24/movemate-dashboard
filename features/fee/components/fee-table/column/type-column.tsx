import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";

import {
  MdSystemUpdateAlt,
  MdBuildCircle,
  MdPerson,
  MdLocalShipping,
} from "react-icons/md";
import { CheckCircle2, Edit, XCircle } from "lucide-react";
import { FeeType, FeeTypeName } from "../../../enums/fee-enum";
import { IFee } from "../../../types/fee-type";

// Object map type sang icon tương ứng
const feeTypeIcons = {
  [FeeType.SYSTEM]: MdSystemUpdateAlt,
  [FeeType.PORTER]: MdPerson,
  [FeeType.TRUCK]: MdLocalShipping,
  [FeeType.DRIVER]: MdPerson,
  [FeeType.REVIEWER]: MdPerson,
  [FeeType.WEEKEND]: MdBuildCircle,
  [FeeType.OUTSIDE]: MdBuildCircle,
  [FeeType.HOLIDAY]: MdBuildCircle,
};

const statusOptions = [
  {
    value: "active",
    label: "Đang hoạt động",
    icon: CheckCircle2,
    className: "text-green-500",
  },
  {
    value: "inactive",
    label: "Không hoạt động",
    icon: XCircle,
    className: "text-red-500",
  },
] as const;

export const typeColumn = {
  accessorKey: "type",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Loại phí" />
  ),
  cell: ({ row }: { row: Row<IFee> }) => {
    const type = row.getValue("type") as FeeType;
    if (!type) {
      return null;
    }

    const IconComponent = feeTypeIcons[type];

    return (
      <div className="flex items-center">
        {IconComponent && (
          <IconComponent
            className="mr-2 size-4 text-muted-foreground"
            aria-hidden="true"
          />
        )}
        <span className="capitalize">
          {FeeTypeName[type] || "Không xác định"}
        </span>
      </div>
    );
  },
  enableSorting: false,
  enableHiding: false,
  filterFn: (
    row: Row<IFee>,
    columnId: string,
    filterValue: FeeType[]
  ) => {
    return filterValue.includes(row.getValue(columnId));
  },
} as const;

export default typeColumn;