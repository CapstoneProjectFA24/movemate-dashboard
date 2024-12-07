"use client";

import { Pie, PieChart, Label } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { IStatisticBooking } from "@/features/statistic/types/statistic-booking-type";

interface StatisticbookingPineChartProps {
  data: IStatisticBooking[];
}

export function StatisticbookingPineChart({
  data,
}: StatisticbookingPineChartProps) {
  const chartData = [
    {
      browser: "totalInProcessBookings",
      visitors: data[0].totalInProcessBookings,
      fill: "var(--color-totalInProcessBookings)",
    },
    {
      browser: "totalCancelBookings",
      visitors: data[0].totalCancelBookings,
      fill: "var(--color-totalCancelBookings)",
    },
  ];

  const chartConfig = {
    visitors: {
      label: "Visitors",
    },

    totalInProcessBookings: {
      label: "Tổng đơn thực hiện",
      color: "hsl(var(--chart-2))",
    },
    totalCancelBookings: {
      label: "Tổng đơn hủy",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;
  if (data[0].totalBookings === 0) {
    return (
      <Card className="flex justify-center items-center h-[300px]">
        <div className="text-center">
          <p className="text-5xl font-bold text-foreground">0</p>
          <p className="text-2xl text-muted-foreground">không có đơn</p>
        </div>
      </Card>
    );
  }
  return (
    <Card className="flex ">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[280px] "
        >
          <PieChart className="">
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {data[0].totalBookings.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Tổng số lượng đơn
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="visitors" hideLabel />}
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="browser" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/2 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
