"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"
import { Truck, Gift, BarChart3, Clock, Calendar } from "lucide-react";
import { IStatisticBooking } from "@/features/statistic/types/statistic-booking-type";

interface StatisticbookingPineChartProps {
  data: IStatisticBooking[];
}
const StatisticBooking = ({ data }: StatisticbookingPineChartProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-green-500" />
          <span>Thống kê đặt chỗ</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-48">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Truck className="h-5 w-5 text-blue-500" />
              <h3 className="text-lg font-medium">Loại xe được đặt nhiều</h3>
            </div>
            <span className="text-2xl font-bold">
              {data[0].mostBookedTruck}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Gift className="h-5 w-5 text-pink-500" />
              <h3 className="text-lg font-medium">Loại nhà được đặt nhiều</h3>
            </div>
            <span className="text-2xl font-bold">
              {data[0].mostBookedHouseType}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-500" />
              <h3 className="text-lg font-medium">Thời gian được đặt nhiều</h3>
            </div>
            <span className="text-2xl font-bold">{data[0].mostBookedTime}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-yellow-500" />
              <h3 className="text-lg font-medium">
                Ngày được đặt nhiều nhất trong tuần
              </h3>
            </div>
            <span className="text-2xl font-bold">Sunday</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-purple-500" />
              <h3 className="text-lg font-medium">Ngày có nhiều đơn nhất</h3>
            </div>
            <span className="text-2xl font-bold">2024-12-08</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatisticBooking;
