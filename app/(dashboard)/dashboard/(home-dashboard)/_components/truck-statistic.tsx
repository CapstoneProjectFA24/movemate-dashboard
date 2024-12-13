"use client";

import { IStatisticTruckCategory } from "@/features/statistic/types/statistic-truckcategory-type";
import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, Legend } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface TruckStatisticProps {
  data: IStatisticTruckCategory | null;
}

const TruckStatistic = ({ data }: TruckStatisticProps) => {
  if (!data || !data.truckCategories || data.truckCategories.length === 0) {
    return (
      <Card className="flex justify-center items-center h-[320px]">
        <div className="text-center">
          <p className="text-5xl font-bold text-foreground">Không có dữ liệu</p>
        </div>
      </Card>
    );
  }

  const chartData = data.truckCategories.map((category) => ({
    name: category.truckCategoryName,
    totalTrucks: category.totalTrucks,
    totalBookings: category.totalBookings,
  }));

  const chartConfig = {
    totalTrucks: {
      label: "Tổng số xe",
      color: "hsl(var(--chart-1))",
    },
    totalBookings: {
      label: "Tổng đơn đặt hàng",
      color: "hsl(var(--chart-2))",
    },
  };

  return (
    <Card>
      <CardContent className="pb-0">
 
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[320px]"
        >
          <RadarChart
            data={chartData}
            margin={{ top: 10, right: 20, bottom: 20, left: 20 }}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarAngleAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
              tickLine={false}
              dy={10}
            />
            <PolarGrid radialLines={false} />
            <Radar
              dataKey="totalTrucks"
              fill="var(--color-totalTrucks)"
              fillOpacity={0.6}
              stroke="var(--color-totalTrucks)"
              strokeWidth={2}
            />
            <Radar
              dataKey="totalBookings"
              fill="var(--color-totalBookings)"
              fillOpacity={0.6}
              stroke="var(--color-totalBookings)"
              strokeWidth={2}
            />
            <Legend
              layout="vertical"
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              wrapperStyle={{ paddingTop: "55px", marginBottom: "-20px" }}
              payload={[
                {
                  value: "Tổng số xe",
                  type: "circle",
                  color: "var(--color-totalTrucks)",
                },
                {
                  value: "Tổng đơn đặt hàng",
                  type: "circle",
                  color: "var(--color-totalBookings)",
                },
              ]}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm"></CardFooter>
    </Card>
  );
};

export default TruckStatistic;
