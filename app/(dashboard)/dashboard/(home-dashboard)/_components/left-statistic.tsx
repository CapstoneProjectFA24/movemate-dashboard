import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react";
import { getStatisTicTransation } from "@/features/statistic/action/statistic";
import { formatter } from "@/lib/utils";
export interface SearchParamFilterDashboard {
  shard?: string;
  type?: string;
  isSummary?: boolean;
}



const LeftStatistic = async ({
  searchParams,
}: {
  searchParams: SearchParamFilterDashboard;
}) => {
  const [statisticTransactionData] = await Promise.all([
    getStatisTicTransation(searchParams),
  ]);

  const totalIncome = statisticTransactionData?.data[0].totalIncome || 0;
  const totalCompensation = statisticTransactionData?.data[0].totalCompensation || 0;
  const profit = totalIncome - totalCompensation;
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2 mb-6">
        <Activity className="h-6 w-6 text-orange-600" />
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Tổng quan
        </h1>
      </div>

      {/* Metric Cards */}
      <Card className="hover:shadow-lg transition-shadow duration-200 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Tổng Thu Nhập</CardTitle>
          <DollarSign className="h-5 w-5 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
          {formatter.format(totalIncome)}
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow duration-200 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-red-800">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Tổng Bồi Thường</CardTitle>
          <TrendingDown className="h-5 w-5 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
          {formatter.format(totalCompensation)}
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow duration-200 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Lợi Nhuận</CardTitle>
          <DollarSign className="h-5 w-5 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          {formatter.format(profit)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeftStatistic;
