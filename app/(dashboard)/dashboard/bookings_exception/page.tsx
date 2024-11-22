import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Shell } from "@/components/shared/custom-ui/shell";
import { getAssignments } from "@/features/exception/action/get-assignments";
import { ExceptionTable } from "@/features/exception/components/exception-table";
import { SearchParams } from "@/types/table";
import React from "react";
export interface IndexPageProps {
  searchParams: SearchParams;
}
const BookingExeception = ({ searchParams }: IndexPageProps) => {
  const assignmentPromise = getAssignments(searchParams);

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
          <ExceptionTable assignmentPromise={assignmentPromise} />
        </React.Suspense>
      </Shell>
    </div>
  );
};

export default BookingExeception;