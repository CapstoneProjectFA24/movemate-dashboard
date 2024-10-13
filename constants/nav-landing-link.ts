import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";
import {
  GoCheckCircle,
  GoCheckCircleFill,
  GoHome,
  GoHomeFill,
  
} from "react-icons/go";
import { FaUserEdit } from "react-icons/fa";
import { GrServices } from "react-icons/gr";
import { RiPriceTag2Fill } from "react-icons/ri";
import { IoMdContacts } from "react-icons/io";

interface Route {
  label: string;
  icon?: LucideIcon | IconType;
  activeIcon?: LucideIcon | IconType;
  href?: string;
}

export const links: Route[] = [
  {
    label: "Về chúng tôi",
    icon: FaUserEdit,
    activeIcon: FaUserEdit,
    href: "/about",
  },
  {
    label: "Dịch vụ",
    icon: GrServices,
    activeIcon: GrServices,
    href: "/services",
  },
  {
    label: "Bảng giá",
    icon: RiPriceTag2Fill,
    activeIcon: RiPriceTag2Fill,
    href: "/prices",
  },
  {
    label: "Liên hệ",
    href: "/contact",
    icon:IoMdContacts,
  },
];
