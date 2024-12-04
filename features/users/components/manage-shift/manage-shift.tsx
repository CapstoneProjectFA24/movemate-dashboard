"use client";

import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Clock, Trash2, Plus } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ApiListResponse } from "@/lib/api/api-handler/generic";
import { IShift } from "../../types/shift-type";
import { TimePickerDialog } from "@/components/modals/time-picker-dialog";
import { createShift, deleteShift } from "../../action/shift";
import { toast } from "sonner";
import AlertModal from "@/components/modals/alert-modal";

interface ManageShiftProps {
  shiftData: ApiListResponse<IShift>;
}

const MangageShift = ({ shiftData }: ManageShiftProps) => {
  const [shiftName, setShiftName] = useState("");
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shiftDelete, setShiftDelete] = useState<IShift | null>(null);
  const handleSave = async () => {
    if (!shiftName || !startTime || !endTime) {
      setError("Vui lòng điền đầy đủ thông tin ca làm việc.");
      return;
    }

    const dataToSend = {
      name: shiftName,
      startDate: startTime,
      endDate: endTime,
      type: "SHIFT",
    };

    try {
      const result = await createShift(dataToSend);
      if (!result.success) {
        toast.error(result.error);
      } else {
        toast.success("Tạo ca mới thành công");
        setShiftName("");
        setStartTime(null);
        setEndTime(null);
        setError(null);
      }
    } catch (error) {
      console.error("Error saving shift:", error);
      toast.error("An error occurred while saving the shift.");
    }
  };

  const onDelete = async () => {
    if (shiftDelete) {
      try {
        setLoading(true);
        startTransition(async () => {
          const result = await deleteShift(shiftDelete.id.toString());

          if (!result.success) {
            toast.error(result.error);
          } else {
            toast.success("Xóa thành công.");
          }
        });
      } catch (error: any) {
        toast.error("Đã có lỗi.");
      } finally {
        setLoading(false);
        setOpen(false);
      }
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        variant="danger"
        onConfirm={onDelete}
        loading={loading}
        title="Xóa ca làm việc"
        description="Bạn có chắc chắn muốn xóa ca làm việc này không?"
      />
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-lg ">
            <CardHeader>
              <CardTitle className="text-2xl text-orange-600">
                Tạo ca làm việc mới
              </CardTitle>
              <CardDescription>
                Điền thông tin để tạo ca làm việc mới
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Tên ca làm việc
                </label>
                <Input
                  placeholder="Ví dụ: Ca sáng, Ca chiều..."
                  value={shiftName}
                  onChange={(e) => setShiftName(e.target.value)}
                  className="focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Thời gian bắt đầu
                  </label>
                  <TimePickerDialog
                    value={startTime}
                    onChange={setStartTime}
                    label="Chọn thời gian bắt đầu"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Thời gian kết thúc
                  </label>
                  <TimePickerDialog
                    value={endTime}
                    onChange={setEndTime}
                    label="Chọn thời gian kết thúc"
                  />
                </div>
              </div>

              <Button
                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                onClick={handleSave}
              >
                <Plus className="w-4 h-4 mr-2" />
                Thêm ca làm việc
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Danh sách ca làm việc</h2>
            <ScrollArea className="h-[320px] border border-gray-200 rounded-md shadow-md">
              <div className="space-y-4 p-4">
                {shiftData.data
                  // .sort((a, b) => a.id - b.id)
                  .map((shift) => (
                    <Card
                      key={shift.id}
                      className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200"
                    >
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-orange-600">
                              {shift.name}
                            </h3>
                            <div className="space-y-2">
                              <p className="text-sm text-gray-300 flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>
                                  {shift.startDate} - {shift.endDate}
                                </span>
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => {
                              setShiftDelete(shift);
                              setOpen(true);
                            }}
                          >
                            <Trash2 className="w-5 h-5" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </>
  );
};

export default MangageShift;
