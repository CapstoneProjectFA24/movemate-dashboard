import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { IUser, UserRole } from "@/features/users/type.ts/user-type";
import { AiOutlineUser } from "react-icons/ai";
import { Row, type Column } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const roleTranslations: Record<UserRole, string> = {
  [UserRole.Reviewer]: "NGƯỜI ĐÁNH GIÁ",
  [UserRole.Driver]: "TÀI XẾ",
  [UserRole.Porter]: "NGƯỜI KHUÂN VÁC",
};
export const roleNameColumn = {
  accessorKey: "roleName",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Vai trò" />
  ),
  cell: ({ row }: { row: Row<IUser> }) => {
    const role: UserRole = row.getValue("roleName");
    const roleNameInVietnamese =
      roleTranslations[role.toUpperCase() as UserRole] || "KHÔNG XÁC ĐỊNH";
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Badge variant="outline" className={cn("flex items-center gap-1")}>
              <AiOutlineUser className="h-3 w-3" />
              {roleNameInVietnamese}
            </Badge>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>
    );
  },
  enableSorting: false,
  enableHiding: false,
} as const;

export default roleNameColumn;
