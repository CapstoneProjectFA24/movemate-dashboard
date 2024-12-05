import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";
import { IPromotion } from "@/features/promotions/types/promotion-type";

function formatStartDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const time = date.toTimeString().split(" ")[0];

  return `${day}/${month}/${year}-${time}`;
}
// function formatStartDate(dateString: string): string {
//   const date = new Date(dateString);
//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng trong JS bắt đầu từ 0
//   const year = date.getFullYear();

//   let hours = date.getHours();
//   const minutes = String(date.getMinutes()).padStart(2, "0");
//   const ampm = hours >= 12 ? "PM" : "AM";
//   hours = hours % 12 || 12; // Định dạng 12 giờ, chuyển 0 thành 12.

//   const time = `${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;
//   return `${day}/${month}/${year} - ${time}`;
// }
export const startDateColumn = {
  accessorKey: "startDate",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Ngày bắt đầu" />
  ),
  cell: ({ row }: { row: Row<IPromotion> }) => {
    const startDate = row.getValue("startDate") as string;
    const formattedDate = formatStartDate(startDate);

    return <div className="font-medium">{formattedDate}</div>;
  },
  enableSorting: false,
  enableHiding: false,
} as const;

export default startDateColumn;
