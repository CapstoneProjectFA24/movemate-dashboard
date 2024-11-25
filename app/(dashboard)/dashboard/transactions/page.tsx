import React from "react";
import { SearchParams } from "@/types/table";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Shell } from "@/components/shared/custom-ui/shell";
import { MoneyChart } from "@/features/transactions/components/chart/money-chart";
import { getTransactions } from "@/features/transactions/action/transactions";
import { TransactionsTable } from "@/features/transactions/components/transaciton-table/transaction-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

export interface IndexPageProps {
  searchParams: SearchParams;
}

const TransactionPage = ({ searchParams }: IndexPageProps) => {
  const transactionsPromise = getTransactions(searchParams);

  return (
    <div className="space-y-6 p-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Tổng giao dịch"
          value="2,345"
          icon={<BarChart3 className="h-4 w-4 text-muted-foreground" />}
          description="So với tháng trước"
          trend={{ value: "12%", isPositive: true }}
        />
        <StatCard
          title="Doanh thu"
          value="$45,231"
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          description="So với tháng trước"
          trend={{ value: "8%", isPositive: true }}
        />
        <StatCard
          title="Chi phí"
          value="$12,234"
          icon={<LineChart className="h-4 w-4 text-muted-foreground" />}
          description="So với tháng trước"
          trend={{ value: "4%", isPositive: false }}
        />
        <StatCard
          title="Lợi nhuận"
          value="$32,997"
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          description="So với tháng trước"
          trend={{ value: "10%", isPositive: true }}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-3/4">
          <Shell className="h-full">
            <React.Suspense
              fallback={
                <DataTableSkeleton
                  columnCount={5}
                  searchableColumnCount={1}
                  filterableColumnCount={2}
                  cellWidths={["10rem", "40rem", "12rem", "12rem", "8rem"]}
                  shrinkZero
                />
              }
            >
              <TransactionsTable transactionsPromise={transactionsPromise} />
            </React.Suspense>
          </Shell>
        </div>

        <div className="lg:w-1/4">
          <ScrollArea className="h-[calc(100vh-10rem)]">
            <div className="space-y-6 pr-4">
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                  <TabsTrigger value="analytics">Phân tích</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                  <MoneyChart />
                  <MoneyChart />
                </TabsContent>
                <TabsContent value="analytics" className="space-y-4">
                  <MoneyChart />
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
