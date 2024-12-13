"use client";
import { Button } from "@/components/ui/button";
import React from "react";

const HomePage = () => {
  const handleClick = () => {
    console.log("test");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Trang Chính</h1>
      <Button onClick={handleClick} className="mb-4">Hiển thị Toast</Button>

      {/* Thử hiển thị video */}
      <div className="w-full max-w-3xl">
        <video
          src="https://res.cloudinary.com/dkpnkjnxs/video/upload/v1732321402/movemate/videos/rftpo4kfc9dnm6my0wni.mp4"
          controls
          style={{ width: "100%", height: "auto" }}
        >
          Trình duyệt của bạn không hỗ trợ video.
        </video>
      </div>
    </div>
  );
};

export default HomePage;
