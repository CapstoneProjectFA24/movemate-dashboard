"use client";
import React, { useRef, useEffect } from "react";
import { useNotificationInfinity } from "@/features/notifications/react-query/query";
import { ScrollArea } from "@/components/ui/scroll-area";

const TestInfinit = () => {
  const {
    data: notificationInfinity,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useNotificationInfinity();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Flatten notifications array
  const notifications =
    notificationInfinity?.pages.flatMap((page) => page) || [];

  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (scrollArea) {
      const handleScroll = () => {
        if (hasNextPage && !isFetchingNextPage) {
          const { scrollHeight, scrollTop, clientHeight } = scrollArea;
          if (scrollTop + clientHeight >= scrollHeight) {
            fetchNextPage();
          }
        }
      };

      scrollArea.addEventListener("scroll", handleScroll);
      return () => scrollArea.removeEventListener("scroll", handleScroll);
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <ScrollArea
      ref={scrollAreaRef}
      className="h-[400px] bg-white border rounded-md p-4 overflow-auto"
    >
      <h2 className="text-2xl font-bold mb-4">Infinite Notifications</h2>
      {notifications.map((notification) => (
        <div key={notification.id} className="bg-gray-100 p-4 rounded-md mb-4">
          <h3 className="text-lg font-medium">{notification.id}</h3>
          {/* Hiển thị các thông tin khác của notification nếu cần */}
        </div>
      ))}
      {(isLoading || isFetchingNextPage) && (
        <div className="text-center py-4">
          <span className="animate-spin h-5 w-5 mr-3 border-gray-500 border-solid border-2 rounded-full"></span>
          Loading...
        </div>
      )}
    </ScrollArea>
  );
};

export default TestInfinit;
