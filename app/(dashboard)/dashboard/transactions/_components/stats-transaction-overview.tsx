"use client";

import { getStatisTicTransationNoSumary } from "@/features/statistic/action/statistic";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Các biểu tượng
import {
  BarChart3,
} from "lucide-react";
import { formatter } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  icon?: React.ReactNode; // Cập nhật để cho phép icon là tùy chọn
  description?: string; // Cập nhật để cho phép description là tùy chọn
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

const StatCard = ({
  title,
  value,
  icon,
  description,
}: StatCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {description && <div className="text-sm text-gray-500">{description}</div>}
    </CardContent>
  </Card>
);

interface StatsTransactionOverviewProps {
  transactionStatistic: ReturnType<typeof getStatisTicTransationNoSumary>;
}

const StatsTransactionOverview = ({
  transactionStatistic,
}: StatsTransactionOverviewProps) => {
  const { data } = React.use(transactionStatistic);

  // Tính toán lợi nhuận
  const totalIncome = data[0].totalIncome;
  const totalCompensation = data[0].totalCompensation;
  const profit = totalIncome - totalCompensation;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <StatCard
        title="Doanh thu"
        value={formatter.format(totalIncome)}
       
      />
      <StatCard
        title="Chi phí"
        value={formatter.format(totalCompensation)}
      />
      <StatCard
        title="Lợi nhuận"
        value={formatter.format(profit)} 
      />
    </div>
  );
};

export default StatsTransactionOverview;