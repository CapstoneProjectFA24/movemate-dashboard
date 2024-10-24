"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import MaxWidthWrapper from "./max-width-wrapper";
import { links } from "@/constants/nav-landing-link";
import NavMobile from "./nav-mobile";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import FormPopoverUser from "../form-popover-user/form-popover-user";
import UserAvatar from "../form-popover-user/user-avatar";
import { ModeToggle } from "../dashboard/navbar/mode-toggle";

const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav className="sticky z-[100] h-16 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all dark:bg-gray-800 dark:border-gray-600">
      <MaxWidthWrapper>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 z-40">
            <span className="text-2xl font-bold text-orange-600">MoveMate</span>
            <Image
              src="/images/icons_favicon/icon.png"
              alt="Logo"
              width={40}
              height={40}
              className="hidden sm:block rounded-full"
            />
          </Link>

          <div className="hidden lg:flex items-center space-x-6">
            {links.map((route) => {
              const isActive = pathname === route.href;
              return (
                <Link
                  key={route.label}
                  href={route.href || "#"}
                  className={`flex items-center space-x-1 ${
                    isActive
                      ? "text-orange-600"
                      : "text-gray-800 dark:text-gray-200 hover:text-orange-600"
                  }`}
                >
                  <span>{route.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <span className="text-gray-800 dark:text-gray-200">
              Hotline: 0382703625
            </span>
            <ModeToggle />

            {session ? (
              <div>
                <FormPopoverUser align="start" side="bottom" sideOffset={18}>
                  <Button
                    size="icon"
                    className="rounded-full flex justify-center md:block h-auto p-0"
                  >
                    <UserAvatar />
                  </Button>
                </FormPopoverUser>
              </div>
            ) : (
              <Link href="/sign-in">
                <button className="px-4 py-2 text-white bg-orange-600 rounded-md hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600">
                  Đăng nhập
                </button>
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4 md:hidden">
            <ModeToggle />
            <NavMobile />
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
