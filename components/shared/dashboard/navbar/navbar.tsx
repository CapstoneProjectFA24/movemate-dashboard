"use client";
import * as React from "react";
import { MobileSidebar } from "../sidebar/mobile-sidebar";
import { ModeToggle } from "./mode-toggle";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchBar from "./search-bar";
import UserProfileDropdown from "./user-profile-dropdown";
import Notifications from "./notification";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const router = useRouter();
  return (
    <nav className="bg-white dark:bg-muted/40 backdrop-filter backdrop-blur-lg px-6 flex items-center justify-between h-20 border-b-2 my-[1px] border-gray-300 dark:border-gray-600 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <MobileSidebar />
        <div className="flex-col hidden lg:flex">
          <h1 className="text-2xl font-bold text-black dark:text-white">
            Trang quản lý
          </h1>
          <p className="text-muted-foreground dark:text-gray-300">
            Chào mừng trở lại, Vinh
          </p>
        </div>
      </div>

      <SearchBar />

      <div className="flex items-center gap-4">
        <Notifications />
        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={() => router.push("/dashboard/chat")}
          className="hover:bg-secondary/80 transition-colors"
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
        <ModeToggle />
        <UserProfileDropdown />
      </div>
    </nav>
  );
};
