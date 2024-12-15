'use client'

import React, { useTransition } from "react";
import { useModal } from "@/hooks/use-modal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateAccpet } from "../../action/users";
import { useGetUserById } from "../../react-query/query";
import { Loader2 } from "lucide-react";

export const AccpetUserModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [isPending, startTransition] = useTransition();
  const { 
    data: userData, 
    isLoading: userIsLoading, 
    error: userError 
  } = useGetUserById(data.user?.id.toString()!);

  const handleAccept = () => {
    startTransition(async () => {
      try {
        const result = await updateAccpet(userData?.data?.id!.toString()!);
        if (!result.success) {
          toast.error(result.error || "Có lỗi xảy ra");
          return;
        }
        onClose();
        toast.success("Xác nhận thành công!");
      } catch (error) {
        toast.error("Có lỗi xảy ra khi xác nhận");
      }
    });
  };

  const isModalOpen = isOpen && type === "accpetUserModal";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
          <DialogTitle className="text-2xl font-semibold">
            Xét duyệt cho tài xế
          </DialogTitle>
          
          {userIsLoading ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Đang tải thông tin...</span>
            </div>
          ) : userError ? (
            <div className="text-red-500">
              Lỗi: Không thể tải thông tin người dùng
            </div>
          ) : (
            <div className="mt-4">
              <Button 
                className="flex bg-green-600 hover:bg-green-700"
                type="button"
                onClick={handleAccept}
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang xử lý...
                  </>
                ) : (
                  "Chấp thuận"
                )}
              </Button>
            </div>
          )}
        </DialogContent>
    </Dialog>
  );
};