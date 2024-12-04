"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shared/custom-ui/tab-custom";
import { Card, CardContent } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { ApiListResponse } from "@/lib/api/api-handler/generic";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { House, LucideIcon, Truck } from "lucide-react";
import { IShift } from "../../types/shift-type";
import { IGroup } from "../../types/group-type";
import MangageShift from "./manage-shift";
import ManageGroup from "./manage-group";

interface ManageShiftGroupClientWrapperProps {
  shiftData: ApiListResponse<IShift>;
  groupData: ApiListResponse<IGroup>;
}

interface TabConfig {
  value: string;
  label: string;
  icon: LucideIcon;
  color: string;
  description: string;
}

export enum TABS_VALUE {
  SHIFT = "SHIFT",
  GROUP = "GROUP",
}

const TABS: readonly TabConfig[] = [
  {
    value: TABS_VALUE.SHIFT,
    label: "Quản lý ca làm việc",
    icon: Truck,
    color: "text-orange-500",
    description: "Quản lý ca làm việc và các ca liên quan.",
  },
  {
    value: TABS_VALUE.GROUP,
    label: "Quản lý tổ",
    icon: House,
    color: "text-green-500",
    description: "Quản lý danh sách tổ và thông tin liên quan.",
  },
] as const;

export function ManageShiftGroupClientWrapper({
  shiftData,
  groupData,
}: ManageShiftGroupClientWrapperProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const scrollPositionRef = useRef<number>(0);
  const isTabChangeRef = useRef(false);
  const initialTab =
    (searchParams.get("tab") as TABS_VALUE) || TABS_VALUE.SHIFT;

  const [activeTab, setActiveTab] = useState<TABS_VALUE>(initialTab);

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

    requestAnimationFrame(() => {
      window.scrollTo(0, scrollPositionRef.current);
      isTabChangeRef.current = false;
    });
  };

  return (
    <div className="flex">
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-66 min-h-screen mt-6 "
      >
        <Card>
          <CardContent>
            <TabsList className="flex flex-col items-stretch space-y-2 p-4 rounded-md mt-6 ">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className={`flex items-start justify-start px-4 py-3 rounded-md text-left hover:bg-orange-400 focus:bg-orange-400 ${
                      activeTab === tab.value
                        ? "bg-orange-400 font-medium"
                        : "font-normal"
                    }`}
                  >
                    <Icon
                      className={`mr-3 h-5 w-5 ${
                        activeTab === tab.value ? tab.color : "text-gray-500"
                      }`}
                    />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </CardContent>
        </Card>
      </Tabs>

      {/* Content */}
      <div className="flex-1 p-6">
        <Card className="h-full">
          <CardContent>
            <Tabs value={activeTab} onValueChange={handleTabChange}>
              <TabsContent
                value={TABS_VALUE.SHIFT}
                className="m-0 min-h-[320px]"
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
                    <MangageShift shiftData={shiftData} />
                  </Suspense>
                </div>
              </TabsContent>
              <TabsContent
                value={TABS_VALUE.GROUP}
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
                    <ManageGroup groupData={groupData} />
                  </Suspense>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
