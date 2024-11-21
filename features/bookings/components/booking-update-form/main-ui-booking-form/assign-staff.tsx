"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Assignment, IBooking } from "@/features/bookings/types/booking-type";
import { Truck, User, CheckCircle } from "lucide-react";
import StaffInfo from "./staff-info";

interface AssignStaffProps {
  booking: IBooking | null;
}
type StaffType = "DRIVER" | "PORTER" | "REVIEWER";

// Mapping staffType to Vietnamese translation
const staffTypeTranslations: Record<StaffType, string> = {
  DRIVER: "Nhân viên lái xe",
  PORTER: "Nhân viên bốc vác",
  REVIEWER: "Người đánh giá",
};

const AssignStaff = ({ booking }: AssignStaffProps) => {
  const groupedAssignments = useMemo(() => {
    const groups: Record<StaffType, any[]> = {
      DRIVER: [],
      PORTER: [],
      REVIEWER: [],
    };

    booking?.assignments?.forEach((assignment) => {
      const staffType = assignment.staffType;
      if (staffType && staffType in groups) {
        groups[staffType as StaffType].push(assignment);
      }
    });

    return groups;
  }, [booking?.assignments]);

  const getStaffTypeIcon = (staffType: string) => {
    switch (staffType) {
      case "DRIVER":
        return <Truck className="w-5 h-5 text-blue-500" />;
      case "PORTER":
        return <User className="w-5 h-5 text-green-500" />;
      case "REVIEWER":
        return <CheckCircle className="w-5 h-5 text-purple-500" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nhân viên được phân công</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {(["REVIEWER", "DRIVER", "PORTER"] as const).map((staffType) => (
          <div key={staffType} className="border-b pb-2 last:border-b-0">
            <div className="flex items-center space-x-2 mb-2">
              {getStaffTypeIcon(staffType)}
              <h3 className="font-semibold">{staffTypeTranslations[staffType]}</h3>
            </div>
            {groupedAssignments[staffType]?.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-3">
                {groupedAssignments[staffType].map(
                  (assignment: Assignment, index) => (
                    <div
                      key={index}
                      className={`p-2 ${
                        assignment.isResponsible ? "bg-yellow-50" : ""
                      }`}
                    >
                      <StaffInfo assignment={assignment} groupedAssignments={groupedAssignments} />
                    </div>
                  )
                )}
              </div>
            ) : (
              <p className="pl-7 text-gray-500">Chưa có nhân viên</p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AssignStaff;
