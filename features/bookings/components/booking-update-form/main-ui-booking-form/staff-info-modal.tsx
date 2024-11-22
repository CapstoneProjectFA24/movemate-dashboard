"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IStaff } from "@/features/bookings/types/assigment-available-type";
import { useGetOrCreateStaffConversation } from "@/features/chat-realtime/react-query/query";
import { useModal } from "@/hooks/use-modal";
import { MessageCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

interface StaffInfoModal {
  staff: IStaff;
}

const StaffInfoModal = ({ staff }: StaffInfoModal) => {
  const { onOpen } = useModal();
  const { data: session } = useSession();
  const { mutateAsync: getOrCreateConversation } =
    useGetOrCreateStaffConversation(
      session?.user.id.toString()!,
      session?.user.roleName.toLowerCase()!,
      staff?.id?.toString()!,
      staff?.roleName?.toLowerCase()!
    );

  const handleContact = () => {
    getOrCreateConversation();

    onOpen("chatWithStaffModal", { staff: staff });
  };
  return (
    <Card key={staff.id} className=" shadow-md rounded-lg overflow-hidden">
      <div className=" border-b flex justify-between items-center px-2">
        <div className="flex items-center gap-3 p-4">
          <Image
            src={staff.avatarUrl!}
            width={40}
            height={40}
            alt={staff.name!}
            className="rounded-full"
          />
          <h4 className="font-medium text-sm">{staff.name}</h4>
        </div>

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
      <div className="p-4">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">Vai trò:</p>
          <p className="text-xs font-medium">{staff.roleName}</p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-gray-500">SĐT:</p>
          <p className="text-xs font-medium">{staff.phone}</p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-gray-500">Email:</p>
          <p className="text-xs font-medium">{staff.email}</p>
        </div>
      </div>
    </Card>
  );
};

export default StaffInfoModal;
