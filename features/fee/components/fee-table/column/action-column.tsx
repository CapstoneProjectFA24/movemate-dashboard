"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { CheckCircle2, Edit, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { IService } from "@/features/services/types/services-type";
import { ColumnDef, Row } from "@tanstack/react-table";
import {
  MdSystemUpdateAlt,
  MdBuildCircle,
  MdPerson,
  MdLocalShipping,
} from "react-icons/md";
import {
  ServiceType,
  ServiceTypeNames,
} from "@/features/services/enums/service-enum";

// import { useRouter } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { IFee } from "@/features/fee/types/fee-type";
import { useState, useTransition } from "react";
import AlertModal from "@/components/modals/alert-modal";
import { deleteFee } from "@/features/fee/actions/delete-fee";
import { toast } from "sonner";
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

interface ActionMenuProps {
  row: Row<IFee>;
}

const ActionMenu = ({ row }: ActionMenuProps) => {
  const currentStatus = row.original.isActived ? "active" : "inactive";
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const onDelete = async () => {
    try {
      setLoading(true);
      startTransition(async () => {
        const result = await deleteFee(row.original.id.toString()!);

        if (!result.success) {
          toast.error(result.error);
        } else {
          toast.success("Xóa thành công.");
          router.push(`/dashboard/fee`);
        }
      });
    } catch (error: any) {
      toast.error("Đã có lỗi.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        variant="danger"
        onConfirm={onDelete}
        loading={loading}
        title="Xóa loại phí"
        description="Bạn có chắc chắn muốn xóa loại phí này không?"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label="Open menu"
            variant="ghost"
            className="flex size-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="size-4" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            onClick={() => {
              router.push(`/dashboard/fee/${row.original.id}`);
            }}
          >
            <span>Chi tiết</span>
            <Edit className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <div className="flex items-center">
                <span>Chuyển trạng thái</span>
              </div>
            </DropdownMenuSubTrigger>
          </DropdownMenuSub>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Xóa
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export const actionColumn: ColumnDef<IFee> = {
  id: "actions",
  cell: ({ row }) => <ActionMenu row={row} />,
  enableSorting: false,
  enableHiding: false,
} as const;

export default actionColumn;
