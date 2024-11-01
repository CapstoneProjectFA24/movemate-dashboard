import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";
import {
  GoCheckCircle,
  GoCheckCircleFill,
  GoHome,
  GoHomeFill,
} from "react-icons/go";
import { MdMiscellaneousServices } from "react-icons/md";
import { FaEnvelope, FaEnvelopeOpen, FaListAlt, FaRegListAlt, FaUserCheck } from "react-icons/fa";
import { Settings, User } from "lucide-react";
import { FaMailchimp, FaUserPen } from "react-icons/fa6";
import { TbBrandBooking } from "react-icons/tb";
import { UserRole } from "@/lib/enums/user-role-enum";
import { MdSettings, MdSettingsApplications } from "react-icons/md";
export interface Route {
  label: string;
  icon: LucideIcon | IconType;
  activeIcon: LucideIcon | IconType;
  href?: string;
  isParent?: boolean;
  children?: Omit<Route, "isParent" | "children">[];
  allowsRoles?: UserRole[];
}

// ko truyền allowRoles là full role dc vô nhé 
// code dev để full mốt chặn sau => ví dụ ở bookings route
export const routes: Route[] = [
  {
    label: "Trang chủ",
    icon: GoHome,
    activeIcon: GoHomeFill,
    href: "/dashboard",
  },
  {
    label: "Quản lý nhân sự",
    icon: FaUserPen,
    activeIcon: FaUserCheck,
    isParent: true,
    children: [
      {
        label: "Danh sách nhân sự",
        href: "/dashboard/users",
        icon: FaUserPen,
        activeIcon: FaUserCheck,
      },
    ],
  },
  {
    label: "Quản lý dịch vụ",
    icon: MdMiscellaneousServices,
    activeIcon: MdMiscellaneousServices,
    isParent: true,
    children: [
      {
        label: "Danh sách dịch vụ",
        href: "/dashboard/services",
        icon: FaRegListAlt,
        activeIcon: FaListAlt,
      },
    ],
  },
  {
    label: "Quản lý đơn dọn nhà",
    icon: TbBrandBooking,
    activeIcon: TbBrandBooking,
    href: "/dashboard/bookings",
    // allowsRoles: [UserRole.MANAGER, UserRole.REVIEWER],
  },
  {
    label: "Phản hồi",
    icon: FaEnvelope,
    activeIcon: FaEnvelopeOpen,
    href: "/dashboard/mail",
  },
  {
    label: "Cài đặt",
    icon: Settings,
    activeIcon: Settings,
    href: "/dashboard/settings",
  },
];
