"use client";
import { DateRangePicker } from "@/components/data-table/custom-table/date-range-picker";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CldVideoPlayer } from "next-cloudinary";
import React from "react";
import { toast } from "sonner";

const HomePage = () => {
  const handleClick = () => {
    console.log("test");
    toast.error("Đây là một thông báo toast!");
  };
  return (
    <div>
      <h1>Trang Chính</h1>
      <Button onClick={handleClick}>Hiển thị Toast</Button>
      <React.Suspense fallback={<Skeleton className="h-7 w-52" />}>
              <DateRangePicker
                triggerSize="sm"
                triggerClassName="ml-auto w-56 sm:w-60"
                align="end"
                shallow={false}
              />
            </React.Suspense>
      {/* <CldVideoPlayer
  id="sea-turtle-color"
  width="1920"
  height="1080"
  src="https://res.cloudinary.com/dkpnkjnxs/video/upload/v1732321402/movemate/videos/rftpo4kfc9dnm6my0wni.mp4"
  colors={{
    base: "#0f0",
    text: "#000",
    accent: "#fff"
  }}
/> */}

    </div>
  );
};

export default HomePage;
