"use client";

import { getStatisTicTransationNoSumary } from "@/features/statistic/action/statistic";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BarChart3,
  DollarSign,
  LineChart,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
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
  trend,
}: StatCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <div className="flex items-center space-x-2">
        {trend && (
          <span
            className={`flex items-center text-xs ${
              trend.isPositive ? "text-green-500" : "text-red-500"
            }`}
          >
            {trend.isPositive ? (
              <ArrowUpIcon className="h-4 w-4" />
            ) : (
              <ArrowDownIcon className="h-4 w-4" />
            )}
            {trend.value}
          </span>
        )}
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
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
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* <StatCard
        title="Tổng giao dịch"
        value={data[0].totalIncome.toString()}
        icon={<BarChart3 className="h-4 w-4 text-muted-foreground" />}
        description="So với tháng trước"
        trend={{ value: "12%", isPositive: true }}
      /> */}
      <StatCard
        title="Doanh thu"
        value={data[0].totalIncome.toString()}
        icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        description="So với tháng trước"
        trend={{ value: "8%", isPositive: true }}
      />
      <StatCard
        title="Chi phí"
        value={data[0].totalIncome.toString()}
        icon={<LineChart className="h-4 w-4 text-muted-foreground" />}
        description="So với tháng trước"
        trend={{ value: "4%", isPositive: false }}
      />
      <StatCard
        title="Lợi nhuận"
        value={data[0].totalIncome.toString()}
        icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        description="So với tháng trước"
        trend={{ value: "10%", isPositive: true }}
      />
    </div>
  );
};

export default StatsTransactionOverview;
