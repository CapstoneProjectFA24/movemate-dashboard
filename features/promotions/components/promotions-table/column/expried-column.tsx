import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Row, type Column } from "@tanstack/react-table";
import { IPromotion } from "@/features/promotions/types/promotion-type";

function isExpired(endDate: string): boolean {
  const currentDate = new Date();
  const end = new Date(endDate);
  return currentDate > end;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export const expriedColumn = {
  id: "expried",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Hạn sử dụng" />
  ),
  cell: ({ row }: { row: Row<IPromotion> }) => {
    const endDate = row.getValue("endDate") as string;

    const expired = isExpired(endDate);

    return (
      <span
        className={`text-sm font-medium ${
          expired ? "text-red-500" : "text-green-500"
        }`}
      >
        {expired ? "Hết hạn" : `Còn hạn đến: ${formatDate(endDate)}`}
      </span>
    );
  },
  enableSorting: false,
  enableHiding: false,
} as const;

export default expriedColumn;
