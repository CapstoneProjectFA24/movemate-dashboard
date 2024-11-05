"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRole, IUser } from "@/features/users/type.ts/user-type";
import { Suspense, useState } from "react";
import { UsersTable } from "./users-table";
import { ApiListResponse } from "@/lib/api/api-handler/generic";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";

interface UsersClientWrapperProps {
  initialData: {
    [key in UserRole]: ApiListResponse<IUser>;
  };
}

const TABS = [
  { value: UserRole.Reviewer, label: "Nhân viên đánh giá" },
  { value: UserRole.Driver, label: "Nhân viên lái xe" },
  { value: UserRole.Porter, label: "Nhân viên bốc vác" },
] as const;

export function UsersClientWrapper({ initialData }: UsersClientWrapperProps) {
  const [activeTab, setActiveTab] = useState<UserRole>(UserRole.Reviewer);

  return (
    <div className="2xl:flex-1 w-full">
      <Tabs
        onValueChange={(value) => setActiveTab(value as UserRole)}
        defaultValue={activeTab}
        className="w-full"
      >
        <TabsList>
          {TABS.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {TABS.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
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
              <UsersTable data={initialData[tab.value]} />
            </Suspense>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
