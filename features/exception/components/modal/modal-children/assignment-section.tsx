'use client'

import { IAssignmentInBooking, IStaff } from "@/features/bookings/types/assigment-available-type";
import { useDroppable } from "@dnd-kit/core";
import { useTransition } from "react";
import { manualAssignedStaff } from "../../../action/update-assignments";
import { toast } from "sonner";
import { Plus, User2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DraggableStaffCard from "./draggable-staff-card";

interface AssignmentSectionProps {
  assignment: IAssignmentInBooking;
  assignedStaff: IStaff | null;
  onUnassign: (assignmentId: string, staff: IStaff) => void;
  onConfirm: (assignmentId: string, staff: IStaff) => void;
  enalble: boolean;
  setLoadingKey: React.Dispatch<React.SetStateAction<number>>
}


export const AssignmentSection: React.FC<AssignmentSectionProps> = ({
  assignment,
  assignedStaff,
  onUnassign,
  onConfirm,
  enalble,
  setLoadingKey
}) => {
  const [isPending, startTransition] = useTransition();
  const { setNodeRef, isOver } = useDroppable({
    id: `assignment-${assignment.id}`,
  });

  const handleUnassign = () => {
    if (assignedStaff && assignment.id) {
      onUnassign(assignment.id.toString()!, assignedStaff);
    }
  };

  const handleConfirm = async () => {
    if (assignedStaff && assignment.id) {
      onConfirm(assignment.id.toString()!, assignedStaff);
    }
    // console.log(assignedStaff)
    // console.log(assignment.id)
    const dataToSend = {
      staffType: assignment.staffType,
      assignToUserId: assignedStaff?.id,
    }
    console.log(dataToSend)
    startTransition(async () => {
      const result = await manualAssignedStaff(dataToSend, assignment.bookingId?.toString()!);
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      toast.success("Gán thủ công nhân viên thành công");
      setLoadingKey((prevKey) => prevKey + 1);
    });

  };

  // Waiting status layout - more compact
  if (assignment.status === "WAITING") {
    return (
      <div className="p-3 rounded-lg border bg-background">
        <div className="flex items-center gap-4">
          {/* Assignment Info */}
          <div className="flex items-center gap-3 flex-1">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center shrink-0">
              <User2 className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-medium text-sm">ID: {assignment.userId}</p>
                <Badge variant="outline" className="text-xs">
                  {assignment.staffType}
                </Badge>
              </div>
              {assignment.isResponsible && (
                <p className="text-xs text-muted-foreground">
                  Người chịu trách nhiệm
                </p>
              )}
            </div>
          </div>

          {/* Assigned Staff - Compact View */}
          {assignedStaff && (
            <div className="flex items-center gap-3 px-3 py-2 bg-accent/5 rounded-lg flex-1">
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                {assignedStaff.avatarUrl ? (
                  <img
                    src={assignedStaff.avatarUrl}
                    alt={assignedStaff.name || "Avatar"}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <User2 className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm truncate">
                  {assignedStaff.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {assignedStaff.phone || "Chưa có SĐT"}
                </p>
              </div>
              <Badge variant="outline" className="text-xs shrink-0">
                {assignment.status}
              </Badge>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Failed status layout - original layout with drag and drop
  return (
    <div className="p-4 rounded-lg border bg-background">
      <div className="grid grid-cols-2 gap-6">
        {/* Left Column - Assignment Info */}
        <div>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
              <User2 className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-medium">ID: {assignment.userId}</p>
                {!assignedStaff && !enalble && (
                  <Badge variant="destructive" className="text-xs shrink-0">
                    Cần thêm nhân viên
                  </Badge>
                )}
              </div>
              <div className="flex gap-2 items-center text-sm text-muted-foreground">
                <Badge variant="outline" className="text-xs">
                  {assignment.staffType}
                </Badge>
                <span>•</span>
                <span>Status: {assignment.status}</span>
              </div>
              {assignment.isResponsible && (
                <p className="text-xs text-muted-foreground mt-1">
                  Người chịu trách nhiệm
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Staff Assignment */}
        {!enalble && (
          <div
            ref={setNodeRef}
            className={`rounded-lg transition-all h-full ${isOver ? "ring-2 ring-primary" : ""
              }`}
          >

            {assignedStaff ? (
              <div className="p-3 rounded-lg border bg-accent/5 h-full">
                <DraggableStaffCard
                  staff={assignedStaff}
                  isAssigned={true}
                  onRemove={handleUnassign}
                />
              </div>
            ) : (
              <div
                className={`p-4 rounded-lg border-2 border-dashed h-full flex items-center justify-center
              ${isOver
                    ? "bg-accent/20 border-primary"
                    : "border-muted-foreground/20 hover:border-muted-foreground/40"
                  }`}
              >
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Plus className="h-4 w-4" />
                  <span>Kéo thả nhân viên vào đây</span>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
      {assignedStaff && (
        <div className="flex justify-end mt-4">
          <Button onClick={handleConfirm}>Xác nhận</Button>
        </div>
      )}
    </div>
  );
};