import { Column, ColumnDef, Row } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import AlertModal from "@/components/modals/alert-modal";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { useModal } from "@/hooks/use-modal";
import { autoAssignDriver, autoAssignPorter } from "@/features/exception/action/update-assignments";
import { IAssignment } from "@/features/exception/types/assignemts-type";

interface ActionMenuProps {
  row: Row<IAssignment>;
}

const ActionMenu = ({ row }: ActionMenuProps) => {
  const { onOpen } = useModal();
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const currentBookingId = row.original.bookingId;
  const currentStaffType = row.original.type;

  const onConfirmAutoAssignedStaff = async () => {
    try {
      setLoading(true);

      startTransition(async () => {
        if (currentStaffType === "TRUCK") {
          const result = await autoAssignDriver(currentBookingId?.toString()!);
          if (!result.success) {
            toast.error(result.error);
            return;
          }
          toast.success("Xác nhận gán nhân viên thành công!");
        } else if (currentStaffType === "PORTER") {
          const result = await autoAssignPorter(currentBookingId?.toString()!);
          if (!result.success) {
            toast.error(result.error);
            return;
          }
          toast.success("Xác nhận gán nhân viên thành công!");
        } else {
          toast.error("Không thể tự động gán nhân viên cho loại này");
        }
      });
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi gán tự động nhân viên mới");
    } finally {
      setLoading(false);
      setOpenUpdateModal(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={openUpdateModal}
        onClose={() => setOpenUpdateModal(false)}
        onConfirm={onConfirmAutoAssignedStaff}
        loading={loading}
        variant="info"
        title="Tự động gán nhân viên"
        description="Bạn có chắc chắn muốn tự động cập nhật gán nhân viên vô không?"
      />

      <div className="flex gap-2">
        <Button
          type="button"
          onClick={() => onOpen("exceptionModal", { assignment: row.original })}
          variant="outline"
          size="sm"
        >
          Phân Công
        </Button>
        <Button
          variant="outline"
          size="sm"
          type="button"
          className="text-green-600 hover:text-green-700"
          onClick={() => setOpenUpdateModal(true)}
        >
          <Wand2 className="h-4 w-4 mr-1" />
          Tự động
        </Button>
      </div>
    </>
  );
};

export const actionColumn: ColumnDef<IAssignment> = {
  id: "actions",
  header: ({ column }: { column: Column<any, unknown> }) => (
    <DataTableColumnHeader column={column} title="Thao tác" />
  ),

  cell: ({ row }) => <ActionMenu row={row} />,
  enableSorting: false,
  enableHiding: false,
} as const;

export default actionColumn;
