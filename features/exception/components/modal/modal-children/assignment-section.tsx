"use client";

import {
  IAssignmentInBooking,
  IStaff,
} from "@/features/bookings/types/assigment-available-type";
import { useDroppable } from "@dnd-kit/core";
import { useTransition } from "react";
import { manualAssignedStaff } from "../../../action/update-assignments";
import { toast } from "sonner";
import { Loader, Plus, User2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DraggableStaffCard from "./draggable-staff-card";
import { useGetUserById } from "@/features/users/react-query/query";
import Image from "next/image";

interface AssignmentSectionProps {
  assignment: IAssignmentInBooking;
  assignedStaff: IStaff | null;
  onUnassign: (assignmentId: string, staff: IStaff) => void;
  onConfirm: (assignmentId: string, staff: IStaff) => void;
  enalble: boolean;
  setLoadingKey: React.Dispatch<React.SetStateAction<number>>;
  setNewAssignments?: React.Dispatch<
    React.SetStateAction<IAssignmentInBooking[]>
  >;
  isCreateNew?: boolean;
}

export const AssignmentSection: React.FC<AssignmentSectionProps> = ({
  assignment,
  assignedStaff,
  onUnassign,
  onConfirm,
  enalble,
  setLoadingKey,
  setNewAssignments,
  isCreateNew = false,
}) => {
  const [isPending, startTransition] = useTransition();
  const { setNodeRef, isOver } = useDroppable({
    id: `assignment-${assignment.id}`,
  });

  const { data: userInfo, isLoading: userLoading } = useGetUserById(
    assignment.userId?.toString()!
  );
  
  type AssignmentStatus = "WAITING" | "FAILED" | "ASSIGNED";
  const assignmentStatusType: Record<AssignmentStatus, string> = {
    WAITING: "Đang chờ",
    FAILED: "Gặp sự cố",
    ASSIGNED: "Đã gán",
  };

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
      needReplaceAssignmentId: userInfo?.data?.id
    };
    console.log(dataToSend);
    startTransition(async () => {
      const result = await manualAssignedStaff(
        dataToSend,
        assignment.bookingId?.toString()!
      );
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      toast.success("Gán thủ công nhân viên thành công");
      setLoadingKey((prevKey) => prevKey + 1);
      if (setNewAssignments) {
        setNewAssignments([]);
      }
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
              <Image
                src={userInfo?.data?.avatarUrl!}
                alt="user-info"
                width={48}
                height={48}
                className="text-muted-foreground rounded-full"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <div>
                  <div className="flex space-x-2">
                    <p className="text-sm font-medium  ">
                      {userInfo?.data?.name}
                    </p>
                    <Badge variant="outline" className="text-xs shrink-0">
                      {assignment.staffType}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {userInfo?.data?.phone || "Chưa có SĐT"}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {userInfo?.data?.email}
                  </p>
                </div>
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
                  <Image
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
                {/* {assignment.status} */}
                {assignmentStatusType[assignment.status]}
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
      {!isCreateNew ? (
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column - Assignment Info */}
          <div>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                <Image
                  src={userInfo?.data?.avatarUrl!}
                  alt="user-info"
                  width={48}
                  height={48}
                  className="text-muted-foreground rounded-full"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {!assignedStaff && !enalble && (
                    <Badge variant="destructive" className="text-xs shrink-0">
                      Cần thêm nhân viên
                    </Badge>
                  )}
                </div>
                <div className="flex space-x-2">
                  <p className="text-sm font-medium  ">
                    {userInfo?.data?.name}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">
                    {userInfo?.data?.phone || "Chưa có SĐT"}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {userInfo?.data?.email}
                </p>
                <div className="flex gap-2 items-center text-sm text-muted-foreground">
                  <Badge variant="outline" className="text-xs">
                    {assignment.staffType}
                  </Badge>
                  <span>•</span>
                  <span className="space-x-2">
                    <span> Trạng thái:</span>
                    <span>
                      {assignmentStatusType[
                        assignment.status as keyof typeof assignmentStatusType
                      ] ?? "Không xác định"}
                    </span>
                  </span>
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
              className={`rounded-lg transition-all h-full ${
                isOver ? "ring-2 ring-primary" : ""
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
               ${
                 isOver
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
      ) : (
        <div className="flex justify-center items-center">
          {!enalble && (
            <div
              ref={setNodeRef}
              className={`rounded-lg transition-all h-full ${
                isOver ? "ring-2 ring-primary" : ""
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
             ${
               isOver
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
      )}

      {assignedStaff && (
        <div className="flex justify-end mt-4 ">
          <Button className="relative" onClick={handleConfirm}>
            {isPending ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader className="animate-spin h-5 w-5 text-white" />
              </div>
            ) : (
              "Xác nhận"
            )}
          </Button>
        </div>
      )}
    </div>
  );
};
