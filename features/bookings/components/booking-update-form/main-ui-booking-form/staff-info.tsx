'use client'
import { Assignment } from "@/features/bookings/types/booking-type";
import { useGetUserById } from "@/features/users/react-query/query";
import React from "react";
import { MessageCircle, Phone, Star, User, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";
import { useSession } from "next-auth/react";
import { useGetOrCreateStaffConversation } from "@/features/chat-realtime/react-query/query";

type StaffType = "DRIVER" | "PORTER" | "REVIEWER";

interface StaffInfoProps {
  assignment: Assignment;
  groupedAssignments: Record<StaffType, any[]>;
}

const canAssignResponsible = (
  staffType: StaffType,
  groupedAssignments: Record<StaffType, any[]>
) => {
  const assignments = groupedAssignments[staffType];

  const hasResponsibility = assignments.some(
    (assignment) => assignment.isResponsible
  );

  return !hasResponsibility;
};

const StaffInfo = ({ assignment, groupedAssignments }: StaffInfoProps) => {
  const { data, isLoading } = useGetUserById(assignment.userId?.toString()!);
  const user = data?.data;
  const { onOpen } = useModal();
  const { data: session } = useSession();

  const { mutateAsync: getOrCreateConversation} =
  useGetOrCreateStaffConversation(
    session?.user.id.toString()!,
    session?.user.roleName.toLowerCase()!,
    user?.id.toString()!,
    user?.roleName?.toLowerCase()!
  );

  if (isLoading) return <div className="text-gray-500">Đang tải...</div>;
  if (!user)
    return <div className="text-gray-500">Không tìm thấy nhân viên</div>;

  const isAssignmentAllowed =
    (assignment.staffType === "DRIVER" || assignment.staffType === "PORTER") &&
    canAssignResponsible(assignment.staffType, groupedAssignments);
  
    const handleAssignReponsibility = () => {
        // assignment.id
        // TO DO
    }

    const handleContact =  () => {
      getOrCreateConversation();
 
     onOpen("chatWithStaffModal", { user: user });
   };
  
    return (
      <>
          <div className="flex items-center space-x-3">
      {user.avatarUrl ? (
        <img
          src={user.avatarUrl}
          alt={user.name}
          className="w-10 h-10 rounded-full object-cover"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          <User className="w-6 h-6 text-gray-500" />
        </div>
      )}
      <div className="flex-1">
        <div className="flex items-center">
          <span className="font-semibold mr-2">{user.name}</span>
          {assignment.isResponsible && (
            <Star className="w-4 h-4 text-yellow-500" />
          )}
        </div>
        <div className="flex items-center text-gray-500 text-sm">
          <Phone className="w-4 h-4 mr-1" />
          {user.phone || "Chưa cập nhật"}
        </div>
     
      </div>
   
    </div>
       <div className="flex items-center space-x-2 mt-2">
       {isAssignmentAllowed && !assignment.isResponsible && (
         <Button
           variant="outline"
           size="sm"
           type="button"
           onClick={handleAssignReponsibility}
           className="flex items-center"
         >
           <UserPlus className="w-4 h-4 mr-2" />
           Gán trách nhiệm
         </Button>
       )}
       <Button
         variant="outline"
         size="sm"
         type="button"
         onClick={handleContact}
         className="flex items-center"
       >
         <MessageCircle className="w-4 h-4 mr-2" />
         Chat
       </Button>
     </div>
      </>

  );
};

export default StaffInfo;
