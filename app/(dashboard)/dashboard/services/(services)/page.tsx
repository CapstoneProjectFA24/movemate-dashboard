import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Shell } from "@/components/shared/custom-ui/shell";
import { SearchParams } from "@/types/table";
import React from "react";
import { getServices } from "@/lib/actions";
import { ServicesTable } from "./_components/service-table";

export interface IndexPageProps {
  searchParams: SearchParams;
}
const ServicePage = ({ searchParams }: IndexPageProps) => {
  const servicesPromise = getServices(searchParams);

  return (
    <div>
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
          <ServicesTable servicesPromise={servicesPromise} />
        </React.Suspense>
      </Shell>
    </div>
  );
};

export default ServicePage;
