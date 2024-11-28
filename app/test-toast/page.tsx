"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CldVideoPlayer } from "next-cloudinary";
import Image from "next/image";
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
      <Image src="https://utfs.io/f/yYv3QHy7AjsNUWZ8fGuiAVar1IbnQdiWl8OqP2Z4U05YFBGK" alt="img" width={80} height={80} unoptimized />
      
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
