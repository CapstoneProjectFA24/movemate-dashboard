'use client'
import { Badge } from "@/components/ui/badge";
import { IStaff } from "@/features/bookings/types/assigment-available-type";
import { User2 } from "lucide-react";

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


export default StaffCardContent;