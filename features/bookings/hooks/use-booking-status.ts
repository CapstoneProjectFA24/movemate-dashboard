import { useMemo } from "react";
import { IBooking } from "../type/booking-type";

export enum BookingStatus {
  // Main booking flow states
  PENDING = "PENDING",
  ASSIGNED = "ASSIGNED",
  WAITING = "WAITING",
  DEPOSITING = "DEPOSITING",
  REVIEWING = "REVIEWING",
  REVIEWED = "REVIEWED",
  COMING = "COMING",
  CANCEL = "CANCEL",
  REFUNDED = "REFUNDED",
  
  // Additional states from second diagram
  IN_PROGRESS = "IN_PROGRESS",
  IN_TRANSIT = "IN_TRANSIT",
  DELIVERED = "DELIVERED",
  UNLOADED = "UNLOADED",
  COMPLETED = "COMPLETED"
}

export enum BookingStateAssign {
  // Staff assignment states
  WAITING = "WAITING",
  ASSIGNED = "ASSIGNED",
  ENROUTE = "ENROUTE",
  ARRIVED = "ARRIVED",
  IN_PROGRESS = "IN_PROGRESS",
  
  // Transportation states
  IN_TRANSIT = "IN_TRANSIT",
  DELIVERED = "DELIVERED",
  UNLOADED = "UNLOADED",
  
  // Review states
  SUGGESTED = "SUGGESTED",
  REVIEWED = "REVIEWED",
  
  // Final states
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED"
}

interface UseBookingStatusReturn {
  statusMessage: string;
  canReviewOffline: boolean;
  canReviewOnline: boolean;
  isWaitingForPayment: boolean;
  isStaffEnroute: boolean;
  isStaffArrived: boolean;
  isReviewed: boolean;
  isInProgress: boolean;
  isInTransit: boolean;
  isDelivered: boolean;
  isCompleted: boolean;
  isSuggested: boolean; 
}

export const useBookingStatus = (
  booking: IBooking | null
): UseBookingStatusReturn => {
  return useMemo(() => {
    if (!booking) {
      return {
        statusMessage: "",
        canReviewOffline: false,
        canReviewOnline: false,
        isWaitingForPayment: false,
        isStaffEnroute: false,
        isStaffArrived: false,
        isReviewed: false,
        isInProgress: false,
        isInTransit: false,
        isDelivered: false,
        isCompleted: false,
        isSuggested: false 
      };
    }

    const assignments = booking.assignments || [];
    const status = booking.status || BookingStatus.PENDING;
    const isReviewOnline = booking.isReviewOnline!;

    // Check for offline reviewer assignment
    const hasReviewer = assignments.some(
      (assignment) =>
        assignment.status === BookingStateAssign.SUGGESTED &&
        assignment.staffType === "REVIEWER"
    );

    // Check if any assignment is in SUGGESTED state
    const isSuggested = assignments.some(
      (assignment) => assignment.status === BookingStateAssign.SUGGESTED
    );

    // Determine review capabilities
    const canReviewOffline =
      hasReviewer &&
      (status === BookingStatus.REVIEWING && !isReviewOnline);

    const canReviewOnline =
      isReviewOnline && status === BookingStatus.REVIEWING;
     
    // Check staff status
    const isStaffEnroute =
      assignments.some((a) => a.status === BookingStateAssign.ENROUTE);

    const isStaffArrived =
      assignments.some((a) => a.status === BookingStateAssign.ARRIVED);

    // Check delivery status
    const isInProgress = 
      assignments.some((a) => a.status === BookingStateAssign.IN_PROGRESS);

    const isInTransit =
      status === BookingStatus.IN_TRANSIT ||
      assignments.some((a) => a.status === BookingStateAssign.IN_TRANSIT);

    const isDelivered =
      assignments.some((a) => a.status === BookingStateAssign.DELIVERED);

    const isCompleted = 
      status === BookingStatus.COMPLETED ||
      assignments.some((a) => a.status === BookingStateAssign.COMPLETED);

    // Determine status message
    let statusMessage = "";
    switch (status) {
      case BookingStatus.PENDING:
        statusMessage = "Chờ xác nhận";
        break;
      case BookingStatus.DEPOSITING:
        statusMessage = "Chờ khách hàng thanh toán";
        break;
      case BookingStatus.ASSIGNED:
        statusMessage = canReviewOffline 
          ? "Chờ bạn xếp lịch với khách hàng"
          : "Đã được phân công";
        break;
      case BookingStatus.WAITING:
        statusMessage = "Đang chờ khách hàng chấp nhận lịch";
        break;
      case BookingStatus.REVIEWING:
        if (isStaffEnroute) {
          statusMessage = "Nhân viên đang di chuyển";
        } else if (isStaffArrived) {
          statusMessage = "Nhân viên đã đến";
        } else {
          statusMessage = "Đang đợi bạn đánh giá";
        }
        break;
      case BookingStatus.REVIEWED:
        statusMessage = "Đã đánh giá xong";
        break;
      case BookingStatus.IN_PROGRESS:
        statusMessage = "Đang thực hiện";
        break;
      case BookingStatus.IN_TRANSIT:
        statusMessage = "Đang vận chuyển";
        break;
      case BookingStatus.DELIVERED:
        statusMessage = "Đã giao hàng";
        break;
      case BookingStatus.COMPLETED:
        statusMessage = "Hoàn thành";
        break;
      case BookingStatus.CANCEL:
        statusMessage = "Đã hủy";
        break;
      case BookingStatus.REFUNDED:
        statusMessage = "Đã hoàn tiền";
        break;
      default:
        statusMessage = "Không xác định";
    }

    return {
      statusMessage,
      canReviewOffline,
      canReviewOnline,
      isWaitingForPayment: status === BookingStatus.DEPOSITING,
      isStaffEnroute,
      isStaffArrived,
      isReviewed: status === BookingStatus.REVIEWED,
      isInProgress,
      isInTransit,
      isDelivered,
      isCompleted,
      isSuggested 
    };
  }, [booking]);
};