import { type ColumnDef, Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Edit } from "lucide-react";
import { IBooking } from "../../../type/booking-type";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ActionMenuProps {
  row: Row<IBooking>;
}

const ActionMenu = ({ row }: ActionMenuProps) => {
  const router = useRouter();

  const handleViewDetails = () => {
    router.push(`/dashboard/bookings/${row.original.id}`);
  };

  const handleDelete = () => {
    // Implement delete logic
    // startTransition(() => {
    //   row.toggleSelected(false);
    //   toast.promise(deleteBooking(row.original.id), {
    //     loading: "Đang xóa...",
    //     success: "Xóa thành công",
    //     error: "Lỗi khi xóa",
    //   });
    // });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label="Mở menu"
          variant="ghost"
          className="flex size-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="size-4" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={handleViewDetails}>
          <span>Chi tiết</span>
          <Edit className="ml-auto h-4 w-4" />
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete}>
          Xóa
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const actionColumn: ColumnDef<IBooking> = {
  id: "actions",
  cell: ({ row }) => <ActionMenu row={row} />,
  enableSorting: false,
  enableHiding: false,
} as const;

export default actionColumn;
