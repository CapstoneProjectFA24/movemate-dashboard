"use client";

import React, { useEffect, useState } from "react";
import { useModal } from "@/hooks/use-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useGetCheckAvailableDriver,
  useGetCheckAvailablePorter,
} from "@/features/bookings/react-query/query";
import { AlertCircle, Package2, Truck, User2, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  IAssigmentAvailable,
  IAssignmentInBooking,
  IStaff,
} from "@/features/bookings/types/assigment-available-type";
import {
  DndContext,
  DragOverlay,
  useDraggable,
  useDroppable,
  DragEndEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import { Button } from "@/components/ui/button";

interface DraggableStaffCardProps {
  staff: IStaff;
  isAssigned?: boolean;
  onRemove?: () => void;
}

const DraggableStaffCard: React.FC<DraggableStaffCardProps> = ({
  staff,
  isAssigned = false,
  onRemove,
}) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: staff.id!.toString(),
    data: { ...staff, isAssigned },
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`flex items-center p-3 bg-background rounded-lg border shadow-sm 
        transition-all hover:shadow-md cursor-grab active:cursor-grabbing relative
        ${isDragging ? "opacity-50 scale-105" : ""}`}
    >
      <StaffCardContent staff={staff} />
      {isAssigned && onRemove && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-destructive hover:bg-destructive/90"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <X className="h-4 w-4 text-white" />
        </Button>
      )}
    </div>
  );
};

// Staff Card Content Component
interface StaffCardContentProps {
  staff: IStaff;
}

