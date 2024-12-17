"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Gift, BarChart3, Clock, Calendar } from "lucide-react";
import { IStatisticBooking } from "@/features/statistic/types/statistic-booking-type";

interface StatisticbookingProps {
  data: IStatisticBooking[];
}

interface DayTranslate {
  [key: string]: string;
}

export const dayTranslateTion: DayTranslate = {
  Sunday: "Chủ nhật",
  Monday: "Thứ hai",
  Tuesday: "Thứ ba",
  Wednesday: "Thứ tư",
  Thursday: "Thứ năm",
  Friday: "Thứ sáu",
  Saturday: "Thứ bảy",
};

const StatisticBooking = ({ data }: StatisticbookingProps) => {
  const mostBookedDayOfWeek =
    dayTranslateTion[data[0].mostBookedDayOfWeek] ||
    data[0].mostBookedDayOfWeek;

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 rounded-lg p-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <BarChart3 className="h-6 w-6 text-green-400" />
          <span>Thống kê đặt chỗ</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Row 1 */}
        <div className="flex justify-between items-center p-2 rounded-lg">
          <div className="flex items-center space-x-3">
            <Truck className="h-6 w-6 text-blue-400" />
            <h3 className="text-base font-medium">Loại xe được đặt nhiều</h3>
          </div>
          <span className="text-xl font-bold ">Xe tải 1500kg</span>
        </div>

        {/* Row 2 */}
        <div className="flex justify-between items-center p-2 rounded-lg">
          <div className="flex items-center space-x-3">
            <Gift className="h-6 w-6 text-pink-400" />
            <h3 className="text-base font-medium">Loại nhà được đặt nhiều</h3>
          </div>
          <span className="text-xl font-bold">Nhà Riêng/Biệt Thự</span>
        </div>

        {/* Row 3 */}
        <div className="flex justify-between items-center p-2 rounded-lg">
          <div className="flex items-center space-x-3">
            <Clock className="h-6 w-6 text-orange-400" />
            <h3 className="text-base font-medium ">Thời gian được đặt nhiều</h3>
          </div>
          <span className="text-xl font-bold ">{data[0].mostBookedTime}</span>
        </div>

        {/* Row 4 */}
        <div className="flex justify-between items-center  p-2 rounded-lg">
          <div className="flex items-center space-x-3">
            <Calendar className="h-6 w-6 text-yellow-400" />
            <h3 className="text-base font-medium ">
              Ngày được đặt nhiều nhất trong tuần
            </h3>
          </div>
          <span className="text-xl font-bold ">{mostBookedDayOfWeek}</span>
        </div>

        {/* Row 5 */}
        <div className="flex justify-between items-center  p-2 rounded-lg">
          <div className="flex items-center space-x-3">
            <Calendar className="h-6 w-6 text-purple-400" />
            <h3 className="text-base font-medium y-300">
              Ngày có nhiều đơn nhất
            </h3>
          </div>
          <span className="text-xl font-bold ">2024-12-08</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatisticBooking;
