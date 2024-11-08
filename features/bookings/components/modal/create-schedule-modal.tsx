import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useModal } from "@/hooks/use-modal";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { updateSchedule } from "../../action/update-booking";
import { useTheme } from "next-themes";

export const CreateScheduleModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const isOpenModal = isOpen && type === "createScheduleModal";
  const params = useParams();
  const { theme } = useTheme();

  const bookingString = data.booking?.bookingAt;
  const bookingAt = bookingString ? new Date(bookingString) : null;
  const [reviewAt, setReviewAt] = useState("");
  const [error, setError] = useState("");

  const validateTime = (value: any) => {
    const selectedTime = new Date(value);
    const currentTime = new Date();

    if (selectedTime < currentTime) {
      setError("Thời gian đánh giá không được nhỏ hơn giờ hiện tại.");
    } else if (bookingAt && selectedTime > bookingAt) {
      setError("Thời gian đánh giá không được lớn hơn thời gian đặt chỗ.");
    } else {
      setError("");
    }
  };

  const onConfirmUpdate = async () => {
    if (!reviewAt) {
      toast.error("Bạn cần nhập thời gian đánh giá.");
      return;
    }

    if (error) {
      toast.error(error);
      return;
    }

    try {
      const dataToSend = { reviewAt };
      console.log(dataToSend);
      const result = await updateSchedule(params.id.toString(), dataToSend);
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      toast.success("Cập thời gian cho khách thành công");
      onClose();
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi cập nhật trạng thái");
    }
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent
        className={`${
          theme === "dark" ? "bg-muted text-gray-200" : "bg-white text-gray-800"
        } rounded-lg`}
      >
        <DialogHeader>
          <DialogTitle>Chỉnh sửa lịch trình</DialogTitle>
        </DialogHeader>
        <CardContent>
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Đơn khách hàng đặt</CardTitle>
            </CardHeader>
            <CardContent>
              Đơn đặt chỗ vào{" "}
              {bookingAt?.toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </CardContent>
          </Card>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="reviewAt"
                className={`block font-medium ${
                  theme === "dark" ? "text-gray-200" : "text-gray-800"
                }`}
              >
                Thời gian đánh giá:
              </label>
              <input
                id="reviewAt"
                type="datetime-local"
                value={reviewAt}
                onChange={(e) => {
                  setReviewAt(e.target.value);
                  validateTime(e.target.value);
                }}
                min={getCurrentDateTime()}
                max={bookingAt ? bookingAt.toISOString().slice(0, 16) : ""}
                className={`mt-1 block w-full rounded-md border ${
                  theme === "dark"
                    ? "border-gray-600 "
                    : "border-gray-300 bg-white"
                } py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}{" "}
            </div>
          </div>
        </CardContent>
        <DialogFooter>
          <Button
            variant={theme === "dark" ? "secondary" : "default"}
            onClick={onClose}
          >
            Hủy
          </Button>
          <Button onClick={onConfirmUpdate} disabled={!reviewAt || !!error}>
            Lưu thay đổi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
