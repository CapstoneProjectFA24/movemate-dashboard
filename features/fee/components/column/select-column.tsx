import { Row, Table } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { IFee } from "../../types/fee-type";


export const selectColumn = {
  id: "select",
  header: ({ table }: { table: Table<IFee> }) => (
    <Checkbox
      checked={table.getIsAllPageRowsSelected()}
      onCheckedChange={(value) => {
        table.toggleAllPageRowsSelected(!!value);
      }}
      aria-label="Chọn tất cả"
      className="translate-y-[2px] dark:text-white"
    />
  ),
  cell: ({ row }: { row: Row<IFee> }) => (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => {
        row.toggleSelected(!!value);
      }}
      aria-label="Chọn dòng"
      className="translate-y-[2px] dark:text-white"
    />
  ),
  enableSorting: false,
  enableHiding: false,
} as const;

export default selectColumn;
