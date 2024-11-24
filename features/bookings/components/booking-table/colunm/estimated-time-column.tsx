import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";
import { IBooking } from "../../../types/booking-type";

export const estimatedTimeColumn = {
  accessorKey: "estimatedDeliveryTime",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Thời gian ước tính" />
  ),
  cell: ({ row }: { row: Row<IBooking> }) => {
    const estimatedDeliveryTimeStr = row.getValue("estimatedDeliveryTime") as string;

    if (estimatedDeliveryTimeStr) {
      const estimatedDeliveryTimeHours = Math.floor(parseFloat(estimatedDeliveryTimeStr));
      const estimatedDeliveryTimeMinutes = Math.round((parseFloat(estimatedDeliveryTimeStr) - estimatedDeliveryTimeHours) * 60);

      if (estimatedDeliveryTimeHours < 1) {
        return (
          <div className="font-medium">
            {estimatedDeliveryTimeMinutes} phút
          </div>
        );
      } else if (estimatedDeliveryTimeMinutes === 0) {
        return (
          <div className="font-medium">
            {estimatedDeliveryTimeHours} giờ
          </div>
        );
      } else {
        return (
          <div className="font-medium">
            {estimatedDeliveryTimeHours} giờ {estimatedDeliveryTimeMinutes} phút
          </div>
        );
      }
    } else {
      return (
        <div className="font-medium">
          Chưa hẹn giờ
        </div>
      );
    }
  },
  enableSorting: false,
  enableHiding: false,
} as const;

export default estimatedTimeColumn;