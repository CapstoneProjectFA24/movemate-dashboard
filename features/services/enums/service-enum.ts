import {
  MdBuildCircle,
  MdLocalShipping,
  MdPerson,
  MdSystemUpdateAlt,
} from "react-icons/md";

export enum ServiceType {
  SYSTEM = "SYSTEM",
  DISASSEMBLE = "DISASSEMBLE",
  PORTER = "PORTER",
  TRUCK = "TRUCK",
  INSURANCE = "INSURANCE"
}
import { FaUserShield } from "react-icons/fa6";
export const ServiceTypeNames = {
  [ServiceType.SYSTEM]: "Hệ thống",
  [ServiceType.DISASSEMBLE]: "Tháo lắp",
  [ServiceType.PORTER]: "Nhân công",
  [ServiceType.TRUCK]: "Vận chuyển",
  [ServiceType.INSURANCE]: "Bảo hiểm",
};

export const ServiceTypeIcons = {
  [ServiceType.SYSTEM]: MdSystemUpdateAlt,
  [ServiceType.DISASSEMBLE]: MdBuildCircle,
  [ServiceType.PORTER]: MdPerson,
  [ServiceType.TRUCK]: MdLocalShipping,
  [ServiceType.INSURANCE]: FaUserShield,
};
