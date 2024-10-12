import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";
import {
  GoCheckCircle,
  GoCheckCircleFill,
  GoHome,
  GoHomeFill,
} from "react-icons/go";

import { Settings, User } from "lucide-react";

interface Route {
  label: string;
  icon: LucideIcon | IconType;
  activeIcon: LucideIcon | IconType;
  href?: string;
  isParent?: boolean;
  children?: Omit<Route, "isParent" | "children">[];
}

export const routes: Route[] = [
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
    href: "/dashboard/settings",
  },
  {
    label: "Thành viên",
    icon: User,
    activeIcon: User,
    href: "/member",
  },
];
