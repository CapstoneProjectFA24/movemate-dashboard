import ServiceShift from "@/features/users/components/manage-shift/manage-shift";
import React, { Suspense } from "react";
import { Shell } from "@/components/shared/custom-ui/shell";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";

import { getShift } from "@/features/users/action/shift";
import { getGroup } from "@/features/users/action/group";
import { ManageShiftGroupClientWrapper } from "@/features/users/components/manage-shift/manage-shift-group-client-wrapper";

const ManageShift = async () => {
  const [shiftData, groupData] = await Promise.all([getShift(), getGroup()]);

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
        <ManageShiftGroupClientWrapper
          shiftData={shiftData}
          groupData={groupData}
        />
      </Suspense>
    </Shell>
  );
};

export default ManageShift;
