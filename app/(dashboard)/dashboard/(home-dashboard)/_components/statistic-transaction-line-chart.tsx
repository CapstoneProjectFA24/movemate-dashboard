"use client";

import { IStatisticTransaction } from "@/features/statistic/types/statistic-transation-type";
import React from "react";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
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
export const formatter = new Intl.NumberFormat('vi-VN', {
  style : 'currency',
  currency: 'VND',
});
const chartConfig = {
  totalIncome: {
    label: "Tổng thu nhập",
    color: "hsl(var(--chart-2))",
  },
  totalCompensation: {
    label: "Tổng bồi thường",
    color: "hsl(0, 100%, 50%)",
  },
  profit: {
    label: "Lợi nhuận",
    color: "hsl(240, 100%, 50%)",
  },
} satisfies ChartConfig;

interface StatisticTransactionLineChartProps {
  data: IStatisticTransaction[];
}

const StatisticTransactionLineChart = ({
  data,
}: StatisticTransactionLineChartProps) => {

  const processedData = data.map(item => ({
    ...item,
    shard: `${item.shard.slice(4, 6)}-${item.shard.slice(0, 4)}`,
    profit: item.totalIncome - item.totalCompensation, 
  }));
  return (
    <Card className="h-90">
      <CardContent className="h-[400px]">
        <ChartContainer config={chartConfig}>
          <LineChart data={processedData } margin={{ right: 30, left: 20 }}>
            <XAxis
              dataKey="shard"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              tickFormatter={(value) => `T${value.slice(0, 2)}`}
            />
            <YAxis
              type="number"
              domain={["dataMin", "dataMax"]}
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              tickFormatter={(value) => `${formatter.format(value)}`}
            />
            <CartesianGrid vertical={false} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="totalIncome"
              stroke="var(--color-totalIncome)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="totalCompensation"
              stroke="var(--color-totalCompensation)"
              strokeWidth={2}
              dot={false}
            />
             <Line
              type="monotone"
              dataKey="profit"
              stroke="var(--color-profit)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing total income and total compensation for the last 12 months
            </div>
          </div>
        </div>
      </CardFooter> */}
    </Card>
  );
};

export default StatisticTransactionLineChart;
