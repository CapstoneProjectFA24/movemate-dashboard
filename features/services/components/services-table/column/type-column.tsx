import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";
import { IService } from "@/features/services/type/services-type";
import {
  ServiceType,
  ServiceTypeNames,
} from "@/features/services/enums/service-enum";
import {
  MdSystemUpdateAlt,
  MdBuildCircle,
  MdPerson,
  MdLocalShipping,
} from "react-icons/md";
import { CheckCircle2, Edit, XCircle } from "lucide-react";

// Object map type sang icon tương ứng
const serviceTypeIcons = {
  [ServiceType.SYSTEM]: MdSystemUpdateAlt,
  [ServiceType.DISASSEMBLE]: MdBuildCircle,
  [ServiceType.PORTER]: MdPerson,
  [ServiceType.TRUCK]: MdLocalShipping,
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
export const typeColum = {
  accessorKey: "type",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Loại dịch vụ" />
  ),
  cell: ({ row }: { row: Row<IService> }) => {
    const type = row.getValue("type") as ServiceType;
    if (!type) {
      return null;
    }

    const IconComponent = serviceTypeIcons[type];

    return (
      <div className="flex items-center">
        {IconComponent && (
          <IconComponent
            className="mr-2 size-4 text-muted-foreground"
            aria-hidden="true"
          />
        )}
        <span className="capitalize">
          {ServiceTypeNames[type] || "Không xác định"}
        </span>
      </div>
    );
  },
  enableSorting: false,
  enableHiding: false,
  filterFn: (
    row: Row<IService>,
    columnId: string,
    filterValue: ServiceType[]
  ) => {
    return filterValue.includes(row.getValue(columnId));
  },
} as const;

export default typeColum;
