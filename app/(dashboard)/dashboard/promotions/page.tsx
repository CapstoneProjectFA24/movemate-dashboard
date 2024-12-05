import React from "react";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Shell } from "@/components/shared/custom-ui/shell";
import { ServicesTable } from "@/features/services/components/services-table/service-table";
import { SearchParams } from "@/types/table";
import { getPromotionsSearchParams } from "@/features/promotions/actions/promotions";
import { PromotionsTable } from "@/features/promotions/components/promotions-table/promotions-table";
export interface IndexPageProps {
  searchParams: SearchParams;
}
const PromotionsPage = ({ searchParams }: IndexPageProps) => {
  const promotionsPromise = getPromotionsSearchParams(searchParams);
  return (
    <div className=" min-w-full">
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
          <PromotionsTable promotionsPromise={promotionsPromise} />
        </React.Suspense>
      </Shell>
    </div>
  );
};

export default PromotionsPage;
