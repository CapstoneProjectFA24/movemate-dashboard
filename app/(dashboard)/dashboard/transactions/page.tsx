import React from "react";
import { SearchParams } from "@/types/table";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Shell } from "@/components/shared/custom-ui/shell";
import { getTransactions } from "@/features/transactions/action/transactions";
import { TransactionsTable } from "@/features/transactions/components/transaciton-table/transaction-table";
import { Skeleton } from "@/components/ui/skeleton";
import { FlexibleDatePicker } from "@/components/data-table/custom-table/date-range-picker";
import { getStatisTicTransationNoSumary } from "@/features/statistic/action/statistic";
import StatsTransactionOverview from "./_components/stats-transaction-overview";
import { getWallet } from "@/features/refund/actions/refund";

export interface IndexPageProps {
  searchParams: SearchParams;
}

const TransactionPage = ({ searchParams }: IndexPageProps) => {
  const transactionsPromise = getTransactions(searchParams);
  // const walletPromise = getWallet();
  const transactionStatistic = getStatisTicTransationNoSumary();
  const totalMoney = "$1,000.00";

  return (
    <div className="space-y-6 p-6">
      {/* Stats Overview */}
      <StatsTransactionOverview transactionStatistic={transactionStatistic} />

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-3/4 w-full">
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
    </div>
  );
};

export default TransactionPage;
