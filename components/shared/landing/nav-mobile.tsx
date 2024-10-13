"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { links } from "@/constants/nav-landing-link";
import Link from "next/link";

const NavMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="md:hidden">
        <button
          type="button"
          className="text-gray-800 dark:text-gray-200 hover:text-orange-600 transition-colors duration-200"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[300px] sm:w-[400px] p-0 bg-white dark:bg-gray-800 z-[120]"
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 py-3  border-b border-gray-200 dark:border-gray-700">
            <span className="text-xl font-semibold text-orange-600">Menu</span>
          </div>
          <nav className="flex flex-col gap-2 p-4 flex-grow">
            {links.map((route) => {
              const isActive = pathname === route.href;
              const Icon = isActive ? route.activeIcon : route.icon;
              return (
                <Link
                  key={route.label}
                  href={route.href || "#"}
                  className={`flex items-center space-x-3 p-3 rounded-lg ${
                    isActive
                      ? "bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300"
                      : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  } transition-colors duration-200`}
                  onClick={() => setIsOpen(false)}
                >
                  {Icon && <Icon className="w-5 h-5" />}
                  <span className="font-medium">{route.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t-2 border-gray-200 dark:border-gray-700 space-y-4">
            <Link href="/sign-in" onClick={() => setIsOpen(false)}>
              <button className="w-full px-4 py-3 text-white bg-orange-600 rounded-lg hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 transition-colors duration-200 font-medium">
                Đăng nhập
              </button>
            </Link>
            <div className="text-center">
              <span className="text-gray-600 dark:text-gray-400 text-sm">
                Cần hỗ trợ? Gọi Hotline
              </span>
              <p className="text-orange-600 font-semibold">0382703625</p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NavMobile;
