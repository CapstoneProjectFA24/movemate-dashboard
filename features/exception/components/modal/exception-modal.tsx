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
import { AlertCircle, Package2, Truck, User2, Plus } from "lucide-react";
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

// Draggable Staff Card
const DraggableStaffCard = ({ staff }: { staff: IStaff }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: staff.id!.toString(),
    data: staff,
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`flex items-center p-3 bg-background rounded-lg border shadow-sm 
        transition-all hover:shadow-md cursor-grab active:cursor-grabbing
        ${isDragging ? "opacity-50 scale-105" : ""}`}
    >
      <StaffCardContent staff={staff} />
    </div>
  );
};

// Staff Card Content
const StaffCardContent = ({ staff }: { staff: IStaff }) => {
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

// Assignment Section with Droppable Area
const AssignmentSection = ({
  assignment,
  staffs = [],
}: {
  assignment: IAssignmentInBooking;
  staffs: IStaff[];
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `assignment-${assignment.id}`,
  });

  const assignedStaff = staffs[0]; // Get the first (and only) staff

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
            // Show assigned staff with replacement hint
            <div className="p-3 rounded-lg border bg-accent/5 h-full relative group">
              <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <p className="text-sm text-muted-foreground">
                  Kéo thả nhân viên khác để thay thế
                </p>
              </div>
              <StaffCardContent staff={assignedStaff} />
            </div>
          ) : (
            // Show empty dropzone
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
    </div>
  );
};
// Staff List Section
interface StaffListSectionProps {
  title: string;
  staffs: IStaff[];
  noStaffMessage?: string;
}

const StaffListSection = ({
  title,
  staffs,
  noStaffMessage = "Không có nhân viên",
}: StaffListSectionProps) => (
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
  const [assignmentReviewers, setAssignmentReviewers] = useState<Record<string, IStaff[]>>({});
  const [availableStaffInSlot, setAvailableStaffInSlot] = useState<IStaff[]>([]);
  const [availableOtherStaffs, setAvailableOtherStaffs] = useState<IStaff[]>([]);

  const assignment = data?.assignment;
  const bookingId = assignment?.bookingId?.toString();
  const typeStaffAssignment = assignment?.type;

  const { 
    data: driverData, 
    isLoading: isLoadingDriver 
  } = useGetCheckAvailableDriver(bookingId || '');
  
  const { 
    data: porterData, 
    isLoading: isLoadingPorter 
  } = useGetCheckAvailablePorter(bookingId || '');

  const staffData = typeStaffAssignment === "TRUCK" ? driverData : porterData;
  const isLoading = typeStaffAssignment === "TRUCK" ? isLoadingDriver : isLoadingPorter;

  // Added handleDragStart function
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id.toString());
    setDraggedStaff(active.data.current as IStaff);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && over.id.toString().startsWith("assignment-")) {
      const draggedStaff = active.data.current as IStaff;
      const assignmentId = over.id.toString().replace("assignment-", "");
      const previousStaff = assignmentReviewers[assignmentId]?.[0];

      setAssignmentReviewers((prev) => ({
        ...prev,
        [assignmentId]: [draggedStaff],
      }));

      if (staffData?.data!.staffInSlot!.some(s => s.id === draggedStaff.id)) {
        setAvailableStaffInSlot(prev => prev.filter(s => s.id !== draggedStaff.id));
        if (previousStaff) {
          setAvailableStaffInSlot(prev => [...prev, previousStaff]);
        }
      } else if (staffData?.data!.otherStaffs!.some(s => s.id === draggedStaff.id)) {
        setAvailableOtherStaffs(prev => prev.filter(s => s.id !== draggedStaff.id));
        if (previousStaff) {
          setAvailableOtherStaffs(prev => [...prev, previousStaff]);
        }
      }
    }

    setActiveId(null);
    setDraggedStaff(null);
  };

  useEffect(() => {
    if (staffData?.data) {
      setAvailableStaffInSlot(staffData.data.staffInSlot || []);
      setAvailableOtherStaffs(staffData.data.otherStaffs || []);
    }
  }, [staffData]);

  // Added renderStats function
  const renderStats = () => {
    const data = staffData?.data;
    if (!data) return null;

    return (
      <div className="flex gap-4 text-sm text-muted-foreground">
        <span>Tổng nhân viên cần: {data.bookingNeedStaffs || 0}</span>
        <span>•</span>
        <span>Nhân viên trong slot: {data.countStaffInslots || 0}</span>
        <span>•</span>
        <span>Nhân viên slot khác: {data.countOtherStaff || 0}</span>
      </div>
    );
  };

  const renderContent = () => {
    if (isLoading) return <div>...Loading</div>;

    const data = staffData?.data;
    if (!data) return null;

    const { assignmentInBooking = [] } = data;
    const filteredAssignments = assignmentInBooking?.filter(
      (assignment) => assignment.staffType === (typeStaffAssignment === "TRUCK" ? "DRIVER" : "PORTER")
    );

    return (
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Assignments */}
          <div className="col-span-2 space-y-6">
            {filteredAssignments.map((assignment) => (
              <AssignmentSection
                key={assignment.id}
                assignment={assignment}
                staffs={assignmentReviewers[assignment.id!] || []}
              />
            ))}
          </div>

          {/* Right Column - Available Staff */}
          <div className="col-span-1">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium">
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
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            {typeStaffAssignment === "TRUCK" ? (
              <Truck className="h-5 w-5" />
            ) : (
              <Package2 className="h-5 w-5" />
            )}
            <DialogTitle className="text-2xl font-semibold">
              Kiểm tra {typeStaffAssignment === "TRUCK" ? "tài xế" : "porter"}{" "}
              khả dụng
            </DialogTitle>
          </div>
          <DialogDescription className="mt-2">
            {renderStats()}
          </DialogDescription>
        </DialogHeader>

        <div className="h-[60vh] overflow-hidden">
          <ScrollArea className="h-full pr-4">{renderContent()}</ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};