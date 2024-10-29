import {
  AiOutlineClockCircle,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import {
  MdOutlineRateReview,
  MdAssignmentTurnedIn,
  MdOutlineCancel,
} from "react-icons/md";
import {
  FaTruckMoving,
  FaRegHourglass,
  FaRegMoneyBillAlt,
} from "react-icons/fa";
import { GiCheckMark, GiReceiveMoney } from "react-icons/gi";
import { BsBoxSeam, BsFillCalendarCheckFill } from "react-icons/bs";

export enum BookingStatus {
  PENDING = "PENDING",
  DEPOSITING = "DEPOSITING",
  ASSIGNED = "ASSIGNED",
  APPROVED = "APPROVED",
  REVIEWING = "REVIEWING",
  REVIEWED = "REVIEWED",
  COMING = "COMING",
  WAITING = "WAITING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCEL = "CANCEL",
  REFUNDED = "REFUNDED",
}

export const BookingStatusNames = {
  [BookingStatus.PENDING]: "Chờ xử lý",
  [BookingStatus.DEPOSITING]: "Đang đặt cọc",
  [BookingStatus.ASSIGNED]: "Đã phân công",
  [BookingStatus.APPROVED]: "Đã duyệt",
  [BookingStatus.REVIEWING]: "Đang đánh giá",
  [BookingStatus.REVIEWED]: "Đã đánh giá",
  [BookingStatus.COMING]: "Đang đến",
  [BookingStatus.WAITING]: "Đang chờ",
  [BookingStatus.IN_PROGRESS]: "Đang thực hiện",
  [BookingStatus.COMPLETED]: "Hoàn thành",
  [BookingStatus.CANCEL]: "Đã hủy",
  [BookingStatus.REFUNDED]: "Đã hoàn tiền",
};

export const BookingStatusColors = {
  [BookingStatus.PENDING]: "bg-yellow-500 text-yellow-500",
  [BookingStatus.DEPOSITING]: "bg-blue-400 text-blue-400",
  [BookingStatus.ASSIGNED]: "bg-indigo-500 text-indigo-500",
  [BookingStatus.APPROVED]: "bg-green-400 text-green-400",
  [BookingStatus.REVIEWING]: "bg-purple-500 text-purple-500",
  [BookingStatus.REVIEWED]: "bg-purple-600 text-purple-600",
  [BookingStatus.COMING]: "bg-blue-500 text-blue-500",
  [BookingStatus.WAITING]: "bg-orange-500 text-orange-500",
  [BookingStatus.IN_PROGRESS]: "bg-blue-600 text-blue-600",
  [BookingStatus.COMPLETED]: "bg-green-500 text-green-500",
  [BookingStatus.CANCEL]: "bg-red-500 text-red-500",
  [BookingStatus.REFUNDED]: "bg-gray-500 text-gray-500",
};

export const BookingStatusIcons = {
  [BookingStatus.PENDING]: AiOutlineClockCircle,
  [BookingStatus.DEPOSITING]: FaRegMoneyBillAlt,
  [BookingStatus.ASSIGNED]: MdAssignmentTurnedIn,
  [BookingStatus.APPROVED]: GiCheckMark,
  [BookingStatus.REVIEWING]: MdOutlineRateReview,
  [BookingStatus.REVIEWED]: BsFillCalendarCheckFill,
  [BookingStatus.COMING]: FaTruckMoving,
  [BookingStatus.WAITING]: FaRegHourglass,
  [BookingStatus.IN_PROGRESS]: BsBoxSeam,
  [BookingStatus.COMPLETED]: AiOutlineCheckCircle,
  [BookingStatus.CANCEL]: MdOutlineCancel,
  [BookingStatus.REFUNDED]: GiReceiveMoney,
};
