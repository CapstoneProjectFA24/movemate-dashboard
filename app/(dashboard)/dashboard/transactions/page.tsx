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
import { Skeleton } from "@/components/ui/skeleton";
import { FlexibleDatePicker } from "@/components/data-table/custom-table/date-range-picker";
import { getStatisTicTransationNoSumary } from "@/features/statistic/action/statistic";
import StatsTransactionOverview from "./_components/stats-transaction-overview";

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
  const transactionStatistic = getStatisTicTransationNoSumary();
  return (
    <div className="space-y-6 p-6">
      {/* Stats Overview */}

      <StatsTransactionOverview transactionStatistic={transactionStatistic} />

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-full">
          <Shell className="h-full gap-y-2">
            <React.Suspense fallback={<Skeleton className="h-7 w-52" />}>
              <FlexibleDatePicker
                mode="single"
                defaultDate={new Date()}
                triggerSize="sm"
                triggerClassName="ml-auto w-56 sm:w-60"
                align="end"
                shallow={false}
              />
              {/* // Date range picker */}
              {/* <FlexibleDatePicker mode="range" defaultDateRange={{ from: new Date(), to: new Date() }} /> */}
            </React.Suspense>
            <React.Suspense
              fallback={
                <DataTableSkeleton
                  columnCount={5}
                  searchableColumnCount={1}
                  filterableColumnCount={2}
                  cellWidths={["15%", "40%", "15%", "15%", "15%"]}
                  shrinkZero
                />
              }
            >
              <TransactionsTable transactionsPromise={transactionsPromise} />
            </React.Suspense>
          </Shell>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 p-8 bg-gray-100 dark:bg-gray-900">
        {/* Left Section */}
        <div className="lg:w-3/12 space-y-8 w-full">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            {/* <WalletSys searchParams={searchParams} /> */}
          </div>
        </div>
        </div>
    </div>
  );
};

export default TransactionPage;
