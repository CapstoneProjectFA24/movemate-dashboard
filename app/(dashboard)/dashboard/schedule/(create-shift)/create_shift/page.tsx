"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";

interface Shift {
  id: number;
  shiftName: string;
  workDates: Date[];
  startTime: string | null;
  endTime: string | null;
}

const ServiceSchedule: React.FC = () => {
  const [shiftName, setShiftName] = useState("");
  const [workDates, setWorkDates] = useState<Date[]>([]); 
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);
  const [shifts, setShifts] = useState<Shift[]>([
    {
      id: 1,
      shiftName: "Ca sáng",
      workDates: [new Date()],
      startTime: "08:00",
      endTime: "12:00",
    },
    {
      id: 2,
      shiftName: "Ca chiều",
      workDates: [new Date()],
      startTime: "13:00",
      endTime: "17:00",
    },
  ]);

  const handleSave = () => {
    if (!shiftName || workDates.length === 0 || !startTime || !endTime) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    const newShift: Shift = {
      id: Date.now(),
      shiftName,
      workDates,
      startTime,
      endTime,
    };

    setShifts((prev) => [...prev, newShift]);
    setShiftName("");
    setWorkDates([]);
    setStartTime(null);
    setEndTime(null);
  };

  const handleDelete = (id: number) => {
    setShifts((prev) => prev.filter((shift) => shift.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Form tạo ca làm việc */}
      <Card>
        <CardHeader>
          <CardTitle>Tạo ca làm việc</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Tên ca làm việc */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tên ca làm việc
              </label>
              <Input
                placeholder="Nhập tên ca làm việc"
                value={shiftName}
                onChange={(e) => setShiftName(e.target.value)}
                className="mt-1"
              />
            </div>

            {/* Ngày làm việc */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ngày làm việc
              </label>
              <DayPicker
                mode="multiple"
                selected={workDates}
                onSelect={(dates) => setWorkDates(dates || [])}
                className="mt-1"
              />
            </div>

            {/* Thời gian bắt đầu */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Thời gian bắt đầu
              </label>
              <TimePicker
                value={startTime}
                onChange={setStartTime}
                format="HH:mm"
                disableClock
                className="mt-1"
              />
            </div>

            {/* Thời gian kết thúc */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Thời gian kết thúc
              </label>
              <TimePicker
                value={endTime}
                onChange={setEndTime}
                format="HH:mm"
                disableClock
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>

        <CardContent className="flex justify-end">
          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white"
            onClick={handleSave}
          >
            Lưu
          </Button>
        </CardContent>
      </Card>

      {/* Danh sách ca làm việc */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Danh sách ca làm việc</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {shifts.map((shift) => (
            <Card key={shift.id} className="border border-gray-200 shadow-md">
              <CardContent className="flex flex-col items-start space-y-2">
                <h3 className="text-lg font-medium text-blue-600">
                  {shift.shiftName}
                </h3>
                <p className="text-sm text-gray-600">
                  <strong>Ngày làm việc:</strong>{" "}
                  {shift.workDates.map((date, index) => (
                    <span key={index}>
                      {date.toLocaleDateString("vi-VN")}
                      {index < shift.workDates.length - 1 && ", "}
                    </span>
                  ))}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Thời gian:</strong> {shift.startTime} - {shift.endTime}
                </p>
                <Button
                  className="bg-red-500 hover:bg-red-600 text-white mt-2"
                  onClick={() => handleDelete(shift.id)}
                >
                  Xóa
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceSchedule;
