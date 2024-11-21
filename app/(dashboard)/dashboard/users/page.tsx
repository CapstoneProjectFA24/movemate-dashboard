// app/users/page.tsx
import { getUsersByRole } from "@/features/users/action/users";
import { SearchParams } from "@/types/table";
import { Shell } from "@/components/shared/custom-ui/shell";
import { UserRole } from "@/features/users/types/user-type";
import { UsersClientWrapper } from "@/features/users/components/user-table/users-client-wrapper";
import { Suspense } from "react";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";

export interface IndexPageProps {
  searchParams: SearchParams;
}

const UserPage = async ({ searchParams }: IndexPageProps) => {
  const [reviewerData, driverData, porterData] = await Promise.all([
    getUsersByRole(searchParams, UserRole.Reviewer),
    getUsersByRole(searchParams, UserRole.Driver),
    getUsersByRole(searchParams, UserRole.Porter),
  ]);

  const userData = {
    [UserRole.Reviewer]: reviewerData,
    [UserRole.Driver]: driverData,
    [UserRole.Porter]: porterData,
  };

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
        <UsersClientWrapper initialData={userData} />
      </Suspense>
    </Shell>
  );
};

export default UserPage;
