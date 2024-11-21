import { type ColumnDef, Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Edit } from "lucide-react";
import { IBooking } from "../../../types/booking-type";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookingStatus } from "@/features/bookings/enums/booking-state-enum";
import { toast } from "sonner";
import { useTransition } from "react";
import { updateDetailStatus } from "@/features/bookings/action/update-booking";

interface ActionMenuProps {
  row: Row<IBooking>;
}

const ActionMenu = ({ row }: ActionMenuProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const isReviewOnl = row.original.isReviewOnline;
  const status = row.original.status as BookingStatus;
  const isNotYetReviewedOnl = [
    BookingStatus.ASSIGNED,
    BookingStatus.PENDING,
  ].includes(status);

  const handleViewDetails = async () => {
    if (isReviewOnl && isNotYetReviewedOnl) {
      const params = row.original.id;

      startTransition(async () => {
        const result = await updateDetailStatus(params.toString());

        if (!result.success) {
          toast.error(result.error);
          return;
        }

        router.push(`/dashboard/bookings/${row.original.id}`);
        toast.success("Cập nhật sang reviewing thành công!");
      });
    } else {
      startTransition(() => {
        router.push(`/dashboard/bookings/${row.original.id}`);
      });
    }
  };

  const handleDelete = () => {};

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
