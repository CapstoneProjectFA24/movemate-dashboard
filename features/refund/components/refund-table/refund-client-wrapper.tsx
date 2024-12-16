"use client";
import { ApiListResponse } from "@/lib/api/api-handler/generic";
import { IHouse } from "@/features/services/types/house-type";
import { ITruckCategory } from "@/features/services/types/services-type";
import { Users, Truck, House, LucideIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { Suspense, useEffect, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";

import React from "react";
import { IRefund } from "../../types/refund-type";
import { RefundTable } from "./refund-table";
import { IWindraw } from "../../types/windraw-type";
import { WidthdrawTable } from "../windraw-table/widthdraw-table";

interface RefundClientWrapperProps {
  refundData: ApiListResponse<IRefund>;
  widthDrawData: ApiListResponse<IWindraw>;
}

interface TabConfig {
  value: string;
  label: string;
  icon: LucideIcon;
  color: string;
  description: string;
}

export enum TABS_VALUE {
  REFUND = "REFUND",
  WIDTHDRAW = "WIDTHDRAW",
}

const TABS: readonly TabConfig[] = [
  {
    value: TABS_VALUE.REFUND,
    label: "Quản lý hoàn tiền - bồi thường",
    icon: Truck,
    color: "text-orange-500",
    description: "Quản lý đơn cần hoàn tiền",
  },
  {
    value: TABS_VALUE.WIDTHDRAW,
    label: "Quản lý rút tiền",
    icon: House,
    color: "text-green-500",
    description: "Quản lý đơn khách rút tiền",
  },
] as const;

const RefundClientWrapper = ({
  refundData,
  widthDrawData,
}: RefundClientWrapperProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const scrollPositionRef = useRef<number>(0);
  const isTabChangeRef = useRef(false);

  const initialTab =
    (searchParams.get("tab") as TABS_VALUE) || TABS_VALUE.REFUND;

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
                value={TABS_VALUE.REFUND}
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
                    <RefundTable refundData={refundData} />
                  </Suspense>
                </div>
              </TabsContent>
              <TabsContent
                value={TABS_VALUE.WIDTHDRAW}
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
                    <WidthdrawTable widthDrawData={widthDrawData} />
                  </Suspense>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default RefundClientWrapper;
