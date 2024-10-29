"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { cn, formatter } from "@/lib/utils";
import { IBooking } from "../../type/booking-type";
import {
  BookingStatus,
  BookingStatusColors,
  BookingStatusIcons,
  BookingStatusNames,
} from "../../enums/booking-state-enum";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsFillCalendarCheckFill } from "react-icons/bs";

export function fetchBookingsTableColumnDefs(): ColumnDef<IBooking, unknown>[] {
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
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Mã đơn" />
      ),
      cell: ({ row }) => <div className="w-[80px]">#{row.getValue("id")}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "total",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tổng tiền" />
      ),
      cell: ({ row }) => {
        const total = row.getValue("total") as number;
        const formatted = formatter.format(total);
        return <div className="font-medium">{formatted}</div>;
      },
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Trạng thái" />
      ),
      cell: ({ row }) => {
        const status = row.getValue("status") as BookingStatus;
        if (!status) {
          return null;
        }
        const IconComponent = BookingStatusIcons[status];
        return (
          <div className="flex items-center">
            {IconComponent && (
              <IconComponent
                className="mr-2 size-4 text-muted-foreground"
                aria-hidden="true"
              />
            )}
            <Badge
              className={cn("bg-opacity-10 ", BookingStatusColors[status])}
            >
              {BookingStatusNames[status] || "Không xác định"}
            </Badge>
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
      filterFn: (row, id, value) => {
        return value instanceof Array && value.includes(row.getValue(id));
      },
    },
    // {
    //   accessorKey: "status",
    //   id: "reviewStatus",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Trạng thái Review" />
    //   ),
    //   cell: ({ row }) => {
    //     const isReviewOnline = row.original.isReviewOnline;
    //     const status = row.getValue("status") as BookingStatus;

    //     // Xác định các điều kiện để hiển thị trạng thái
    //     const isNotReviewedOnl = [
    //       BookingStatus.ASSIGNED,
    //       BookingStatus.REVIEWING,
    //       BookingStatus.PENDING,
    //     ].includes(status);

    //     const isReviewedOff = [
    //       BookingStatus.COMING,
    //       BookingStatus.REVIEWED,
    //       BookingStatus.IN_PROGRESS,
    //       BookingStatus.COMPLETED,
    //     ].includes(status);

    //     // Xác định text, màu sắc và biểu tượng cho các trạng thái
    //     let displayText = "";
    //     let badgeColor = "";
    //     let IconComponent = null;

    //     if (isReviewOnline) {
    //       if (isNotReviewedOnl) {
    //         displayText = "Chờ đánh giá";
    //         badgeColor = "bg-yellow-100 text-yellow-700";
    //         IconComponent = AiOutlineClockCircle;
    //       } else {
    //         displayText = "Đã đánh giá";
    //         badgeColor = "bg-green-100 text-green-700";
    //         IconComponent = BsFillCalendarCheckFill;
    //       }
    //     } else {
    //       if (isReviewedOff) {
    //         displayText = "Đã đánh giá";
    //         badgeColor = "bg-green-100 text-green-700";
    //         IconComponent = BsFillCalendarCheckFill;
    //       } else {
    //         displayText = "Chờ đánh giá";
    //         badgeColor = "bg-yellow-100 text-yellow-700";
    //         IconComponent = AiOutlineClockCircle;
    //       }
    //     }

    //     return displayText ? (
    //       <div className="flex items-center">
    //         {IconComponent && (
    //           <IconComponent
    //             className="mr-2 text-muted-foreground"
    //             aria-hidden="true"
    //           />
    //         )}
    //         <Badge className={cn("bg-opacity-10", badgeColor)}>
    //           {displayText}
    //         </Badge>
    //       </div>
    //     ) : null;
    //   },
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    {
      id: "actions",
      cell: function Cell({ row }) {
        const router = useRouter();
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
                onClick={() =>
                  router.push(`/dashboard/bookings/${row.original.id}`)
                }
              >
                <span>Chi tiết</span>
                <Edit className="ml-auto h-4 w-4" />
              </DropdownMenuItem>

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
