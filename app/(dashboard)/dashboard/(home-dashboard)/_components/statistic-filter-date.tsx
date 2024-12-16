"use client";
import { cn } from "@/lib/utils";
import React, { useState, useEffect, useCallback } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  format,
  startOfMonth,
  endOfMonth,
  subMonths,
} from "date-fns";
import { vi } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";

export interface SearchParamFilterDashboard {
  shard?: string;
  type?: string;
  isSummary?: boolean;
}

interface SearchParamUpdates {
  type?: string | undefined;
  shard?: string | undefined;
}

const StatisticFilterDate = ({
  searchParams,
}: {
  searchParams: SearchParamFilterDashboard;
}) => {
  const router = useRouter();
  const searchParamsObj = useSearchParams();

  const [selectedValue, setSelectedValue] = useState(() => {
    if (
      searchParams.type &&
      ["MONTHNOW", "THREEMONTHSLASTED", "SIXMONTHSLASTED"].includes(searchParams.type)
    ) {
      return searchParams.type;
    }
    return "SIXMONTHSLASTED"; // Set default to SIXMONTHSLASTED
  });

  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDateRange, setSelectedDateRange] = useState<{from: Date, to: Date}>();

  const updateSearchParams = useCallback(
    (updates: SearchParamUpdates) => {
      const newSearchParams = new URLSearchParams(searchParamsObj.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, value);
        }
      });

      router.replace(`?${newSearchParams.toString()}`, { scroll: false });
    },
    [router, searchParamsObj]
  );

  useEffect(() => {
    if (!searchParams.type) {
      const newSearchParams = new URLSearchParams(searchParamsObj.toString());
      newSearchParams.set("type", "SIXMONTHSLASTED");
      router.replace(`?${newSearchParams.toString()}`, { scroll: false });
      setInitialDateRange("SIXMONTHSLASTED");
    } else {
      setInitialDateRange(selectedValue);
    }
  }, []);

  const handleTypeSelect = (value: string) => {
    setSelectedValue(value);
    updateSearchParams({ type: value });
    setInitialDateRange(value);
  };

  const setInitialDateRange = (type: string) => {
    const now = new Date();
    let dateRange;

    switch (type) {
      case "MONTHNOW":
        dateRange = {
          from: startOfMonth(now),
          to: endOfMonth(now),
        };
        break;
      case "THREEMONTHSLASTED":
        dateRange = {
          from: startOfMonth(subMonths(now, 2)),
          to: endOfMonth(now),
        };
        break;
      case "SIXMONTHSLASTED":
      default:
        dateRange = {
          from: startOfMonth(subMonths(now, 5)),
          to: endOfMonth(now),
        };
        break;
    }

    setSelectedDateRange(dateRange);
    
    if (dateRange) {
      const fromDate = format(dateRange.from, "yyyyMMdd");
      const toDate = format(dateRange.to, "yyyyMMdd");
      updateSearchParams({ shard: `${fromDate}-${toDate}` });
    }
  };

  const formatters = {
    formatCaption: (date: Date) => {
      return (
        format(date, "LLLL yyyy", { locale: vi }).charAt(0).toUpperCase() +
        format(date, "LLLL yyyy", { locale: vi }).slice(1)
      );
    },
    formatWeekday: (date: Date) => {
      return format(date, "EEEEEE", { locale: vi }).toUpperCase();
    },
  };

  const formatDateRange = () => {
    return selectedDateRange ? (
      <>
        {format(selectedDateRange.from, "dd/MM/yyyy", { locale: vi })} -{" "}
        {format(selectedDateRange.to, "dd/MM/yyyy", { locale: vi })}
      </>
    ) : (
      <span>Chọn khoảng ngày</span>
    );
  };

  return (
    <div className="flex items-center gap-4">
      <Select value={selectedValue} onValueChange={handleTypeSelect}>
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Select time range" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="MONTHNOW">Tháng này</SelectItem>
            <SelectItem value="THREEMONTHSLASTED">3 tháng gần đây</SelectItem>
            <SelectItem value="SIXMONTHSLASTED">6 tháng gần đây</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !selectedDateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formatDateRange()}
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-auto p-0"
          align="start"
        >
          <div className="p-3">
            <Calendar
              initialFocus
              mode="range"
              selected={selectedDateRange}
              defaultMonth={currentMonth}
              numberOfMonths={2}
              className="rounded-md border-none"
              locale={vi}
              formatters={formatters}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default StatisticFilterDate;