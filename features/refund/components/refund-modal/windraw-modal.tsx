"use client";

import React, { useEffect, useMemo, useState, useTransition } from "react";
import {
  AlertCircle,
  CheckCircle2,
  CircleCheckBig,
  Loader,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { BsPatchQuestion } from "react-icons/bs";
import { IRefund } from "../../types/refund-type";
import { Row } from "@tanstack/react-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatter } from "@/lib/utils";
import { checkWalletMoney } from "@/features/transactions/action/wallet";
import { toast } from "sonner";
import { IWindraw } from "../../types/windraw-type";
import { useGetUserById } from "@/features/users/react-query/query";

interface WidthDrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
  title?: string;
  description?: string;
  variant?: "success" | "info";
  confirmLabel?: string;
  cancelLabel?: string;
  row: Row<IWindraw>;
}

enum STEPS {
  INFO_REFUND = 0,
  CONFIRM_REFUND = 1,
}

const WidthDrawModal: React.FC<WidthDrawModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading = false,
  title = "Xác nhận",
  description = "Bạn có chắc chắn muốn thực hiện hành động này?",
  variant = "warning",
  confirmLabel = "Tiếp tục",
  cancelLabel = "Hủy",
  row,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [step, setStep] = useState(STEPS.INFO_REFUND);
  const [checkWalletIsPending, checkWalletTransition] = useTransition();

  const { data: userData, isLoading: userIsLoading } = useGetUserById(
    row.original.userId.toString()
  );

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    checkWalletTransition(async () => {
      const result = await checkWalletMoney(row.original.amount);

      if (!result.success) {
        toast.error(result.error);
      } else {
        setStep((value) => value + 1);
      }
    });
  };

  const onSubmit = () => {
    if (step !== STEPS.CONFIRM_REFUND) {
      return onNext();
    }

    onConfirm();
    onClose();
  };

  const actionLabel = useMemo(() => {
    switch (step) {
      case STEPS.INFO_REFUND:
        return "Tiếp tục để xác nhận rút tiền";

      case STEPS.CONFIRM_REFUND:
        return "Xác nhận";
      default:
        return ";";
    }
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    return step === STEPS.INFO_REFUND ? undefined : "Quay lại";
  }, [step]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return {
          icon: <CheckCircle2 className="w-12 h-12 text-green-500" />,
          confirmButtonClass: "bg-green-600 hover:bg-green-700 text-white",
        };

      default:
        return {
          icon: <BsPatchQuestion className="w-12 h-12 text-amber-500" />,
          confirmButtonClass: "bg-amber-600 hover:bg-amber-700 text-white",
          modalBgClass: "bg-blue-100",
          modalTextClass: "text-blue-700",
        };
    }
  };

  const { icon, confirmButtonClass } = getVariantStyles();

  let bodyContent = (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-2xl border">
      <div className="text-center border-b border-gray-300 pb-4 mb-4">
        <h3 className="text-xl font-bold text-gray-700 dark:text-gray-200">
          HÓA ĐƠN RÚT TIỀN
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Mã đơn yêu cầu: {row.original.id}
        </p>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-gray-600 dark:text-gray-300 mb-2">
          Thông tin khách hàng
        </h4>
        <div className="text-sm text-gray-700 dark:text-gray-400 space-y-1">
          <p>
            <span className="font-medium">Tên:</span> {userData?.data?.name}
          </p>
          <p>
            <span className="font-medium">Email:</span> {userData?.data?.email}
          </p>
          <p>
            <span className="font-medium">Tên ngân hàng:</span>{" "}
            {row.original.bankName}
          </p>
          <p>
            <span className="font-medium">Số thẻ:</span>{" "}
            {row.original.bankNumber}
          </p>
          <p>
            <span className="font-medium">Số điện thoại:</span>{" "}
            {userData?.data?.phone}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-gray-600 dark:text-gray-300 mb-2">
          Thông tin rút tiền
        </h4>
        <div className="text-sm text-gray-700 dark:text-gray-400">
          <p>
            Số tiền cần rút:{" "}
            <span className="font-medium text-green-500">
              {formatter.format(row.original.amount)}
            </span>
          </p>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-gray-600 dark:text-gray-300 mb-2">
          Thông tin đơn
        </h4>
        <div className="text-sm text-gray-700 dark:text-gray-400 space-y-1">
          <p>
            <span className="font-medium">Thời gian tạo:</span>{" "}
            {row.original.date}
          </p>
          <p>
            <span className="font-medium">Tổng tiền:</span>{" "}
            {formatter.format(row.original.amount)}
          </p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-300">
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          <div className="flex justify-center items-center p-2 gap-2">
            <CircleCheckBig className="h-4 w-4 text-green-500" />
            Đơn rút tiền hợp lệ vui lòng tiếp tục để xác nhận
          </div>
        </p>
      </div>

      <div className="flex items-center justify-end mt-4 space-x-3">
        {secondaryActionLabel && (
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={loading}
          >
            {secondaryActionLabel}
          </Button>
        )}
        <Button
          type="submit"
          className={`min-w-[100px] ${confirmButtonClass}`}
          onClick={onSubmit}
          disabled={loading}
        >
          {checkWalletIsPending ? (
            <div className="flex items-center justify-center gap-2">
              <Loader className="h-5 w-5 animate-spin text-white" />
              Đang kiểm tra ví
            </div>
          ) : (
            actionLabel
          )}
        </Button>
      </div>
    </div>
  );

  if (step === STEPS.CONFIRM_REFUND) {
    bodyContent = (
      <div className="flex flex-col bg-white dark:bg-gray-900 rounded-lg shadow-2xl items-center p-6 text-center border">
        {icon}
        <h2 className="mt-4 text-xl font-semibold ">{title}</h2>
        <p className="mt-2 text-sm ">{description}</p>

        <div className="mt-8 w-full space-x-3 flex items-center justify-center">
          {secondaryActionLabel && (
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              disabled={loading}
            >
              {secondaryActionLabel}
            </Button>
          )}
          <Button
            disabled={loading}
            onClick={onSubmit}
            className={`min-w-[100px] ${confirmButtonClass}`}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="pt-2 px-6"></DialogHeader>
        {bodyContent}
      </DialogContent>
    </Dialog>
  );
};

export default WidthDrawModal;
