import React, { Suspense } from "react";
import { SearchParams } from "@/types/table";
import { getTruckCategorysSearchParams } from "@/features/services/action/truck-category";
import { getHousesSearchParams } from "@/features/services/action/houses";
import { ServicesSettingsClientWrapper } from "@/features/services-settings/components/services-setting-client-wrapper";
import { Shell } from "@/components/shared/custom-ui/shell";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
export interface IndexPageProps {
  searchParams: SearchParams;
}
const ServicesSettingPage = async ({ searchParams }: IndexPageProps) => {
  const [truckData, housesData] = await Promise.all([
    getTruckCategorysSearchParams(searchParams),
    getHousesSearchParams(searchParams),
  ]);
  return (
    <Shell>
      <Suspense
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
        <ServicesSettingsClientWrapper
          truckData={truckData}
          housesData={housesData}
        />
      </Suspense>
    </Shell>
  );
};

export default ServicesSettingPage;
