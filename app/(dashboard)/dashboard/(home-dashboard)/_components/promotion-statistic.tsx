"use client";

import { IStatisticPromtion } from "@/features/statistic/types/statistic-promotions-type";
import React from "react";
import { Bar, BarChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface PromotionStatisticProps {
  data: IStatisticPromtion | null;
}

const chartConfig: ChartConfig = {
  running: {
    label: "Voucher còn lại",
    color: "hsl(var(--chart-1))",
  },
  swimming: {
    label: "Voucher khách hàng đã nhận",
    color: "hsl(var(--chart-2))",
  },
};

const PromotionStatistic = ({ data }: PromotionStatisticProps) => {
  if (!data || !data.promotionDetails || data.promotionDetails.length === 0) {
    return (
      <Card className="flex justify-center items-center h-[320px]">
        <div className="text-center">
          <p className="text-5xl font-bold text-foreground">Không có dữ liệu</p>
        </div>
      </Card>
    );
  }

  const chartData = data.promotionDetails.map((promotion) => ({
    date: promotion.promotionName, 
    running: promotion.quantity, 
    swimming: promotion.totalUsersTakingVouchers, 
  }));

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Chương trình khuyến mãi hiện tại</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart data={chartData} width={400} height={300}>
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <Bar
                dataKey="running"
                stackId="a"
                fill="var(--color-running)"
                radius={[0, 0, 4, 4]}
              />
              <Bar
                dataKey="swimming"
                stackId="a"
                fill="var(--color-swimming)"
                radius={[4, 4, 0, 0]}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    hideLabel
                    formatter={(value, name) => (
                      <div className="flex min-w-[130px] items-center text-xs text-muted-foreground">
                        {chartConfig[name as keyof typeof chartConfig]?.label || name}
                        <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                          {value}
                          <span className="font-normal text-muted-foreground"></span>
                        </div>
                      </div>
                    )}
                  />
                }
                cursor={false}
                defaultIndex={1}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default PromotionStatistic;