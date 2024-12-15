import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ArrowDownIcon,
    ArrowUpIcon,
} from "lucide-react";
import { formatter } from "@/lib/utils";

interface StatCardProps {
    title: string;
    value: number;
    icon: React.ReactNode;
    description: string;
    trend?: {
        value: string;
        isPositive: boolean;
    };
}

const StatCard = ({
    title,
    value,
    icon,
    description,
    trend,
}: StatCardProps) => (
    <Card className="hover:shadow-lg transition-shadow duration-200 w-full">
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
                {icon}
                <span>{title}</span>
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{formatter.format(value)}</div>
            <div className="flex items-center space-x-2">
                {trend && (
                    <span
                        className={`flex items-center text-xs ${
                            trend.isPositive ? "text-green-500" : "text-red-500"
                        }`}
                    >
                        {trend.isPositive ? (
                            <ArrowUpIcon className="h-4 w-4" />
                        ) : (
                            <ArrowDownIcon className="h-4 w-4" />
                        )}
                        {trend.value}
                    </span>
                )}
                <p className="text-xs text-muted-foreground">{description}</p>
            </div>
        </CardContent>
    </Card>
);

export default StatCard;