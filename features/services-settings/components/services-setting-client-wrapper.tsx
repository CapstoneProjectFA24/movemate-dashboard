"use client";

import { IHouse } from "@/features/services/types/house-type";
import { ITruckCategory } from "@/features/services/types/services-type";
import { ApiListResponse } from "@/lib/api/api-handler/generic";
import { Users, Truck, House, LucideIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { Suspense, useEffect, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { TruckCategoryTable } from "./truck-category-table/truck-category-table";
import HouseSettings from "./house-setting/house-setting";

interface ServicesSettingsClientWrapper {
  truckData: ApiListResponse<ITruckCategory>;
  housesData: ApiListResponse<IHouse>;
}

interface TabConfig {
  value: string;
  label: string;
  icon: LucideIcon;
  color: string;
  description: string;
}

export enum TABS_VALUE {
  TRUCK = "TRUCK",
  HOUSE = "HOUSE",
}

const TABS: readonly TabConfig[] = [
  {
    value: TABS_VALUE.TRUCK,
    label: "Quản lý loại xe",
    icon: Truck,
    color: "text-orange-500",
    description: "Quản lý danh sách loại xe",
  },
  {
    value: TABS_VALUE.HOUSE,
    label: "Quản lý loại nhà",
    icon: House,
    color: "text-green-500",
    description: "Quản lý danh sách loại nhà",
  },
] as const;

export function ServicesSettingsClientWrapper({
  truckData,
  housesData,
}: ServicesSettingsClientWrapper) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const scrollPositionRef = useRef<number>(0);
  const isTabChangeRef = useRef(false);

  const initialTab =
    (searchParams.get("tab") as TABS_VALUE) || TABS_VALUE.TRUCK;

  const [activeTab, setActiveTab] = useState<TABS_VALUE>(initialTab);
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
    const newTab = value as TABS_VALUE;
    isTabChangeRef.current = true;
    scrollPositionRef.current = window.scrollY;
    setActiveTab(newTab);

    // const params = new URLSearchParams(searchParams.toString());
    // params.set("tab", newTab);
    // router.push(`?${params.toString()}`, { scroll: false });

    requestAnimationFrame(() => {
      window.scrollTo(0, scrollPositionRef.current);
      isTabChangeRef.current = false;
    });
  };

  return (
    <div>
      <Card className="h-full">
        <CardContent>
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
              <TabsContent
                value={TABS_VALUE.TRUCK}
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
                    <TruckCategoryTable data={truckData} />
                  </Suspense>
                </div>
              </TabsContent>
              <TabsContent
                value={TABS_VALUE.HOUSE}
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
                    <HouseSettings data={housesData} />
                  </Suspense>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
