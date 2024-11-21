"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Contact, Edit, Trash2, Eye } from "lucide-react";
import { IUser } from "@/features/users/types/user-type";
import { ColumnDef, Row } from "@tanstack/react-table";
import { useModal } from "@/hooks/use-modal";
import { useGetOrCreateStaffConversation } from "@/features/chat-realtime/react-query/query";
import { useSession } from "next-auth/react";

interface ActionMenuProps {
  row: Row<IUser>;
}

const ActionMenu = ({ row }: ActionMenuProps) => {
  const { onOpen } = useModal();
  const { data: session } = useSession();
  
  const { mutateAsync: getOrCreateConversation} =
    useGetOrCreateStaffConversation(
      session?.user.id.toString()!,
      session?.user.roleName.toLowerCase()!,
      row.original.id.toString(),
      row.original.roleName.toLowerCase()
    );

  const handleContact =  () => {
     getOrCreateConversation();

    onOpen("chatWithStaffModal", { user: row.original });
  };

  const handleView = () => {
    console.log("View user details:", row.original);
  };

  const handleEdit = () => {
    console.log("Edit user:", row.original);
  };

  const handleDelete = () => {
    console.log("Delete user:", row.original);
  };

  return (
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
        <DropdownMenuItem
          onSelect={handleView}
          className="cursor-pointer hover:bg-accent/50 focus:bg-accent/50"
        >
          <Eye className="mr-2 h-4 w-4 text-blue-500" />
          <span>Xem chi tiết</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          // onSelect={handleContact}
          onClick={handleContact}
          // onClick={() => onOpen("chatWithStaffModal", {user: row.original})}
          className="cursor-pointer hover:bg-accent/50 focus:bg-accent/50"
        >
          <Contact className="mr-2 h-4 w-4 text-green-500" />
          <span>Liên hệ</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onSelect={handleEdit}
          className="cursor-pointer hover:bg-accent/50 focus:bg-accent/50"
        >
          <Edit className="mr-2 h-4 w-4 text-yellow-500" />
          <span>Chỉnh sửa</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onSelect={handleDelete}
          className="cursor-pointer hover:bg-accent/50 focus:bg-accent/50 text-destructive focus:text-destructive-foreground"
        >
          <Trash2 className="mr-2 h-4 w-4 text-red-500" />
          <span>Xóa</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const actionColumn: ColumnDef<IUser> = {
  id: "actions",
  cell: ({ row }) => <ActionMenu row={row} />,
  enableSorting: false,
  enableHiding: false,
} as const;

export default actionColumn;
