import React from "react";
import StatisticFilterDate from "./_components/statistic-filter-date";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Truck,
  Gift,
  ClipboardList,
  BarChart3,
  Activity,
  Clock,
  Calendar,
} from "lucide-react";

import LeftStatistic from "./_components/left-statistic";
import {
  getStatisTicBooking,
  getStatisTicPromotion,
  getStatisTicTransationCustom,
  getStatisTicTruckCategory,
  getStatisTicGroup,
} from "@/features/statistic/action/statistic";
import StatisticTransactionLineChart from "./_components/statistic-transaction-line-chart";
import { StatisticbookingPineChart } from "./_components/statistic-booking-pine-chart";
import StatisticBooking from "./_components/statistic-booking";
import PromotionStatistic from "./_components/promotion-statistic";
import TruckStatistic from "./_components/truck-statistic";
import StatisticGroup from "./_components/group-statistic";

export interface SearchParamFilterDashboard {
  shard?: string;
  type?: string;
  isSummary?: boolean;
}

const Dashboard = async ({
  searchParams,
}: {
  searchParams: SearchParamFilterDashboard;
}) => {
  const [
    statisticTransactionLineData,
    statisticBookingData,
    promotionStatisticData,
    truckStatisticData,
    groupStatisticData,
  ] = await Promise.all([
    getStatisTicTransationCustom(),
    getStatisTicBooking(searchParams),
    getStatisTicPromotion(),
    getStatisTicTruckCategory(),
    getStatisTicGroup()
  ]);
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex justify-between items-center pb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <BarChart3 className="h-7 w-7 text-orange-600" />
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                Dashboard
              </h1>
            </div>
            <div>
              <StatisticFilterDate searchParams={searchParams} />
            </div>
          </div>
      <div className="flex flex-col lg:flex-row gap-8 p-8 bg-gray-100 dark:bg-gray-900">
        {/* Left Section */}
        <div className="lg:w-3/12 space-y-8">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <LeftStatistic searchParams={searchParams} />
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:w-9/12 space-y-8">
          {/* Main Chart */}
          <Card className="hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800 lg:w-full">
            <CardHeader className="flex flex-row items-center justify-between border-b border-gray-200 dark:border-gray-700 p-6">
              <CardTitle className="flex items-center space-x-3 text-lg font-semibold text-gray-800 dark:text-gray-100">
                <Activity className="h-6 w-6 text-purple-500" />
                <span>Thống Kê Thu Nhập Theo Thời Gian</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 h-[450px]">
              <StatisticTransactionLineChart
                data={statisticTransactionLineData.data}             
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-2 flex flex-col space-y-4">
        {/* Middle Row - Two Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-green-500" />
                <span>Thống kê đặt chỗ</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[350px]">
              <StatisticbookingPineChart data={statisticBookingData.data} />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-2">
            <StatisticBooking data={statisticBookingData.data} />
          </div>
        </div>

        {/* Bottom Row - Three Small Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Gift className="h-5 w-5 text-pink-500" />
                <span>Thống kê các khuyến mãi</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              {/* Mini Chart Component */}
              <PromotionStatistic data={promotionStatisticData.data} />
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-green-500" />
                <span>Thống kê các loại xe</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[350px]">
              {/* Mini Chart Component */}
              <TruckStatistic data={truckStatisticData.data} />
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <ClipboardList className="h-5 w-5 text-yellow-500" />
                <span>Thống kê các tổ</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-48">
              {/* Mini Chart Component */}
              <StatisticGroup data={groupStatisticData.data} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
