import { Column, ColumnDef, Row } from "@tanstack/react-table";
import { IAssignment } from "../../types/assignemts-type";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import AlertModal from "@/components/modals/alert-modal";
import { useState } from "react";
import { toast } from "sonner";

interface ActionMenuProps {
  row: Row<IAssignment>;
}

const ActionMenu = ({ row }: ActionMenuProps) => {
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const onConfirmAutoAssignedStaff = async () => {
    try {
      setLoading(true);

      // to do

      toast.success("Cập nhật trạng thái thành công");
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
        <Button variant="outline" size="sm">
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
