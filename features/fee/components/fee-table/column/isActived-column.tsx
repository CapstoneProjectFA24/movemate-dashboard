import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";
import { IFee } from "../../../types/fee-type";

const StatusBadge = ({ isActived }: { isActived: boolean }) => {
  const { theme } = useTheme();
  return (
    <Badge
      className={cn(
        "bg-opacity-10 text-xs cursor-pointer rounded-2 px-2 py-1",
        theme === "light"
          ? isActived
            ? "text-white"
            : "text-red-500"
          : isActived
          ? "text-green-600 bg-green-100"
          : "text-red-600 bg-red-100"
      )}
    >
      {isActived ? "Đang hoạt động" : "Không hoạt động"}
    </Badge>
  );
};

export const isActivedColumn = {
  accessorKey: "isActived",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Trạng thái" />
  ),

  cell: ({ row }: { row: Row<IFee> }) => {
    const isActived = row.getValue("isActived") as boolean;
    return <StatusBadge isActived={isActived} />;
  },
  enableSorting: false,
  enableHiding: false,
} as const;

export default isActivedColumn;
