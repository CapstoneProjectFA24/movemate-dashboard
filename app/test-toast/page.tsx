"use client";
import { Button } from "@/components/ui/button";
import { CldVideoPlayer } from "next-cloudinary";
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
      <CldVideoPlayer
  id="sea-turtle-color"
  width="1920"
  height="1080"
  src="https://res.cloudinary.com/dkpnkjnxs/video/upload/v1732321402/movemate/videos/rftpo4kfc9dnm6my0wni.mp4"
  colors={{
    base: "#0f0",
    text: "#000",
    accent: "#fff"
  }}
/>

    </div>
  );
};

export default HomePage;
