"use client";
import { cn } from "@/lib/utils";
import React, { useState, useEffect, useCallback } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  addDays,
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { vi } from "date-fns/locale";
import { CalendarIcon, CalendarDaysIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
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
      ["NOW", "WEEKNOW", "MONTHNOW"].includes(searchParams.type)
    ) {
      return searchParams.type;
    }
    return "MONTHNOW";
  });

  const [isRange, setIsRange] = useState(false);
  const [singleDate, setSingleDate] = useState<Date>();
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

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
    if (!searchParams.type && !searchParams.shard) {
      const newSearchParams = new URLSearchParams(searchParamsObj.toString());
      newSearchParams.set("type", "MONTHNOW");
      router.replace(`?${newSearchParams.toString()}`, { scroll: false });
      setInitialDateRange("MONTHNOW");
    }
  }, []);

  const handleTypeSelect = (value: string) => {
    setSelectedValue(value);
    if (value === "OTHER") {
      updateSearchParams({ shard: undefined });

      setSingleDate(undefined);
      setDateRange(undefined);
      setCurrentMonth(new Date()); 
    } else {
      updateSearchParams({ type: value, shard: undefined });
      setInitialDateRange(value);
    }
  };

  const handleDateSelect = useCallback(
    (date: Date | undefined) => {
      setSingleDate(date);
      setDateRange(undefined); 
      if (date) {
        const formattedDate = format(date, "yyyyMMdd");
        updateSearchParams({
          shard: `${formattedDate}-${formattedDate}`,
          type: undefined,
        });
      }
    },
    [updateSearchParams]
  );

  const handleDateRangeSelect = useCallback(
    (range: DateRange | undefined) => {
      setDateRange(range);
      setSingleDate(undefined); // Clear single date when selecting date range
      if (range?.from && range?.to) {
        const fromDate = format(range.from, "yyyyMMdd");
        const toDate = format(range.to, "yyyyMMdd");
        updateSearchParams({ shard: `${fromDate}-${toDate}`, type: undefined });
      }
    },
    [updateSearchParams]
  );

  const handleToggleRange = () => {
    const now = new Date();
    setIsRange(!isRange);
    setCurrentMonth(now); // Always set current month to today when swapping modes

    if (!isRange) {
      // Switching to range mode
      if (!dateRange?.from && !dateRange?.to) {
        // If no date range is selected, set default to current week
        const defaultRange = {
          from: startOfWeek(now, { weekStartsOn: 1 }),
          to: endOfWeek(now, { weekStartsOn: 1 }),
        };
        setDateRange(defaultRange);
        const fromDate = format(defaultRange.from, "yyyyMMdd");
        const toDate = format(defaultRange.to, "yyyyMMdd");
        updateSearchParams({
          shard: `${fromDate}-${toDate}`,
          type: undefined,
        });
      }
      setSingleDate(undefined);
    } else {
      // Switching to single date mode
      if (!singleDate) {
        // If no single date is selected, set default to today
        setSingleDate(now);
        const formattedDate = format(now, "yyyyMMdd");
        updateSearchParams({
          shard: `${formattedDate}-${formattedDate}`,
          type: undefined,
        });
      }
      setDateRange(undefined);
    }
  };

  const setInitialDateRange = (type: string) => {
    const now = new Date();
    switch (type) {
      case "NOW":
        setSingleDate(now);
        setDateRange(undefined);
        setIsRange(false);
        break;
      case "WEEKNOW":
        const weekRange = {
          from: startOfWeek(now, { weekStartsOn: 1 }),
          to: endOfWeek(now, { weekStartsOn: 1 }),
        };
        setDateRange(weekRange);
        setSingleDate(undefined);
        setIsRange(true);
        break;
      case "MONTHNOW":
        const monthRange = {
          from: startOfMonth(now),
          to: endOfMonth(now),
        };
        setDateRange(monthRange);
        setSingleDate(undefined);
        setIsRange(true);
        break;
    }
  };

  const formatDate = () => {
    if (isRange) {
      return dateRange?.from ? (
        dateRange.to ? (
          <>
            {format(dateRange.from, "dd/MM/yyyy", { locale: vi })} -{" "}
            {format(dateRange.to, "dd/MM/yyyy", { locale: vi })}
          </>
        ) : (
          format(dateRange.from, "dd/MM/yyyy", { locale: vi })
        )
      ) : (
        <span>Chọn khoảng ngày</span>
      );
    } else {
      return singleDate ? (
        format(singleDate, "dd/MM/yyyy", { locale: vi })
      ) : (
        <span>Chọn ngày</span>
      );
    }
  };

  const handleQuickSelect = (value: string) => {
    const newDate = addDays(new Date(), parseInt(value));
    setSingleDate(newDate);
    setCurrentMonth(newDate);
    const formattedDate = format(newDate, "yyyyMMdd");
    updateSearchParams({
      shard: `${formattedDate}-${formattedDate}`,
      type: undefined,
    });
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
  

  return (
    <div className="flex items-center gap-4">
      <Select value={selectedValue} onValueChange={handleTypeSelect}>
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Select time range" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem  value="NOW">Hôm nay</SelectItem>
            <SelectItem value="WEEKNOW">Tuần này</SelectItem>
            <SelectItem value="MONTHNOW">Tháng này</SelectItem>
            <SelectItem value="OTHER">Lựa chọn</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {selectedValue === "OTHER" && (
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !singleDate && !dateRange && "text-muted-foreground"
                )}
              >
                {isRange ? (
                  <CalendarDaysIcon className="mr-2 h-4 w-4" />
                ) : (
                  <CalendarIcon className="mr-2 h-4 w-4" />
                )}
                {formatDate()}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className={cn("w-auto p-0", !isRange && "min-w-[450px]")}
              align="start"
            >
              <div className="flex flex-col">
                <div className="flex items-center justify-between p-3 border-b">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleToggleRange}
                    className="text-xs hover:bg-secondary"
                  >
                    {isRange
                      ? "Chuyển sang chọn một ngày"
                      : "Chuyển sang chọn khoảng ngày"}
                  </Button>
                  {!isRange && (
                    <Select onValueChange={handleQuickSelect}>
                      <SelectTrigger className="h-8 w-[180px] text-xs">
                        <SelectValue placeholder="Chọn ngày nhanh" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="0">Hôm nay</SelectItem>
                        <SelectItem value="1">Ngày mai</SelectItem>
                        <SelectItem value="3">3 ngày tới</SelectItem>
                        <SelectItem value="7">7 ngày tới</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
                <div className="p-3">
                  {isRange ? (
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={handleDateRangeSelect}
                      numberOfMonths={2}
                      className="rounded-md border-none"
                      locale={vi}
                      formatters={formatters}
                    />
                  ) : (
                    <Calendar
                      initialFocus
                      mode="single"
                      month={currentMonth}
                      selected={singleDate}
                      onSelect={handleDateSelect}
                      onMonthChange={setCurrentMonth}
                      numberOfMonths={1}
                      className="rounded-md border-none w-full"
                      locale={vi}
                      formatters={formatters}
                      classNames={{
                        months: "flex justify-center",
                        month: "space-y-4 w-full",
                        caption:
                          "flex justify-center pt-1 relative items-center w-full",
                        caption_label: "text-sm font-medium",
                        nav: "space-x-1 flex items-center",
                        nav_button:
                          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                        nav_button_previous: "absolute left-1",
                        nav_button_next: "absolute right-1",
                        table: "w-full border-collapse space-y-1",
                        head_row: "flex w-full justify-between",
                        head_cell:
                          "text-muted-foreground rounded-md w-10 font-normal text-[0.8rem]",
                        row: "flex w-full mt-2 justify-between",
                        cell: cn(
                          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent",
                          "first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                        ),
                        day: "h-10 w-10 p-0 font-normal aria-selected:opacity-100",
                        day_range_end: "day-range-end",
                        day_selected:
                          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                        day_today: "bg-accent text-accent-foreground",
                        day_outside: "text-muted-foreground opacity-50",
                        day_disabled: "text-muted-foreground opacity-50",
                        day_range_middle:
                          "aria-selected:bg-accent aria-selected:text-accent-foreground",
                        day_hidden: "invisible",
                      }}
                    />
                  )}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
};

export default StatisticFilterDate;
