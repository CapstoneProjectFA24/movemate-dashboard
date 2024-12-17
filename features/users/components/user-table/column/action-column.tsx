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
import { Contact, Edit, Trash2, Eye } from "lucide-react";
import { IUser } from "@/features/users/types/user-type";
import { ColumnDef, Row } from "@tanstack/react-table";
import { useModal } from "@/hooks/use-modal";
import { useGetOrCreateStaffConversation } from "@/features/chat-realtime/react-query/query";
import { useSession } from "next-auth/react";
import GroupSelection from "../group-selection";

interface ActionMenuProps {
  row: Row<IUser>;
}

const ActionMenu = ({ row }: ActionMenuProps) => {
  const { onOpen } = useModal();
  const { data: session } = useSession();

  const { mutateAsync: getOrCreateConversation } =
    useGetOrCreateStaffConversation(
      session?.user.id.toString()!,
      session?.user.roleName.toLowerCase()!,
      row.original.id.toString(),
      row.original.roleName.toLowerCase()
    );

  const handleContact = () => {
    getOrCreateConversation();

    onOpen("chatWithStaffModal", { user: row.original });
  };

  const handleView = () => {
    console.log("View user details:", row.original);
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
          onClick={handleContact}
          className="cursor-pointer hover:bg-accent/50 focus:bg-accent/50"
        >
          <Contact className="mr-2 h-4 w-4 text-green-500" />
          <span>Liên hệ</span>
        </DropdownMenuItem>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Eye className="mr-2 h-4 w-4 text-blue-500" />
            <span>Phân tổ</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={row.original.groupId}>
              <GroupSelection user={row.original} />
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
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
