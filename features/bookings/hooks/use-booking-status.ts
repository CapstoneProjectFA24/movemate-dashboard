import { useMemo } from "react";
import { IBooking } from "../types/booking-type";

export enum BookingStatus {
  PENDING = "PENDING",
  ASSIGNED = "ASSIGNED",
  WAITING = "WAITING",
  DEPOSITING = "DEPOSITING",
  REVIEWING = "REVIEWING",
  REVIEWED = "REVIEWED",
  COMING = "COMING",
  IN_PROGRESS = "IN_PROGRESS",
  IN_TRANSIT = "IN_TRANSIT",
  DELIVERED = "DELIVERED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED",
  CONFIRMED = "CONFIRMED",
}

export enum AssignmentStatus {
  ASSIGNED = "ASSIGNED",
  INCOMING = "INCOMING",
  ARRIVED = "ARRIVED",
  REVIEWING = "REVIEWING",
  SUGGESTED = "SUGGESTED",
  REVIEWED = "REVIEWED",
  IN_PROGRESS = "IN_PROGRESS",
  PACKING = "PACKING",
  IN_TRANSIT = "IN_TRANSIT",
  ONGOING = "ONGOING",
  WAITING = "WAITING",
  UNLOADED = "UNLOADED",
  DELIVERED = "DELIVERED",
  COMPLETED = "COMPLETED",
}

interface Assignment {
  staffType: string;
  status: AssignmentStatus;
}

interface BookingStatusResult {
  statusMessage: string;
  canReviewOffline: boolean;
  canReviewOnline: boolean;
  canCreateSchedule: boolean;
  canConfirmReview: boolean;
  canUpdateServices: boolean;
  canConfirmArrival: boolean;
  canConfirmMoving: boolean;
  canConfirmSuggestion: boolean;
  isWaitingCustomer: boolean;
  isWaitingPayment: boolean;
  isStaffEnroute: boolean;
  isStaffArrived: boolean;
  isSuggested: boolean;
  isReviewed: boolean;
  isInProgress: boolean;
  isInTransit: boolean;
  isDelivered: boolean;
  isCompleted: boolean;
}

