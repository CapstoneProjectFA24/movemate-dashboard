'use client'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IStaff } from "@/features/bookings/types/assigment-available-type";
import { useDraggable } from "@dnd-kit/core";
import { AlertCircle, Package2, Truck, User2, Plus, X } from "lucide-react";
import StaffCardContent from "./staff-card-content";

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

export default DraggableStaffCard;