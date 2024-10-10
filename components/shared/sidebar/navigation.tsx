"use client";
import {
  GoCheckCircle,
  GoCheckCircleFill,
  GoHome,
  GoHomeFill,
} from "react-icons/go";
import { Settings, User } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";
import { usePathname } from "next/navigation"; 
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"; 

interface Route {
  label: string;
  icon: LucideIcon | IconType;
  activeIcon: LucideIcon | IconType;
  href?: string;
  isParent?: boolean;
  children?: Omit<Route, "isParent" | "children">[];
}

const routes: Route[] = [
  {
    label: "Trang chủ",
    icon: GoHome,
    activeIcon: GoHomeFill,
    href: "/dashboard",
  },
  {
    label: "Quản lý",
    icon: GoCheckCircle,
    activeIcon: GoCheckCircleFill,
    isParent: true,
    children: [
      {
        label: "Create Users",
        href: "/admin/create",
        icon: GoCheckCircle,
        activeIcon: GoCheckCircleFill,
      },
    ],
  },
  {
    label: "Cài đặt",
    icon: Settings,
    activeIcon: Settings,
    href: "/settings",
  },
  {
    label: "Thành viên",
    icon: User,
    activeIcon: User,
    href: "/member",
  },
];

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col space-y-1">
      {routes.map((item) => {
        const isActive = pathname === item.href;
        const Icon = isActive ? item.activeIcon : item.icon;

        return (
          <li key={item.label} className="mb-1">
            {item.href ? (
              <Link href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 p-2 rounded-md font-semibold transition-all duration-200 hover:bg-[#e9a072] hover:text-white hover:shadow",
                    isActive
                      ? "bg-[#F4721E] text-white shadow"
                      : "text-neutral-600 dark:text-neutral-400"
                  )}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-base">{item.label}</span>
                </div>
              </Link>
            ) : (
              <Accordion type="single" collapsible>
                <AccordionItem value={item.label}>
                  <AccordionTrigger
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-md font-semibold transition-all duration-200 hover:bg-[#e9a072] hover:no-underline hover:text-white hover:shadow",
                      isActive
                        ? "bg-[#F4721E] text-white shadow"
                        : "text-neutral-600 dark:text-neutral-400"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-6 h-6" />
                      <span className="text-base">{item.label}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="ml-6  border-l-2 border-gray-200 pl-4 space-y-2">
                      {item.children?.map((child) => (
                        <li key={child.label}>
                          <Link href={child.href!}>
                            <div className="flex items-center gap-2.5 p-2 rounded-md font-medium hover:bg-[#e9a072] transition-all text-neutral-600 dark:text-neutral-400 hover:text-white">
                              <child.icon className="w-5 h-5" />
                              <span className="text-sm">{child.label}</span>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </li>
        );
      })}
    </ul>
  );
};
