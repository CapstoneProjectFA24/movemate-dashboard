import React from "react";
import { SearchParams } from "@/types/table";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Shell } from "@/components/shared/custom-ui/shell";
import { getRefunds, getWindraw } from "@/features/refund/actions/refund";
import { RefundTable } from "@/features/refund/components/refund-table/refund-table";
import RefundClientWrapper from "@/features/refund/components/refund-table/refund-client-wrapper";
export interface IndexPageProps {
  searchParams: SearchParams;
}
const RefundPage = async ({ searchParams }: IndexPageProps) => {
  const [refundData, widthDrawData] = await Promise.all([
    getRefunds(searchParams),
    getWindraw(searchParams),
  ]);
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
          {/* <RefundTable refundPromise={refundPromise} /> */}

          <RefundClientWrapper
            refundData={refundData}
            widthDrawData={widthDrawData}
          />
        </React.Suspense>
      </Shell>
    </div>
  );
};

export default RefundPage;
