"use client";

import { IRefund } from "@/features/refund/types/refund-type";
import { MessageCircle } from "lucide-react";
import React, { useState } from "react";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { formatter } from "@/lib/utils";
import {
  useGetOrCreateStaffConversation,
  useGetOrCreateUserConversation,
} from "@/features/chat-realtime/react-query/query";
import { useModal } from "@/hooks/use-modal";
import { useSession } from "next-auth/react";
import StaffInfo from "./staff-info";
interface InspectionMoneytaryContentProps {
  row: Row<IRefund>;
  onBack: () => void;
  onSubmit: () => void;
  onClose: () => void;
  setIsChooseRefund: (value: React.SetStateAction<boolean>) => void;
  loading: boolean;
  actionLabel: string;
  secondaryActionLabel: string;
}

const InspectionMoneytaryContent = ({
  row,
  onBack,
  onSubmit,
  loading,
  actionLabel,
  onClose,
  secondaryActionLabel,
  setIsChooseRefund,
}: InspectionMoneytaryContentProps) => {
  const { onOpen } = useModal();
  const { data: session } = useSession();
  const { mutateAsync: getOrCreateConversation } =
    useGetOrCreateUserConversation(
      row.original.owner.id.toString()!,
      row.original.bookingId?.toString()!,
      session?.user.id.toString()!,
      session?.user.roleName.toLowerCase()!
    );

  const handleContact = () => {
    onClose();
    getOrCreateConversation();
    onOpen("chatWithUserModal", {
      bookingId: row.original.bookingId!,
      userId: row.original.owner.id!,
    });

  };

  return (
    <div className=" rounded-lg shadow-2xl overflow-hidden">
      <div className="border-b flex justify-between items-center px-6 py-4">
        <div>
          <h3 className="text-xl font-bold text-gray-700 dark:text-gray-200">
            Kiểm định đơn bồi thường
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Mã đơn: BOK{row.original.bookingId}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          type="button"
          onClick={onBack}
          className="flex items-center"
        >
          {secondaryActionLabel}
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-6 p-6">
        <div>
          <h4 className="font-semibold text-gray-600 dark:text-gray-300 mb-2">
            Thông tin chi tiết
          </h4>
          <div className="text-sm text-gray-700 dark:text-gray-400 space-y-1">
            <p>
              <span className="font-medium">Loại: </span>
              {row.original.title}
            </p>
            <p>
              Số tiền bồi thường khách hàng yêu cầu: {" "}
              <span className="font-medium text-green-500">
                {formatter.format(row.original.estimatedAmount)}
              </span>
            </p>
            <p>
              <span className="font-medium">Có bảo hiểm hay không: </span>
              {row.original.isInsurance === true ? "Có" : "Không"}
            </p>
            <p>
              <span className="font-medium">Mô tả: </span>
              {row.original.description}
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <Card className="shadow-md rounded-lg overflow-hidden">
            <div className="border-b flex justify-between items-center px-4 py-3">
              <div className="flex items-center gap-3">
                <Image
                  src="https://github.com/shadcn.png"
                  width={40}
                  height={40}
                  alt={row.original.owner.name!}
                  className="rounded-full"
                />
                <h4 className="font-medium text-sm flex flex-col">
                  <span>{row.original.owner.name}</span>
                  <span className="text-xs">khách hàng </span>
                </h4>
              </div>
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={handleContact}
                className="flex items-center"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Đối chiếu với khách
              </Button>
            </div>
          </Card>
          <Card className="shadow-md rounded-lg overflow-hidden">
            <div className="border-b flex justify-between items-center px-4 py-3">
              {row.original.assignments
                .filter(
                  (assignment: any) =>
                    assignment.staffType === "PORTER" &&
                    assignment.isResponsible === true
                )
                .map((assignment) => (
                  <div key={assignment.id}>
                    <StaffInfo staff={assignment} onClose={onClose} />
                  </div>
                ))}
            </div>
          </Card>
        </div>
      </div>
      <div className="border-t px-6 py-4">
        <h4 className="font-semibold text-gray-600 dark:text-gray-300 mb-2">
          Kiểm định hình ảnh
        </h4>
        <ScrollArea className="rounded-md border">
          <div className="flex w-max space-x-4 p-4">
            {row.original.trackerSources.map((image) => (
              <figure key={image.id} className="shrink-0">
                <Image
                  src={image.resourceUrl}
                  alt="image"
                  width={100}
                  height={100}
                  unoptimized
                />
              </figure>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <div className="border-t px-6 py-4 flex items-center justify-end space-x-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            onSubmit();
            setIsChooseRefund(false);
          }}
          disabled={loading}
        >
          Yêu cầu không hợp lệ
        </Button>
        <Button
          type="submit"
          className={`min-w-[100px] `}
          onClick={() => {
            onSubmit(), setIsChooseRefund(true);
          }}
          disabled={loading}
        >
          Xác nhận bồi thường
        </Button>
      </div>
    </div>
  );
};

export default InspectionMoneytaryContent;
