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
import { useRouter } from "next/navigation";

const serviceTypeIcons = {
  [ServiceType.SYSTEM]: MdSystemUpdateAlt,
  [ServiceType.DISASSEMBLE]: MdBuildCircle,
  [ServiceType.PORTER]: MdPerson,
  [ServiceType.TRUCK]: MdLocalShipping,
};

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
  row: Row<IService>;
}

const ActionMenu = ({ row }: ActionMenuProps) => {
  const currentStatus = row.original.isActived ? "active" : "inactive";
  const router = useRouter()
  return (
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
            router.push(`/dashboard/services/${row.original.id}`)
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
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={currentStatus}
              onValueChange={(value) => {
                const newStatus = value === "active";
              }}
            >
              {statusOptions.map((status) => (
                <DropdownMenuRadioItem
                  key={status.value}
                  value={status.value}
                  className="capitalize"
                >
                  <div className="flex items-center">
                    <status.icon
                      className={cn("mr-2 h-4 w-4", status.className)}
                    />
                    {status.label}
                  </div>
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Loại dịch vụ</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={row.original.type}>
              {Object.entries(ServiceTypeNames).map(([value, label]) => {
                const Icon = serviceTypeIcons[value as ServiceType];
                return (
                  <DropdownMenuRadioItem
                    key={value}
                    value={value}
                    className="capitalize"
                  >
                    <div className="flex items-center">
                      {Icon && <Icon className="mr-2 h-4 w-4" />}
                      {label}
                    </div>
                  </DropdownMenuRadioItem>
                );
              })}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            // startTransition(() => {
            //   row.toggleSelected(false);
            //   toast.promise(
            //     deleteAuction(row.original.auctionId.toString()),
            //     {
            //       loading: "Deleting...",
            //       success: () => "Auction deleted successfully.",
            //       // error: (err: unknown) => catchError(err),
            //       error: () => "Dellete error",
            //     }
            //   );
            // });
          }}
        >
          Xóa
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const actionColumn: ColumnDef<IService> = {
  id: "actions",
  cell: ({ row }) => <ActionMenu row={row} />,
  enableSorting: false,
  enableHiding: false,
} as const;

export default actionColumn;
