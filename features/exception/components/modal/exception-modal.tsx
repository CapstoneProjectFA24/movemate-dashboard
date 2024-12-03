"use client";

import React, { useEffect, useState, useTransition } from "react";
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
import {
  completeReportAvailable,
  manualAssignedStaff,
} from "../../action/update-assignments";
import { toast } from "sonner";
import { CldOgImage } from "next-cloudinary";
import { AssignmentSection } from "./modal-children/assignment-section";
import StaffListSection from "./modal-children/staff-list-section";
import StaffCardContent from "./modal-children/staff-card-content";

export const ExceptionModal: React.FC = () => {
  const { isOpen, onClose, type, data } = useModal();
  const isOpenModal = isOpen && type === "exceptionModal";
  const [isPending, startTransition] = useTransition();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draggedStaff, setDraggedStaff] = useState<IStaff | null>(null);
  const [assignmentReviewers, setAssignmentReviewers] = useState<
    Record<string, IStaff | null>
  >({});

  const [newAssignments, setNewAssignments] = useState<IAssignmentInBooking[]>(
    []
  );

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

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpenModal) {
      setLoadingKey((prevKey) => prevKey + 1);
    }
  }, [isOpenModal]);
  const { data: driverData, isLoading: isLoadingDriver } =
    useGetCheckAvailableDriver(bookingId, loadingKey);

  const { data: porterData, isLoading: isLoadingPorter } =
    useGetCheckAvailablePorter(bookingId, loadingKey);

  const staffData = typeStaffAssignment === "TRUCK" ? driverData : porterData;
  const isLoading = isLoadingDriver || isLoadingPorter;

  const addNewAssignment = () => {
    const newId = Date.now() + Math.floor(Math.random() * 1000);

    const newAssignment: IAssignmentInBooking = {
      id: newId,
      bookingId: assignment?.bookingId,
      staffType: typeStaffAssignment === "TRUCK" ? "DRIVER" : "PORTER",
      status: "FAILED",
      isResponsible: false,
    };

    // Add the new assignment to the list of assignments
    setNewAssignments((prev) => [...prev, newAssignment]);
  };


  const hasExistingAssignments =
    staffData?.data?.assignmentInBooking!.length! > 0;
  const remainingStaffCount = hasExistingAssignments
    ? staffData?.data?.assignmentInBooking!.length! -
      staffData?.data?.assignmentInBooking!.filter(
        (staff) => staff.status === "FAILED"
      ).length!
    : 0;

  const maxNewAssignments =
    staffData?.data?.bookingNeedStaffs! -
    (hasExistingAssignments ? remainingStaffCount : 0);

  const isCreateNewAssignments = newAssignments.length >= maxNewAssignments;

  // check valid to show button to confirm to resolve report
  const canResolveReport =
    staffData?.data?.bookingNeedStaffs! <= remainingStaffCount;
  // console.log(canResolveReport)

  const handleCompleteReport = async () => {
    if (canResolveReport) {
      setIsSubmitting(true);
      startTransition(async () => {
        try {
          const result = await completeReportAvailable(
            assignment?.id.toString()!
          );
          if (!result.success) {
            toast.error(result.error);
            return;
          }
          onClose();
          toast.success("Giải quyết sự cố thành công");
        } catch (error) {
          toast.error("Có lỗi xảy ra");
        } finally {
          setIsSubmitting(false);
        }
      });
    }
  };

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

      // Nếu assignment cũ đã có nhân viên, cần xóa nhân viên cũ ra khỏi danh sách
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
      setNewAssignments([]);
      setAvailableOtherStaffs([]);
      setActiveId(null);
      setDraggedStaff(null);
    }
  }, [isOpenModal]);

  const handleCloseModal = () => {
    // Reset lại tất cả các state liên quan
    setActiveId(null);
    setDraggedStaff(null);
    setNewAssignments([]);
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
                enalble={canResolveReport}
                setLoadingKey={setLoadingKey}
                assignedStaff={assignmentReviewers[assignment.id!] || null}
                onUnassign={handleUnassign}
                onConfirm={handleConfirmAssignment}
              />
            ))}

            {newAssignments.map((assignment) => (
              <AssignmentSection
                key={assignment.id}
                assignment={assignment}
                setNewAssignments={setNewAssignments}
                enalble={canResolveReport}
                setLoadingKey={setLoadingKey}
                assignedStaff={assignmentReviewers[assignment.id!] || null}
                onUnassign={handleUnassign}
                onConfirm={handleConfirmAssignment}
                isCreateNew={true}
              />
            ))}

            {!isCreateNewAssignments && (
              <Button
                onClick={addNewAssignment}
                variant="action"
                className="mb-4"
              >
                Thêm vùng chứa nhân viên
              </Button>
            )}
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
          <div className="flex w-full items-center gap-8">
            <div className="flex items-center gap-2">
              {typeStaffAssignment === "TRUCK" ? (
                <Truck className="h-5 w-5" />
              ) : (
                <Package2 className="h-5 w-5" />
              )}
              <DialogTitle className="text-2xl font-semibold">
                Kiểm tra{" "}
                {typeStaffAssignment === "TRUCK" ? "tài xế" : "bốc vác"} gặp vấn
                đề
              </DialogTitle>
            </div>
            {canResolveReport && (
              <Button
                variant="secondary"
                onClick={handleCompleteReport}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                    Đang xử lý...
                  </div>
                ) : (
                  "Xác nhận đã xử lý sự cố"
                )}
              </Button>
            )}
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
      </DialogContent>
    </Dialog>
  );
};
