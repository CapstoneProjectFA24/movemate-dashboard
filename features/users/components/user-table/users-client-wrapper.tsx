"use client";

import { useState, useEffect, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRole, IUser } from "@/features/users/types/user-type";
import { Suspense } from "react";
import { UsersTable } from "./users-table";
import { ApiListResponse } from "@/lib/api/api-handler/generic";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Users, Truck, Briefcase, LucideIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { IStatisticUser } from "@/features/statistic/types/statistic-user-type";

interface UsersClientWrapperProps {
  initialData: {
    [key in UserRole]: ApiListResponse<IUser>;
  };
  statisticUser: IStatisticUser[];
}

interface TabConfig {
  value: UserRole;
  label: string;
  icon: LucideIcon;
  color: string;
  description: string;
}

const TABS: readonly TabConfig[] = [
  {
    value: UserRole.Reviewer,
    label: "Nhân viên đánh giá",
    icon: Users,
    color: "text-blue-500",
    description: "Quản lý danh sách nhân viên đánh giá",
  },
  {
    value: UserRole.Driver,
    label: "Nhân viên lái xe",
    icon: Truck,
    color: "text-green-500",
    description: "Quản lý danh sách nhân viên lái xe",
  },
  {
    value: UserRole.Porter,
    label: "Nhân viên bốc vác",
    icon: Briefcase,
    color: "text-orange-500",
    description: "Quản lý danh sách nhân viên bốc vác",
  },
] as const;

export function UsersClientWrapper({
  initialData,
  statisticUser,
}: UsersClientWrapperProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const scrollPositionRef = useRef<number>(0);
  const isTabChangeRef = useRef(false);

  const initialTab = (searchParams.get("tab") as UserRole) || UserRole.Reviewer;
  const [activeTab, setActiveTab] = useState<UserRole>(initialTab);
  const currentTab = TABS.find((tab) => tab.value === activeTab);

  useEffect(() => {
    const handleScroll = () => {
      if (!isTabChangeRef.current) {
        scrollPositionRef.current = window.scrollY;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTabChange = (value: string) => {
    const newTab = value as UserRole;
    isTabChangeRef.current = true;
    scrollPositionRef.current = window.scrollY;
    setActiveTab(newTab);

    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", newTab);
    router.push(`?${params.toString()}`, { scroll: false });

    requestAnimationFrame(() => {
      window.scrollTo(0, scrollPositionRef.current);
      isTabChangeRef.current = false;
    });
  };

  const getCurrentStats = (role: UserRole) => {
    const data = initialData[role];
    const roleStats = statisticUser[0].usersByRole.find(
      (s) => s.roleName.toUpperCase() === role
    );
    return [
      {
        label: "Tổng số nhân viên",
        value: roleStats?.userCount || 0,
      },
      {
        label: "Đang hoạt động",
        value:
          statisticUser[0].usersByRole.find(
            (s) => s.roleName.toUpperCase() === role
          )?.totalActiveUsers || 0,
      },
      {
        label: "Không hoạt động",
        value:
          statisticUser[0].usersByRole.find(
            (s) => s.roleName.toUpperCase() === role
          )?.totalNoActiveUsers || 0,
      },
    ];
  };

  const stats = getCurrentStats(activeTab);

  return (
    <div className="container mx-auto  min-h-screen">
      <div className="flex gap-6 flex-col ">
        <div className=" space-y-8">
          <Card className="">
            <CardHeader className="pb-4 space-y-2">
              <CardTitle className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Quản lý Nhân viên
              </CardTitle>
              <p className="text-lg md:text-xl">{currentTab?.description}</p>
            </CardHeader>
          </Card>
          <Card>
            <CardContent className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-4 border-b last:border-b-0"
                >
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {stat.label}
                    </p>
                    <div className="text-3xl md:text-4xl font-extrabold">
                      {stat.value}
                    </div>
                  </div>
                  <div className="bg-primary-100 dark:bg-primary-900/20 rounded-xl p-2">
                    {currentTab && (
                      <currentTab.icon
                        className={`h-6 w-6 ${currentTab.color}`}
                      />
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="">
          <Card className="h-full">
            <CardContent className="p-0">
              <Tabs
                value={activeTab}
                onValueChange={handleTabChange}
                className="w-full"
              >
                <div className="border-b px-4 sticky top-0 bg-background z-10 rounded-md">
                  <TabsList className="bg-transparent">
                    {TABS.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <TabsTrigger
                          key={tab.value}
                          value={tab.value}
                          className="data-[state=active]:bg-background relative "
                        >
                          <Icon className={`mr-2 h-4 w-4 ${tab.color}`} />
                          {tab.label}
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>
                </div>

                <div className="relative">
                  {TABS.map((tab) => (
                    <TabsContent
                      key={tab.value}
                      value={tab.value}
                      className="m-0 min-h-[500px]"
                    >
                      <div className="p-4">
                        <Suspense
                          fallback={
                            <DataTableSkeleton
                              columnCount={5}
                              searchableColumnCount={1}
                              filterableColumnCount={2}
                              cellWidths={[
                                "10rem",
                                "40rem",
                                "12rem",
                                "12rem",
                                "8rem",
                              ]}
                              shrinkZero
                            />
                          }
                        >
                          <UsersTable data={initialData[tab.value]} />
                        </Suspense>
                      </div>
                    </TabsContent>
                  ))}
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
