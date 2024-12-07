import { Row, Table } from "@tanstack/react-table";
import { IBooking } from "../../../types/booking-type";
import { Checkbox } from "@/components/ui/checkbox";

export const selectColumn = {
  id: "select",

  cell: ({ row }: { row: Row<IBooking> }) => {

    const assignments = row.original.assignments;

    return (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value);
        }}
        aria-label="Chọn dòng"
        className="translate-y-[2px] dark:text-white"
      />
    );
  },
  enableSorting: false,
  enableHiding: false,
} as const;

export default selectColumn;
