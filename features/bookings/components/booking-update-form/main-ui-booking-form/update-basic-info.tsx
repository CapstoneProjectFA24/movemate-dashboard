"use client";
import React, { useTransition } from "react";
import { Control, useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import { Building2, Calendar, Save } from "lucide-react";
import FormFieldCustom from "@/components/form/form-field";
import SelectFormField from "@/components/form/select-form-field";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IHouse } from "@/features/services/types/house-type";
import { useParams } from "next/navigation";
import { updateBookingStatus } from "@/features/bookings/action/update-booking";
import { toast } from "sonner";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Calendar as CalendarPicker } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UpdateBasicInfoProps {
  control: Control<any>;
  houseTypes: IHouse[] | null;
  loading: boolean;
  canReview: boolean;
}

const AVAILABLE_HOURS = Array.from({ length: 15 }, (_, i) => i + 5);
const AVAILABLE_MINUTES = ["00", "15", "30", "45"];

const UpdateBasicInfo = ({
  control,
  houseTypes,
  loading,
  canReview,
}: UpdateBasicInfoProps) => {
  const { getValues, watch, setValue } = useFormContext();
  const [isPending, startTransition] = useTransition();
  const params = useParams();

  const bookingAt = watch("bookingAt");
  const bookingDate = bookingAt ? new Date(bookingAt) : null;

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const currentDate = bookingDate || new Date();
      date.setHours(currentDate.getHours(), currentDate.getMinutes());
      setValue("bookingAt", date);
    }
  };

  const handleTimeChange = (type: "hour" | "minute", value: string) => {
    if (!bookingDate) return;

    const newDate = new Date(bookingDate);
    const currentDate = new Date();
    const isToday = newDate.toDateString() === currentDate.toDateString();

    if (isToday) {
      // Validate time for today
      if (type === "hour") {
        const hour = parseInt(value);
        const currentHour = currentDate.getHours();
        
        // Ensure selected hour is not before current hour
        if (hour < currentHour) {
          toast.error(`Giờ phải từ ${currentHour} trở đi`);
          return;
        }
        newDate.setHours(hour);
      } else {
        const hour = newDate.getHours();
        const minute = parseInt(value);
        const currentHour = currentDate.getHours();
        const currentMinute = currentDate.getMinutes();

        // Validate minutes if selecting the current hour
        if (hour === currentHour && minute < currentMinute) {
          toast.error(`Phút phải từ ${currentMinute} trở đi`);
          return;
        }
        newDate.setMinutes(minute);
      }
    } else {
      // For future dates, just set the time normally
      if (type === "hour") {
        newDate.setHours(parseInt(value));
      } else {
        newDate.setMinutes(parseInt(value));
      }
    }

    setValue("bookingAt", newDate);
  };

  const handleUpdateClick = () => {
    // fomat date to utc with location
    const bookingAtValue = getValues("bookingAt");

    const localDate =
      bookingAtValue instanceof Date
        ? bookingAtValue
        : new Date(bookingAtValue);

    const utcDate = new Date(localDate.getTime() + 7 * 60 * 60 * 1000);

    const data = {
      houseTypeId: getValues("houseTypeId"),
      roomNumber: getValues("roomNumber"),
      floorsNumber: getValues("floorsNumber"),
      pickupAddress: getValues("pickupAddress"),
      deliveryAddress: getValues("deliveryAddress"),
      bookingAt: utcDate.toISOString(),
    };

    startTransition(async () => {
      const result = await updateBookingStatus(params.id.toString(), data);

      if (!result.success) {
        toast.error(result.error);
        return;
      }
      toast.success("Cập nhật dịch vụ thành công !");
    });
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="border-b ">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center text-lg font-semibold">
            <Building2 className="h-5 w-5 mr-2 text-primary" />
            Thông tin địa điểm
          </CardTitle>
          {canReview && (
            <Button
              disabled={loading || isPending}
              type="button"
              onClick={handleUpdateClick}
              className="bg-primary hover:bg-primary/90 text-white transition-colors duration-200 flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {loading || isPending ? "Đang cập nhật..." : "Cập nhật"}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="grid gap-6 p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <SelectFormField
            control={control}
            name="houseTypeId"
            label="Loại nhà"
            placeholder="Chọn loại nhà"
            options={houseTypes}
            renderOption={(option) => option.name}
            loading={loading}
            canReview={canReview}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <FormFieldCustom
            control={control}
            name="roomNumber"
            label="Số phòng"
            placeholder="Nhập số phòng"
            type="number"
            min={1}
            disabled={loading || !canReview}
            className="w-full"
          />
          <FormFieldCustom
            control={control}
            name="floorsNumber"
            label="Số tầng"
            placeholder="Nhập số tầng"
            type="number"
            min={1}
            disabled={loading || !canReview}
            className="w-full"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <div className="grid grid-cols-2">
            <div className="space-y-1">
              <label className="text-sm font-medium leading-none">
                Thời gian đặt lịch
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    disabled={loading || !canReview}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !bookingDate && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {bookingDate
                      ? format(bookingDate, "dd/MM/yyyy - HH:mm", {
                          locale: vi,
                        })
                      : "Chọn thời gian"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="p-3">
                    <div className="flex gap-2 mb-2">
                      <Select
                        value={bookingDate?.getHours().toString()}
                        onValueChange={(value) =>
                          handleTimeChange("hour", value)
                        }
                        disabled={loading || !canReview || !bookingDate}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Giờ" />
                        </SelectTrigger>
                        <SelectContent>
                          {AVAILABLE_HOURS.map((hour) => (
                            <SelectItem key={hour} value={hour.toString()}>
                              {hour.toString().padStart(2, "0")}:00
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select
                        value={
                          bookingDate
                            ? bookingDate
                                .getMinutes()
                                .toString()
                                .padStart(2, "0")
                            : "00"
                        }
                        onValueChange={(value) =>
                          handleTimeChange("minute", value)
                        }
                        disabled={loading || !canReview || !bookingDate}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Phút" />
                        </SelectTrigger>
                        <SelectContent>
                          {AVAILABLE_MINUTES.map((minute) => (
                            <SelectItem key={minute} value={minute}>
                              {minute}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <CalendarPicker
                      mode="single"
                      locale={vi}
                      selected={bookingDate!}
                      className="w-full"
                      classNames={{
                        months: "w-full flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                        month: "space-y-4 w-full",
                        caption: "flex justify-center pt-1 relative items-center text-lg font-semibold",
                        caption_label: "text-base font-medium",
                        nav: "space-x-1 flex items-center",
                        nav_button: "h-8 w-8 bg-transparent p-0 hover:opacity-70",
                        nav_button_previous: "absolute left-1",
                        nav_button_next: "absolute right-1",
                        table: "w-full border-collapse space-y-1",
                        head_row: "flex justify-between w-full",
                        head_cell: "text-muted-foreground rounded-md w-12 font-medium text-sm",
                        row: "flex w-full justify-between mt-2",
                        cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent",
                        day: "h-10 w-10 p-0 font-normal aria-selected:opacity-100",
                        day_range_end: "day-range-end",
                        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                      }}
                      onSelect={handleDateSelect}
                      initialFocus
                      disabled={(date) => {
                        // Disable dates before today
                        const today = new Date();
                        today.setHours(0, 0, 0, 0); // Reset time to start of day
                        return date < today;
                      }}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <FormFieldCustom
            control={control}
            name="pickupAddress"
            label="Địa chỉ cho nhân viên tới để dọn nhà"
            placeholder="Nhập địa chỉ nhận đồ"
            disabled={loading || !canReview}
            className="w-full"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <FormFieldCustom
            control={control}
            name="deliveryAddress"
            label="Địa chỉ vận chuyển đi"
            placeholder="Nhập địa chỉ giao đồ"
            disabled={loading || !canReview}
            className="w-full"
          />
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default UpdateBasicInfo;
