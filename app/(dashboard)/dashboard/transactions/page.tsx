import React from "react";
import { SearchParams } from "@/types/table";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Shell } from "@/components/shared/custom-ui/shell";
import { MoneyChart } from "@/features/transactions/components/chart/money-chart";
import { getTransactions } from "@/features/transactions/action/transactions";
import { TransactionsTable } from "@/features/transactions/components/transaciton-table/transaction-table";
export interface IndexPageProps {
  searchParams: SearchParams;
}
const TransactionPage = ({ searchParams }: IndexPageProps) => {
  const transactionsPromise = getTransactions(searchParams);
  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      <div className="lg:w-3/4 space-y-6">
        {/* Transaction Table */}
        <Shell>
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

      {/* Right Column - Spending Limits & Charts (1/3 width) */}
      <div className="lg:w-1/4 space-y-6 mt-12">
        <MoneyChart />
        <MoneyChart />
        <MoneyChart />

        <div>content2...</div>
      </div>
    </div>
  );
};

export default TransactionPage;