const StaffCardContent: React.FC<StaffCardContentProps> = ({ staff }) => {
  // console.log(staff);
  return (
    <div className="flex items-center gap-4 w-full">
      {staff.avatarUrl ? (
        <img
          src={staff.avatarUrl}
          alt={staff.name || "Avatar"}
          className="h-12 w-12 rounded-full object-cover border-2 border-border"
        />
      ) : (
        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
          <User2 className="h-6 w-6 text-muted-foreground" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-medium truncate">{staff.name || "N/A"}</p>
          <Badge variant="outline" className="text-xs shrink-0">
            {staff.roleName}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground truncate">
          {staff.phone || "Chưa có SĐT"}
        </p>
        {staff.email && (
          <p className="text-xs text-muted-foreground truncate">
            {staff.email}
          </p>
        )}
      </div>
    </div>
  );
};

// Assignment Section Component
interface AssignmentSectionProps {
  assignment: IAssignmentInBooking;
  assignedStaff: IStaff | null;
  onUnassign: (assignmentId: string, staff: IStaff) => void;
  onConfirm: (assignmentId: string, staff: IStaff) => void;
}

const AssignmentSection: React.FC<AssignmentSectionProps> = ({
  assignment,
  assignedStaff,
  onUnassign,
  onConfirm,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `assignment-${assignment.id}`,
  });

  const handleUnassign = () => {
    if (assignedStaff && assignment.id) {
      onUnassign(assignment.id.toString()!, assignedStaff);
    }
  };

  const handleConfirm = () => {
    if (assignedStaff && assignment.id) {
      onConfirm(assignment.id.toString()!, assignedStaff);
      console.log(assignment.id.toString()!);
      console.log(assignedStaff);
    }
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
                {!assignedStaff && (
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
      </div>
      {assignedStaff && (
        <div className="flex justify-end mt-4">
          <Button onClick={handleConfirm}>Xác nhận</Button>
        </div>
      )}
    </div>
  );
};

// Staff List Section Component
interface StaffListSectionProps {
  title: string;
  staffs: IStaff[];
  noStaffMessage?: string;
}

const StaffListSection: React.FC<StaffListSectionProps> = ({
  title,
  staffs,
  noStaffMessage = "Không có nhân viên",
}) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h3 className="font-medium">{title}</h3>
      <Badge variant="outline">{staffs.length} nhân viên</Badge>
    </div>
    <div className="space-y-3">
      {staffs.length > 0 ? (
        staffs.map((staff) => (
          <DraggableStaffCard key={staff.id} staff={staff} />
        ))
      ) : (
        <p className="text-sm text-muted-foreground text-center py-4">
          {noStaffMessage}
        </p>
      )}
    </div>
  </div>
);

export const ExceptionModal: React.FC = () => {
  const { isOpen, onClose, type, data } = useModal();
  const isOpenModal = isOpen && type === "exceptionModal";
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draggedStaff, setDraggedStaff] = useState<IStaff | null>(null);
  const [assignmentReviewers, setAssignmentReviewers] = useState<
    Record<string, IStaff | null>
  >({});
  const [availableStaffInSlot, setAvailableStaffInSlot] = useState<IStaff[]>(
    []
  );
  const [availableOtherStaffs, setAvailableOtherStaffs] = useState<IStaff[]>(
    []
  );
  const [updatedAssignments, setUpdatedAssignments] = useState<
    Record<string, IStaff | null>
  >({});
  const assignment = data?.assignment;
  const bookingId = assignment?.bookingId?.toString() || "";
  const typeStaffAssignment = assignment?.type;
  const [loadingKey, setLoadingKey] = useState<number>(0);

  useEffect(() => {
    if (isOpenModal) {
      setLoadingKey((prevKey) => prevKey + 1);
    }
  }, [isOpenModal]);
  const { data: driverData, isLoading: isLoadingDriver } =
    useGetCheckAvailableDriver(bookingId, loadingKey);

  const { data: porterData, isLoading: isLoadingPorter } =
    useGetCheckAvailablePorter(bookingId, loadingKey);
  const [newAssignments, setNewAssignments] = useState<IAssignmentInBooking[]>(
    []
  );
  const addNewAssignment = () => {
    const newId = Date.now() + Math.floor(Math.random() * 1000);
    // Create a new assignment object
    const newAssignment: IAssignmentInBooking = {
      id: newId,// Generate a unique ID for the new assignment
      bookingId: assignment?.bookingId,
      staffType: typeStaffAssignment === "TRUCK" ? "DRIVER" : "PORTER",
      status: "FAILED",
      isResponsible: false,
    };

    // Add the new assignment to the list of assignments
    setNewAssignments((prev) => [...prev, newAssignment]);
  };
  const staffData = typeStaffAssignment === "TRUCK" ? driverData : porterData;
  const isLoading = isLoadingDriver || isLoadingPorter;

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const draggedStaffData = active.data.current as {
      isAssigned: boolean;
    } & IStaff;
    setActiveId(active.id.toString());
    setDraggedStaff(draggedStaffData);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const draggedStaffData = active.data.current as {
      isAssigned: boolean;
    } & IStaff;

    if (!over) {
      // Dropped outside any assignment
      if (draggedStaffData.isAssigned) {
        const assignmentId = Object.entries(assignmentReviewers).find(
          ([_, staff]) => staff?.id === draggedStaffData.id
        )?.[0];

        if (assignmentId) {
          handleUnassign(assignmentId, draggedStaffData);
        }
      }
      return;
    }

    if (over.id.toString().startsWith("assignment-")) {
      const targetAssignmentId = over.id.toString().replace("assignment-", "");
      const sourceAssignmentId = Object.entries(assignmentReviewers).find(
        ([_, staff]) => staff?.id === draggedStaffData.id
      )?.[0];

      // Check if the target assignment is a new one
      const isNewAssignment = newAssignments.some(
        (assignment) => assignment.id === parseInt(targetAssignmentId)
      );

      if (targetAssignmentId === sourceAssignmentId) {
        // Dropped on the same assignment, no changes needed
        return;
      }

      // If the old assignment had a staff assigned, remove them from the available lists
      if (sourceAssignmentId && assignmentReviewers[sourceAssignmentId]) {
        const oldAssignedStaff = assignmentReviewers[sourceAssignmentId];
        if (
          staffData?.data?.staffInSlot?.some(
            (s) => s.id === oldAssignedStaff?.id
          )
        ) {
          setAvailableStaffInSlot((prev) => [...prev, oldAssignedStaff!]);
        } else if (
          staffData?.data?.otherStaffs?.some(
            (s) => s.id === oldAssignedStaff?.id
          )
        ) {
          setAvailableOtherStaffs((prev) => [...prev, oldAssignedStaff!]);
        }
      }

      // Update assignment reviewers
      setAssignmentReviewers((prev) => ({
        ...prev,
        [targetAssignmentId]: draggedStaffData,
        [sourceAssignmentId!]: null,
      }));

      // Update updatedAssignments
      setUpdatedAssignments((prev) => ({
        ...prev,
        [targetAssignmentId]: draggedStaffData,
        [sourceAssignmentId!]: null,
      }));

      // If it's a new assignment, update the newAssignments state
      if (isNewAssignment) {
        setNewAssignments((prev) =>
          prev.map((assignment) =>
            assignment.id === parseInt(targetAssignmentId)
              ? { ...assignment, assignedStaff: draggedStaffData }
              : assignment
          )
        );
      }

      // Add the previously assigned staff back to the appropriate available list
      if (sourceAssignmentId) {
        const staffWasAssigned = assignmentReviewers[sourceAssignmentId];
        if (staffWasAssigned) {
          if (
            staffData?.data?.staffInSlot?.some(
              (s) => s.id === staffWasAssigned.id
            )
          ) {
            setAvailableStaffInSlot((prev) => [...prev, staffWasAssigned]);
          } else if (
            staffData?.data?.otherStaffs?.some(
              (s) => s.id === staffWasAssigned.id
            )
          ) {
            setAvailableOtherStaffs((prev) => [...prev, staffWasAssigned]);
          }
        }
      }

      // Remove the newly assigned staff from the available lists
      if (
        staffData?.data?.staffInSlot?.some((s) => s.id === draggedStaffData.id)
      ) {
        setAvailableStaffInSlot((prev) =>
          prev.filter((s) => s.id !== draggedStaffData.id)
        );
      } else if (
        staffData?.data?.otherStaffs?.some((s) => s.id === draggedStaffData.id)
      ) {
        setAvailableOtherStaffs((prev) =>
          prev.filter((s) => s.id !== draggedStaffData.id)
        );
      }

      setActiveId(null);
      setDraggedStaff(null);
    }
  };

  const handleUnassign = (assignmentId: string, staff: IStaff) => {
    setAssignmentReviewers((prev) => ({
      ...prev,
      [assignmentId]: null,
    }));

    setUpdatedAssignments((prev) => ({
      ...prev,
      [assignmentId]: null,
    }));
    setNewAssignments((prev) =>
      prev.map((assignment) =>
        assignment.id === parseInt(assignmentId)
          ? { ...assignment, assignedStaff: null }
          : assignment
      )
    );
    // Đưa nhân viên trở lại danh sách phù hợp
    if (staffData?.data?.staffInSlot?.some((s) => s.id === staff.id)) {
      // Nếu nhân viên thuộc danh sách staffInSlot ban đầu
      setAvailableStaffInSlot((prev) => [...prev, staff]);
    } else if (staffData?.data?.otherStaffs?.some((s) => s.id === staff.id)) {
      // Nếu nhân viên thuộc danh sách otherStaffs ban đầu
      setAvailableOtherStaffs((prev) => [...prev, staff]);
    }

    setActiveId(null);
    setDraggedStaff(null);
  };

  const handleConfirmAssignment = (assignmentId: string, staff: IStaff) => {
    // Lưu lại assignment đã được cập nhật
    setUpdatedAssignments((prev) => ({
      ...prev,
      [assignmentId]: staff,
    }));
    setNewAssignments((prev) =>
      prev.map((assignment) =>
        assignment.id === parseInt(assignmentId)
          ? { ...assignment, assignedStaff: staff }
          : assignment
      )
    );
    // Cập nhật danh sách nhân viên khả dụng
    if (staffData?.data?.staffInSlot?.some((s) => s.id === staff.id)) {
      setAvailableStaffInSlot((prev) => prev.filter((s) => s.id !== staff.id));
    } else if (staffData?.data?.otherStaffs?.some((s) => s.id === staff.id)) {
      setAvailableOtherStaffs((prev) => prev.filter((s) => s.id !== staff.id));
    }
  };

  // Reset state when modal is closed
  useEffect(() => {
    if (!isOpenModal) {
      setAssignmentReviewers({});
      setAvailableStaffInSlot([]);
      setAvailableOtherStaffs([]);
      setActiveId(null);
      setDraggedStaff(null);
    }
  }, [isOpenModal]);

  const handleCloseModal = () => {
    // Reset lại tất cả các state liên quan
    setActiveId(null);
    setDraggedStaff(null);
    setAssignmentReviewers({});
    setAvailableStaffInSlot([]);
    setAvailableOtherStaffs([]);
    onClose(); // Đóng modal
  };

  // Initialize available staff lists when data is loaded
  useEffect(() => {
    if (staffData?.data) {
      const { staffInSlot = [], otherStaffs = [] } = staffData.data;

      // Clear existing assignments
      setAssignmentReviewers({});

      // Reset available staff lists
      setAvailableStaffInSlot(staffInSlot);
      setAvailableOtherStaffs(otherStaffs);
    }
  }, [staffData]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="text-sm text-muted-foreground">Đang tải...</p>
          </div>
        </div>
      );
    }

    const data = staffData?.data;
    if (!data) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center gap-2">
            <AlertCircle className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Không có dữ liệu</p>
          </div>
        </div>
      );
    }

    const { assignmentInBooking = [] } = data;
    const filteredAssignments = assignmentInBooking?.filter(
      (assignment) =>
        assignment.staffType ===
        (typeStaffAssignment === "TRUCK" ? "DRIVER" : "PORTER")
    );

    return (
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Assignments */}
          <div className="col-span-2 space-y-6  ">
            {filteredAssignments.map((assignment) => (
              <AssignmentSection
                key={assignment.id}
                assignment={assignment}
                assignedStaff={assignmentReviewers[assignment.id!] || null}
                onUnassign={handleUnassign}
                onConfirm={handleConfirmAssignment}
              />
            ))}
            {newAssignments.map((assignment) => (
              <AssignmentSection
                key={assignment.id}
                assignment={assignment}
                assignedStaff={assignmentReviewers[assignment.id!] || null}
                onUnassign={handleUnassign}
                onConfirm={handleConfirmAssignment}
                
              />
            ))}
            <Button onClick={addNewAssignment} className="mb-4">
              Thêm vùng chứa nhân viên
            </Button>
          </div>

          {/* Right Column - Available Staff */}
          <div className="col-span-1">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium flex justify-center text-primary">
                  Nhân viên sẵn có
                </CardTitle>
              </CardHeader>
              <CardContent>
                <StaffListSection
                  title="Nhân viên trong slot"
                  staffs={availableStaffInSlot}
                  noStaffMessage="Không có nhân viên trong slot"
                />

                {availableOtherStaffs.length > 0 && (
                  <>
                    <div className="my-4 border-t" />
                    <StaffListSection
                      title="Nhân viên slot khác"
                      staffs={availableOtherStaffs}
                    />
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <DragOverlay>
          {draggedStaff && (
            <div className="bg-background border rounded-lg shadow-lg p-3">
              <StaffCardContent staff={draggedStaff} />
            </div>
          )}
        </DragOverlay>
      </DndContext>
    );
  };

  return (
    <Dialog open={isOpenModal} onOpenChange={handleCloseModal}>
      <DialogContent className="max-w-7xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            {typeStaffAssignment === "TRUCK" ? (
              <Truck className="h-5 w-5" />
            ) : (
              <Package2 className="h-5 w-5" />
            )}
            <DialogTitle className="text-2xl font-semibold">
              Kiểm tra {typeStaffAssignment === "TRUCK" ? "tài xế" : "bốc vác"}{" "}
              gặp vấn đề
            </DialogTitle>
          </div>
          <DialogDescription className="mt-2">
            <span>
              Tổng nhân viên cần: {staffData?.data?.bookingNeedStaffs || 0}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="h-[60vh] overflow-hidden">
          <ScrollArea className="h-full pr-4">{renderContent()}</ScrollArea>
        </div>
        {/* <div className="flex justify-end mt-4">
      <Button onClick={handleSaveAssignments}>Lưu</Button>
    </div> */}
      </DialogContent>
    </Dialog>
  );
};
