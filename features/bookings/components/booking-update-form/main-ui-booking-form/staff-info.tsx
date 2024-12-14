"use client";
import { Assignment } from "@/features/bookings/types/booking-type";
import { useGetUserById } from "@/features/users/react-query/query";
import React, { useState, useTransition } from "react";
import {
  MessageCircle,
  Phone,
  Star,
  User,
  UserPlus,
  CheckCircle,
  Clock,
  Package,
  Truck,
  LoaderCircle,
  XCircle,
  MapPin,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";
import { useSession } from "next-auth/react";
import { useGetOrCreateStaffConversation } from "@/features/chat-realtime/react-query/query";
import AlertModal from "@/components/modals/alert-modal";
import { toast } from "sonner";
import { assignStaffToBooking } from "@/features/bookings/action/assignments";
import Image from "next/image";

type StaffType = "DRIVER" | "PORTER" | "REVIEWER";

interface StaffInfoProps {
  assignment: Assignment;
  groupedAssignments: Record<StaffType, any[]>;
}
const getStatusDetails = (status: string) => {
  switch (status?.toUpperCase()) {
    case "WAITING":
      return {
        icon: <Clock className="w-4 h-4 mr-1 text-gray-500" />,
        text: "Chờ xử lý",
        color: "bg-gray-100 text-gray-700",
      };
    case "ASSIGNED":
      return {
        icon: <CheckCircle className="w-4 h-4 mr-1 text-gray-500" />,
        text: "Được gán",
        color: "bg-gray-100 text-gray-700",
      };
    case "INCOMING":
      return {
        icon: <Clock className="w-4 h-4 mr-1 text-blue-500" />,
        text: "Đang đến",
        color: "bg-gray-100 text-gray-700",
      };
    case "PACKING":
      return {
        icon: <Package className="w-4 h-4 mr-1 text-purple-500" />,
        text: "Đang đóng gói",
        color: "bg-gray-100 text-gray-700",
      };
    case "ONGOING":
      return {
        icon: <Truck className="w-4 h-4 mr-1 text-blue-500" />,
        text: "Đang vận chuyển",
        color: "bg-gray-100 text-gray-700",
      };
    case "DELIVERED":
      return {
        icon: <CheckCircle className="w-4 h-4 mr-1 text-gray-500" />,
        text: "Đã giao hàng",
        color: "bg-gray-100 text-gray-700",
      };
    case "UNLOADED":
      return {
        icon: <Package className="w-4 h-4 mr-1 text-orange-500" />,
        text: "Đã dỡ hàng",
        color: "bg-gray-100 text-gray-700",
      };
    case "IN_PROGRESS":
      return {
        icon: <LoaderCircle className="w-4 h-4 mr-1 text-blue-500" />,
        text: "Đang thực hiện",
        color: "bg-gray-100 text-gray-700",
      };
    case "FAILED":
      return {
        icon: <XCircle className="w-4 h-4 mr-1 text-red-500" />,
        text: "Có sự cố",
        color: "bg-red-100 text-red-700",
      };
    case "ARRIVED":
      return {
        icon: <MapPin className="w-4 h-4 mr-1 text-green-500" />,
        text: "Đã đến nơi",
        color: "bg-gray-100 text-gray-700",
      };
    case "COMPLETED":
      return {
        icon: <CheckCircle className="w-4 h-4 mr-1 text-green-500" />,
        text: "Hoàn thành",
        color: "bg-gray-100 text-gray-700",
      };
    default:
      return {};
  }
};
const canAssignResponsible = (
  staffType: StaffType,
  groupedAssignments: Record<StaffType, any[]>
) => {
  const assignments = groupedAssignments[staffType];
  return !assignments.some((assignment) => assignment.isResponsible);
};

const isAssignmentEligible = (assignment: Assignment) => {
  return (
    (assignment.staffType === "DRIVER" || assignment.staffType === "PORTER") &&
    assignment.status?.toUpperCase() !== "FAILED" &&
    !assignment.isResponsible
  );
};

const StaffInfo = ({ assignment, groupedAssignments }: StaffInfoProps) => {
  const { data, isLoading } = useGetUserById(assignment.userId?.toString()!);
  const user = data?.data;
  const { onOpen } = useModal();
  const { data: session } = useSession();

  const [isPending, startTransition] = useTransition();
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const currentUser =
    session?.user.id === user?.id &&
    session?.user.roleName.toUpperCase() == "REVIEWER";

  const { mutateAsync: getOrCreateConversation } =
    useGetOrCreateStaffConversation(
      session?.user.id.toString()!,
      session?.user.roleName.toLowerCase()!,
      user?.id.toString()!,
      user?.roleName?.toLowerCase()!
    );

  if (isLoading) return <div className="text-gray-500">Đang tải...</div>;
  if (!user)
    return <div className="text-gray-500">Không tìm thấy nhân viên</div>;

  const isAssignmentAllowed =
    isAssignmentEligible(assignment) &&
    canAssignResponsible(assignment.staffType as StaffType, groupedAssignments);

  const isCanChat =
    assignment.staffType === "DRIVER" || assignment.staffType === "PORTER";

  const handleAssignReponsibility = async () => {
    try {
      setLoading(true);
      startTransition(async () => {
        const result = await assignStaffToBooking(assignment.id?.toString()!);
        if (!result.success) {
          toast.error(result.error);
          return;
        }
        toast.success("Xác nhận đánh giá thành công!");
      });
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi xác nhận gán assignement");
    } finally {
      setLoading(false);
      setOpenUpdateModal(false);
    }
  };

  const handleContact = () => {
    getOrCreateConversation();

    onOpen("chatWithStaffModal", { user: user });
  };

  return (
    <>
      <AlertModal
        isOpen={openUpdateModal}
        onClose={() => setOpenUpdateModal(false)}
        onConfirm={handleAssignReponsibility}
        loading={isPending}
        title="Gán người chịu trách nhiệm"
        description="Bạn có chắc chắn muốn cập nhật trạng thái này?"
      />
      <div className="flex items-center space-x-3">
        {user.avatarUrl ? (
          <Image
            width={40}
            height={40}
            src={user.avatarUrl}
            alt={user.name}
            className="rounded-full"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="w-6 h-6 text-gray-500" />
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center">
            <span className="font-semibold mr-2">{user.name}</span>
            {assignment.isResponsible && (
              <Star className="w-4 h-4 text-yellow-500" />
            )}
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Phone className="w-4 h-4 mr-1" />
            {user.phone || "Chưa cập nhật"}
          </div>
          {/* Status Display */}
          <div className="flex items-center mt-1">
            {getStatusDetails(assignment.status!).icon}
            <span
              className={`text-xs px-2 py-0.5 rounded ${
                getStatusDetails(assignment.status!).color
              }`}
            >
              {getStatusDetails(assignment.status!).text}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2 mt-2">
        {isAssignmentAllowed && !assignment.isResponsible && (
          <Button
            variant="outline"
            size="sm"
            type="button"
            // onClick={handleAssignReponsibility}
            onClick={() => setOpenUpdateModal(true)}
            className="flex items-center"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            {isPending ? "Đang xử lý..." : "Gán trách nhiệm"}
          </Button>
        )}
        {isCanChat && (
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={handleContact}
            className="flex items-center"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Chat
          </Button>
        )}
      </div>
    </>
  );
};

export default StaffInfo;
