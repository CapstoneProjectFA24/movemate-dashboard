import React from "react";
import { SearchParams } from "@/types/table";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Shell } from "@/components/shared/custom-ui/shell";
import { FeeTable } from "@/features/fee/components/fee-table/fee-table";
import { getFees } from "@/features/fee/actions/fees";

export interface IndexPageProps {
  searchParams: SearchParams;
}

const FeePage = ({ searchParams }: IndexPageProps) => {
  const feePromise = getFees(searchParams);
  return (
    <div className="min-w-full">
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
          <FeeTable feePromise={feePromise} />
        </React.Suspense>
      </Shell>
    </div>
  );
};

export default FeePage;