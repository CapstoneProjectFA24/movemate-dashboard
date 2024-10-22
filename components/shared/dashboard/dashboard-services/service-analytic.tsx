import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import React from "react";
import AnalyticCard from "./service-analytic-card";
import DottedSeparator from "@/components/shared/custom-ui/dotted-separator";

const ServiceAnalytic = () => {
  const count = 1;
  const countVariant = 1;
  return (
    <ScrollArea className="border rounded-lg w-full whitespace-nowrap shrink-0">
      <div className="w-full flex flex-row">
        <div className="flex items-center flex-1">
          <AnalyticCard
            title="Tổng dịch vụ"
            value={count}
            variant={countVariant > 0 ? "up" : "down"}
            increaseValue={countVariant}
          />
          <DottedSeparator direction="vertical" />
        </div>
        <div className="flex items-center flex-1">
          <AnalyticCard
            title="Tổng dịch vụ"
            value={count}
            variant={countVariant > 0 ? "up" : "down"}
            increaseValue={countVariant}
          />
          <DottedSeparator direction="vertical" />
        </div>
        <div className="flex items-center flex-1">
          <AnalyticCard
            title="Tổng dịch vụ"
            value={count}
            variant={countVariant > 0 ? "up" : "down"}
            increaseValue={countVariant}
          />
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default ServiceAnalytic;
