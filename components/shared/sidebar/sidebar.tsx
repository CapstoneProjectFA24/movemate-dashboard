"use client";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Navigation } from "./navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Sidebar = () => {
  return (
    <aside className="h-full bg-white dark:bg-muted/40 border-r flex flex-col shadow-sm dark:border-x-muted-foreground">
      <div className="flex h-14 items-center px-4 lg:h-[72px] lg:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-75 transition"
        >
          <Image
            src="/images/icons_favicon/icon.png"
            alt="Logo"
            width={32}
            height={32}
            className="rounded-md"
          />
          <h1 className="font-semibold text-xl text-black dark:text-white">
            Movemate
          </h1>
        </Link>

        <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </div>
      <Separator className="my-[7.2px] border-b-2 border-gray-300 dark:border-gray-600" />
      <ScrollArea className="flex-1 px-4">
        <Navigation />
      </ScrollArea>
      <div className="p-4 mt-auto">
        <Card>
          <CardHeader>
            <CardTitle>Người dùng </CardTitle>
            <CardDescription>
              Unlock all features and get unlimited access to our support team.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="sm" className="w-full">
              Đăng xuất
            </Button>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
};
