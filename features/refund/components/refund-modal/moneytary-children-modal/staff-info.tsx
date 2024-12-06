"use client";
import { Button } from "@/components/ui/button";
import { useGetOrCreateStaffConversation } from "@/features/chat-realtime/react-query/query";
import { IAssignments } from "@/features/refund/types/refund-type";
import { useModal } from "@/hooks/use-modal";
import { MessageCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

interface StaffInfoModal {
  staff: IAssignments;
  onClose: () => void;
}

const StaffInfo = ({ staff ,onClose}: StaffInfoModal) => {
  const { onOpen } = useModal();

  // need fix will change to fetch data from user with id and passing to it

  const { data: session } = useSession();
  const { mutateAsync: getOrCreateConversation } =
    useGetOrCreateStaffConversation(
      session?.user.id.toString()!,
      session?.user.roleName.toLowerCase()!,
      staff?.userId?.toString()!,
      staff?.staffType?.toLowerCase()!
    );

  const handleContact = () => {
    getOrCreateConversation();
    onClose()
    onOpen("chatWithStaffModal", { staff: staff });
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-3">
        <Image
          src="https://github.com/shadcn.png"
          width={40}
          height={40}
          alt="tên nhân viên"
          className="rounded-full"
        />
        <h4 className="font-medium text-sm flex flex-col">
          <span className="text-xs">nhân viên </span>
        </h4>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={handleContact}
        type="button"
        className="flex items-center"
      >
        <MessageCircle className="w-4 h-4 mr-2" />
        Đối chiếu với staff
      </Button>
    </div>
  );
};

export default StaffInfo;
