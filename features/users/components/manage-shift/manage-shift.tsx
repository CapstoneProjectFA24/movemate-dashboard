"use client";

import React, { useState } from "react";
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
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ScrollArea } from "@/components/ui/scroll-area";

interface Shift {
  id: number;
  shiftName: string;
  startTime: string | null;
  endTime: string | null;
}

const TimePickerDialog = ({
  value,
  onChange,
  label,
}: {
  value: string | null;
  onChange: (time: string) => void;
  label: string;
}) => {
  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  const [isOpen, setIsOpen] = useState(false);
  const [tempHour, setTempHour] = useState(value?.split(":")[0] || "00");
  const [tempMinute, setTempMinute] = useState(value?.split(":")[1] || "00");

  const handleTimeSelect = (type: "hour" | "minute", value: string) => {
    if (type === "hour") {
      setTempHour(value);
    } else {
      setTempMinute(value);
    }
  };

  const handleConfirm = () => {
    const newTime = `${tempHour}:${tempMinute}`;
    onChange(newTime);
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <Clock className="mr-2 h-4 w-4" />
          {value || "Chọn thời gian"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <div className="font-medium text-sm">Giờ</div>
            <ScrollArea className="h-72 rounded-md border">
              <div className="p-2">
                {hours.map((hour) => (
                  <Button
                    key={hour}
                    variant={hour === tempHour ? "default" : "ghost"}
                    className="w-full justify-start mb-1"
                    onClick={() => handleTimeSelect("hour", hour)}
                  >
                    {hour}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-sm">Phút</div>
            <ScrollArea className="h-72 rounded-md border">
              <div className="p-2">
                {minutes.map((minute) => (
                  <Button
                    key={minute}
                    variant={minute === tempMinute ? "default" : "ghost"}
                    className="w-full justify-start mb-1"
                    onClick={() => handleTimeSelect("minute", minute)}
                  >
                    {minute}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm">
            Thời gian đã chọn:{" "}
            <span className="font-semibold">
              {tempHour}:{tempMinute}
            </span>
          </div>
          <Button
            onClick={handleConfirm}
            className="bg-orange-600 hover:bg-orange-700"
          >
            Xác nhận
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const MangageShift: React.FC = () => {
  const [shiftName, setShiftName] = useState("");
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [shifts, setShifts] = useState<Shift[]>([
    {
      id: 1,
      shiftName: "Ca sáng",
      startTime: "08:00",
      endTime: "12:00",
    },
    {
      id: 2,
      shiftName: "Ca chiều",
      startTime: "13:00",
      endTime: "17:00",
    },
  ]);

  const handleSave = () => {
    if (!shiftName || !startTime || !endTime) {
      setError("Vui lòng điền đầy đủ thông tin ca làm việc.");
      return;
    }

    const newShift: Shift = {
      id: Date.now(),
      shiftName,
      startTime,
      endTime,
    };

    setShifts((prev) => [...prev, newShift]);
    setShiftName("");
    setStartTime(null);
    setEndTime(null);
    setError(null);
  };

  const handleDelete = (id: number) => {
    setShifts((prev) => prev.filter((shift) => shift.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Form tạo ca làm việc */}
        <Card className="shadow-lg">
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

            {/* Tên ca làm việc */}
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

            {/* Thời gian */}
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

        {/* Danh sách ca làm việc */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Danh sách ca làm việc
          </h2>
          <div className="space-y-4">
            {shifts.map((shift) => (
              <Card
                key={shift.id}
                className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-orange-600">
                        {shift.shiftName}
                      </h3>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>
                            {shift.startTime} - {shift.endTime}
                          </span>
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDelete(shift.id)}
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MangageShift;
