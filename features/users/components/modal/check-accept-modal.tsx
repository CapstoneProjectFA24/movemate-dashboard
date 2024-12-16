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
    error: userError,
  } = useGetUserById(data.user?.id.toString()!);

  const typeTranslations = {
    PORTRAIT: "Ảnh chân dung",
    CITIZEN_IDENTIFICATION_CARD: "CMND/CCCD",
    HEALTH_CERTIFICATE: "Giấy khám sức khỏe",
    DRIVER_LICENSE: "Bằng lái xe",
    CRIMINAL_RECORD: "Lý lịch tư pháp",
    CURRICULUM_VITAE: "Sơ yếu lý lịch",
  } as const;
  type InfoType = keyof typeof typeTranslations;

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
      <DialogContent className="max-w-2xl h-auto p-6 bg-white rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-gray-800">
            Xét duyệt cho tài xế
          </DialogTitle>
        </DialogHeader>
        {userIsLoading ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="ml-2">Đang tải thông tin...</span>
          </div>
        ) : userError ? (
          <div className="text-red-500 text-center">
            Lỗi: Không thể tải thông tin người dùng
          </div>
        ) : (
          <div className="space-y-4">
            {/* Thông tin người dùng */}
            <div className="rounded-lg border p-4 bg-gray-50">
              <h3 className="text-lg font-semibold mb-2">Thông tin người dùng</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p><strong>Tên:</strong> {userData?.data?.name}</p>
                <p><strong>Số điện thoại:</strong> {userData?.data?.phone}</p>
                <p><strong>Giới tính:</strong> {userData?.data?.gender}</p>
                <p><strong>Email:</strong> {userData?.data?.email}</p>
                <p><strong>Ngày sinh:</strong> {userData?.data?.dob}</p>
                <p><strong>Vai trò:</strong> {userData?.data?.roleName}</p>
              </div>
            </div>

            {/* Thông tin bổ sung */}
            {userData?.data?.userInfos && userData.data.userInfos.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Thông tin bổ sung</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {userData.data.userInfos.map((info) => (
                    <div
                      key={info.id}
                      className="rounded-lg border p-3 bg-white shadow-md hover:shadow-lg transition-shadow"
                    >
                      <h4 className="text-md font-semibold mb-1 text-center">
                      {typeTranslations[info.type as InfoType] || info.type}
                      </h4>
                      {info.imageUrl ? (
                        <img
                          src={info.imageUrl}
                          alt={info.type}
                          className="w-full h-24 object-cover rounded-md"
                        />
                      ) : (
                        <p className="text-gray-500 text-center">Không có ảnh</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Nút chấp thuận */}
            <div className="text-center">
              <Button
                className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors duration-200"
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
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
