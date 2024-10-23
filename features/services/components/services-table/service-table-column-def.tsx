"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
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
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import {
  MdSystemUpdateAlt,
  MdBuildCircle,
  MdPerson,
  MdLocalShipping,
} from "react-icons/md";
import { Badge } from "@/components/ui/badge";
import { ServiceType, ServiceTypeNames } from "@/features/services/enums/service-type";
import { cn, formatter } from "@/lib/utils";
import Image from "next/image";
import { CheckCircle2, Edit, XCircle } from "lucide-react";
import { IService } from "../../type/services-type";

// Object map type sang icon tương ứng
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

export function fetchServicesTableColumnDefs(): ColumnDef<IService, unknown>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
          }}
          aria-label="Chọn tất cả"
          className="translate-y-[2px] dark:text-white"
        />
      ),
      cell: ({ row }) => (
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
    },
    {
      accessorKey: "imageUrl",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Hình ảnh" />
      ),
      cell: ({ row }) => {
        const imageUrl = row.getValue("imageUrl") as string;
        return (
          <div className="relative h-10 w-10">
            <Image
              src={imageUrl || "/api/placeholder/100/100"}
              alt={row.getValue("name") as string}
              fill
              sizes="40px"
              className="rounded-md object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/api/placeholder/100/100";
              }}
            />
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Mã dịch vụ" />
      ),
      cell: ({ row }) => <div className="w-[80px]">#{row.getValue("id")}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tên dịch vụ" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("name")}
            </span>
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Giá tiền" />
      ),
      cell: ({ row }) => {
        const amount = row.getValue("amount") as number;
        const formatted = formatter.format(amount);
        return <div className="font-medium ">{formatted}</div>;
      },
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: "type",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Loại dịch vụ" />
      ),
      cell: ({ row }) => {
        const type = row.getValue("type") as ServiceType;
        if (!type) {
          return null;
        }

        const IconComponent = serviceTypeIcons[type];

        return (
          <div className="flex items-center">
            {IconComponent && (
              <IconComponent
                className="mr-2 size-4 text-muted-foreground"
                aria-hidden="true"
              />
            )}
            <span className="capitalize">
              {ServiceTypeNames[type] || "Không xác định"}
            </span>
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
      filterFn: (row, id, value) => {
        return value instanceof Array && value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "inverseParentService",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Số dịch vụ con" />
      ),
      cell: ({ row }) => {
        const services = row.getValue("inverseParentService") as any[];
        return (
          <div className="max-w-6 flex justify-center">
            <Badge variant="outline" className="text-xs cursor-pointer ">
              {services?.length || 0}
            </Badge>
          </div>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "isActived",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Trạng thái" />
      ),
      cell: ({ row }) => {
        const isActived = row.getValue("isActived") as boolean;
        return (
          <Badge
            className={cn(
              "bg-opacity-10 text-xs cursor-pointer",
              isActived
                ? "bg-green-500 text-green-500"
                : "bg-red-500 text-red-500"
            )}
          >
            {isActived ? "Đang hoạt động" : "Không hoạt động"}
          </Badge>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "actions",
      cell: function Cell({ row }) {
        const currentStatus = row.original.isActived ? "active" : "inactive";
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
                onClick={
                  () => {}
                  // router.push(`/dashboard/auctions/${row.original.auctionId}`)
                }
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
      },
    },
  ];
}