export const useBookingStatus = (
  booking: IBooking | null
): BookingStatusResult => {
  return useMemo(() => {
    if (!booking) {
      return {
        statusMessage: "",
        canReviewOffline: false,
        canReviewOnline: false,
        canCreateSchedule: false,
        canConfirmReview: false,
        canUpdateServices: false,
        canConfirmArrival: false,
        canConfirmMoving: false,
        canConfirmSuggestion: false,
        isWaitingCustomer: false,
        isWaitingPayment: false,
        isStaffEnroute: false,
        isStaffArrived: false,
        isSuggested: false,
        isReviewed: false,
        isInProgress: false,
        isInTransit: false,
        isDelivered: false,
        isCompleted: false,
      };
    }

    const status = booking.status;
    const assignments = booking.assignments || [];
    const isReviewOnline = booking.isReviewOnline ?? false;

    const hasAssignmentWithStatus = (
      staffType: string,
      status: AssignmentStatus
    ): boolean =>
      assignments.some((a) => a.staffType === staffType && a.status === status);

    const isStaffEnroute = hasAssignmentWithStatus(
      "REVIEWER",
      AssignmentStatus.INCOMING
    );
    const isStaffArrived = hasAssignmentWithStatus(
      "REVIEWER",
      AssignmentStatus.ARRIVED
    );
    const isSuggested = hasAssignmentWithStatus(
      "REVIEWER",
      AssignmentStatus.SUGGESTED
    );

    // Driver states
    const isDriverWaiting = hasAssignmentWithStatus(
      "DRIVER",
      AssignmentStatus.WAITING
    );
    const isDriverAssigned = hasAssignmentWithStatus(
      "DRIVER",
      AssignmentStatus.ASSIGNED
    );
    const isDriverIncoming = hasAssignmentWithStatus(
      "DRIVER",
      AssignmentStatus.INCOMING
    );
    const isDriverArrived = hasAssignmentWithStatus(
      "DRIVER",
      AssignmentStatus.ARRIVED
    );
    const isDriverInProgress = hasAssignmentWithStatus(
      "DRIVER",
      AssignmentStatus.IN_PROGRESS
    );
    const isDriverCompleted = hasAssignmentWithStatus(
      "DRIVER",
      AssignmentStatus.COMPLETED
    );

    // Porter states
    const isPorterWaiting = hasAssignmentWithStatus(
      "PORTER",
      AssignmentStatus.WAITING
    );
    const isPorterAssigned = hasAssignmentWithStatus(
      "PORTER",
      AssignmentStatus.ASSIGNED
    );
    const isPorterIncoming = hasAssignmentWithStatus(
      "PORTER",
      AssignmentStatus.INCOMING
    );
    const isPorterArrived = hasAssignmentWithStatus(
      "PORTER",
      AssignmentStatus.ARRIVED
    );
    const isPorterInProgress = hasAssignmentWithStatus(
      "PORTER",
      AssignmentStatus.IN_PROGRESS
    );
    const isPorterPacking = hasAssignmentWithStatus(
      "PORTER",
      AssignmentStatus.PACKING
    );
    const isPorterOngoing = hasAssignmentWithStatus(
      "PORTER",
      AssignmentStatus.ONGOING
    );
    const isPorterDelivered = hasAssignmentWithStatus(
      "PORTER",
      AssignmentStatus.DELIVERED
    );
    const isPorterUnloaded = hasAssignmentWithStatus(
      "PORTER",
      AssignmentStatus.UNLOADED
    );
    const isPorterCompleted = hasAssignmentWithStatus(
      "PORTER",
      AssignmentStatus.COMPLETED
    );

    let canReviewOffline = false;
    let canReviewOnline = false;
    let canCreateSchedule = false;
    let canConfirmReview = false;
    let canUpdateServices = false;
    let canConfirmArrival = false;
    let canConfirmMoving = false;
    let canConfirmSuggestion = status !== BookingStatus.REVIEWED;

    if (!isReviewOnline) {
      switch (status) {
        case BookingStatus.ASSIGNED:
          canCreateSchedule = true;
          break;
        case BookingStatus.REVIEWING:
          if (!isStaffEnroute && !isStaffArrived && !isSuggested) {
            canConfirmMoving = true;
          } else if (isStaffEnroute && !isStaffArrived) {
            canConfirmArrival = true;
          } else if (isStaffArrived || isSuggested) {
            canUpdateServices = true;
          }
          break;
      }
    } else {
      switch (status) {
        case BookingStatus.ASSIGNED:
          canConfirmReview = true;
          break;
        case BookingStatus.REVIEWING:
          canUpdateServices = true;
          break;
      }
    }

    let statusMessage = "";
    switch (status) {
      case BookingStatus.PENDING:
        statusMessage = "Chờ xác nhận";
        break;
      case BookingStatus.ASSIGNED:
        statusMessage = canCreateSchedule
          ? "Chờ bạn xếp lịch với khách hàng"
          : "Đã được phân công";
        break;
      case BookingStatus.WAITING:
        statusMessage = "Đang chờ khách hàng chấp nhận lịch";
        break;
      case BookingStatus.DEPOSITING:
        statusMessage = "Chờ khách hàng thanh toán";
        break;
      case BookingStatus.REVIEWING:
        if (isStaffEnroute) {
          statusMessage = "Nhân viên đang di chuyển";
        } else if (isStaffArrived) {
          statusMessage = "Nhân viên đã đến";
        } else if (isSuggested) {
          statusMessage = "Đang chờ đề xuất cập nhật";
        } else {
          statusMessage = "Đang đợi đánh giá";
        }
        break;
      case BookingStatus.REVIEWED:
        statusMessage = "Đã đánh giá xong";
        break;
      case BookingStatus.COMING:
        if (!isDriverAssigned && !isPorterAssigned) {
          statusMessage = "Chờ phân công nhân viên vận chuyển";
        } else if (isDriverAssigned && !isPorterAssigned) {
          statusMessage = "Đã phân công tài xế - Chờ phân công porter";
        } else if (!isDriverAssigned && isPorterAssigned) {
          statusMessage = "Đã phân công porter - Chờ phân công tài xế";
        } else {
          statusMessage = "Đã phân công đầy đủ nhân viên vận chuyển";
        }
        break;

      case BookingStatus.IN_PROGRESS:
        statusMessage = "Đang trong quá trình vận chuyển";
        break;

      case BookingStatus.DELIVERED:
        statusMessage = "Đã giao hàng";
        break;
      case BookingStatus.COMPLETED:
        statusMessage = "Đã hoàn thành toàn bộ quy trình";
        break;
      case BookingStatus.CANCELLED:
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
      canCreateSchedule,
      canConfirmReview,
      canUpdateServices,
      canConfirmArrival,
      canConfirmMoving,
      canConfirmSuggestion,
      isWaitingCustomer: status === BookingStatus.WAITING,
      isWaitingPayment: status === BookingStatus.DEPOSITING,
      isStaffEnroute,
      isStaffArrived,
      isSuggested,
      isReviewed: status === BookingStatus.REVIEWED,
      isInProgress: status === BookingStatus.IN_PROGRESS,
      isInTransit: status === BookingStatus.IN_TRANSIT,
      isDelivered: status === BookingStatus.DELIVERED,
      isCompleted: status === BookingStatus.COMPLETED,
    };
  }, [booking]);
};
