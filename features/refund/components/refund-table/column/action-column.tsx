"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Trash2, Eye } from "lucide-react";
import { ColumnDef, Row } from "@tanstack/react-table";
import { useModal } from "@/hooks/use-modal";
import { useSession } from "next-auth/react";
import { IRefund } from "../../../types/refund-type";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { RefundType } from "@/features/refund/enums/refund-enums";
import RefundModal from "../../refund-modal/refund-modal";
import { refundMoney } from "@/features/refund/actions/refund";

interface ActionMenuProps {
  row: Row<IRefund>;
}

const ActionMenu = ({ row }: ActionMenuProps) => {
  const { onOpen } = useModal();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  //   const { data: groups, isLoading } = useGetGroup();
  // console.log(groups)

  const isRefund = row.original.type === RefundType.REFUND;

  const handleView = () => {
    console.log("View user details:", row.original);
  };

  const handleDelete = () => {
    console.log("Delete user:", row.original);
  };

  const handleRefund = async () => {
    try {
      setLoading(true);

      const data = {
        isRefunded: true,
      };

      startTransition(async () => {
        const result = await refundMoney(
          data,
          row.original.bookingId.toString()
        );
        if (!result.success) {
          toast.error(result.error);
        } else {
          toast.success("Hoàn tiền thành công.");
        }
      });
    } catch {
      toast.error("Đã có lỗi.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <RefundModal
        isOpen={open}
        onClose={() => setOpen(false)}
        row={row}
        variant="success"
        onConfirm={handleRefund}
        loading={loading}
        title="Đã kiểm tra xog"
        description="Bạn có chắc chắn muốn hoàn tiền cho đơn này không?"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label="Open actions menu"
            variant="ghost"
            className="flex size-8 p-0 hover:bg-accent/50 focus:ring-2 focus:ring-primary/30"
          >
            <DotsHorizontalIcon className="size-4" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-[180px] border shadow-md rounded-md"
        >
          {/* <DropdownMenuItem
            onSelect={handleView}
            className="cursor-pointer hover:bg-accent/50 focus:bg-accent/50"
          >
            <Eye className="mr-2 h-4 w-4 text-blue-500" />
            <span>Xem chi tiết</span>
          </DropdownMenuItem> */}

          {isRefund && (
            <DropdownMenuItem
              onClick={() => setOpen(true)}
              className="cursor-pointer hover:bg-accent/50 focus:bg-accent/50"
            >
              <Eye className="mr-2 h-4 w-4 text-blue-500" />
              <span>Hoàn tiền ngay</span>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem
            onSelect={handleDelete}
            className="cursor-pointer hover:bg-accent/50 focus:bg-accent/50 text-destructive focus:text-destructive-foreground"
          >
            <Trash2 className="mr-2 h-4 w-4 text-red-500" />
            <span>Xóa</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export const actionColumn: ColumnDef<IRefund> = {
  id: "actions",
  cell: ({ row }) => <ActionMenu row={row} />,
  enableSorting: false,
  enableHiding: false,
} as const;

export default actionColumn;
