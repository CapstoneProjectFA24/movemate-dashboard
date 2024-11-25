'use client'
import { Badge } from "@/components/ui/badge";
import { IStaff } from "@/features/bookings/types/assigment-available-type";
import DraggableStaffCard from "./draggable-staff-card";

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

export default StaffListSection;