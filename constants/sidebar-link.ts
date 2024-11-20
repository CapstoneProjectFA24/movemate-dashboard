import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";
import {
  GoCheckCircle,
  GoCheckCircleFill,
  GoHome,
  GoHomeFill,
} from "react-icons/go";
import { GrTransaction } from "react-icons/gr";
import { MdMiscellaneousServices } from "react-icons/md";
import {
  FaCalendar,
  FaCalendarCheck,
  FaCalendarPlus,
  FaEnvelope,
  FaEnvelopeOpen,
  FaListAlt,
  FaRegListAlt,
  FaUserCheck,
  FaUserPlus,
} from "react-icons/fa";
import { Settings, User, BadgePlus } from "lucide-react";
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
     allowsRoles: [UserRole.ADMIN, UserRole.MANAGER],
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
      {
        label: "Tạo mới dịch vụ",
        href: "/dashboard/services/create_service",
        icon: BadgePlus,
        activeIcon: BadgePlus,
      },
    ],
  },
  {
    label: "Quản lý đơn ",
    icon: TbBrandBooking,
    activeIcon: TbBrandBooking,
    isParent: true,
    children: [
      {
        label: "Đơn dọn nhà",
        href: "/dashboard/bookings/booking",
        icon: FaRegListAlt,
        activeIcon: FaListAlt,
      },
      {
        label: "Đơn chưa có nhân viên",
        href: "/dashboard/bookings/exception",
        icon: BadgePlus,
        activeIcon: BadgePlus,
      },
    ],
    // allowsRoles: [UserRole.MANAGER, UserRole.REVIEWER],
  },
  {
    label: "Quản lý thanh toán",
    icon: GrTransaction,
    activeIcon: GrTransaction,
    href: "/dashboard/transactions",
    // allowsRoles: [UserRole.MANAGER, UserRole.REVIEWER],
  },
  {
    label: "Quản lý lịch làm việc",
    icon: FaCalendar,
    activeIcon: FaCalendarCheck,
    isParent: true,
    children: [
      {
        label: "Lịch làm việc",
        href: "/dashboard/schedule/schedule_list",
        icon: FaRegListAlt,
        activeIcon: FaListAlt,
      },
      {
        label: "Tạo ca làm việc",
        href: "/dashboard/schedule/create_shift",
        icon: FaCalendarPlus,
        activeIcon: FaCalendarPlus,
      },
      {
        label: "Tạo tổ",
        href: "/dashboard/schedule/create_team",
        icon: FaUserPlus,
        activeIcon: FaUserPlus,
      },
    ],
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
