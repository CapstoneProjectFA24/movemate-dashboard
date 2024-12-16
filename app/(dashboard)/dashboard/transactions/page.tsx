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

// Credit Card Component
const CreditCard = ({
  title,
  value,
  cardNumber,
  cardHolder,
  expiryDate,
}: {
  title: string;
  value: string;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
}) => (
  <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-xl shadow-lg w-full max-w-md mx-auto lg:mx-0">
    {/* Background Pattern */}
    <div
      className="absolute inset-0 opacity-30 bg-no-repeat bg-cover bg-center rounded-xl"
      style={{ backgroundImage: "url('/path-to-design-pattern.svg')" }}
    ></div>

    {/* Chip Icon */}
    <div className="absolute top-4 left-4 w-12 h-8 bg-gradient-to-r from-gray-200 to-gray-400 rounded-sm"></div>

    {/* Card Content */}
    <div className="relative z-10 flex flex-col space-y-6">
      {/* Title */}
      <h2 className="text-lg font-bold tracking-wide">{title}</h2>

      {/* Card Number */}
      <div className="text-lg font-mono tracking-widest">{cardNumber}</div>

      {/* Card Footer */}
      <div className="flex justify-between text-sm flex-wrap">
        <div className="mb-2">
          <p className="text-xs uppercase">Card Holder</p>
          <p className="font-bold">{cardHolder}</p>
        </div>
        <div>
          <p className="text-xs uppercase">Expiry</p>
          <p className="font-bold">{expiryDate}</p>
        </div>
      </div>

      {/* Value */}
      <div className="text-4xl font-extrabold mt-4">{value}</div>
    </div>
  </div>
);

export interface IndexPageProps {
  searchParams: SearchParams;
}

const TransactionPage = ({ searchParams }: IndexPageProps) => {
  const transactionsPromise = getTransactions(searchParams);
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
