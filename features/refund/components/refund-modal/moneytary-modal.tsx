"use client";

import React, { useEffect, useMemo, useState, useTransition } from "react";
import {
  AlertCircle,
  CheckCircle2,
  CircleCheckBig,
  Info,
  Loader,
  MessageCircle,
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
import InfoMoneytaryContent from "./moneytary-children-modal/info-moneytary";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import InspectionMoneytaryContent from "./moneytary-children-modal/inspection-moneytary";
interface MoneytaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
  title?: string;
  description?: string;
  variant?: "success" | "info";
  confirmLabel?: string;
  cancelLabel?: string;
  row: Row<IRefund>;
}

enum STEPS {
  INFO_MONEYTARY = 0,
  INSPECTION_MONEYTARY = 1,
  INPUT_MONEY_REASON = 2,
  CONFIRM_MONEYTARY = 3,
}

const MoneytaryModal: React.FC<MoneytaryModalProps> = ({
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
  const [step, setStep] = useState(STEPS.INFO_MONEYTARY);

  const [isChooseRefund, setIsChooseRefund] = useState(false);

  //   status booing Tracker :   WAITING -> AVAILABLE -> NOTAVAILABLE

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    //     checkWalletTransition(async () => {
    //       const result = await checkWalletMoney(row.original.estimatedAmount);

    //       if (!result.success) {
    //         toast.error(result.error);
    //       } else {
    //     }
    // });
    setStep((value) => value + 1);
  };

  const onSubmit = () => {
    if (step !== STEPS.CONFIRM_MONEYTARY) {
      return onNext();
    }

    // onConfirm();
    // onClose();
  };

  const actionLabel = useMemo(() => {
    switch (step) {
      case STEPS.INFO_MONEYTARY:
        return "Tiến hành kiểm định";

      case STEPS.INPUT_MONEY_REASON:
        return "Tiếp tục";

      case STEPS.CONFIRM_MONEYTARY:
        return "Xác nhận";
      default:
        return ";";
    }
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    return step === STEPS.INFO_MONEYTARY ? undefined : "Quay lại";
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

  let bodyContent = null;

  switch (step) {
    case STEPS.INFO_MONEYTARY:
      bodyContent = (
        <InfoMoneytaryContent
          row={row}
          onBack={onBack}
          onSubmit={onSubmit}
          loading={loading}
          actionLabel={actionLabel}
          secondaryActionLabel={secondaryActionLabel!}
        />
      );
      break;
    case STEPS.INSPECTION_MONEYTARY:
      bodyContent = (
        <InspectionMoneytaryContent
          row={row}
          onBack={onBack}
          onClose = {onClose}
          onSubmit={onSubmit}
          loading={loading}
          actionLabel={actionLabel}
          secondaryActionLabel={secondaryActionLabel!}
          setIsChooseRefund={setIsChooseRefund}
        />
      );
      break;
    case STEPS.INPUT_MONEY_REASON:
      bodyContent = (
        <div>
          {isChooseRefund ? (
            <div>Bồi thường form</div>
          ) : (
            <div>Hoàn tiền form</div>
          )}
        </div>
      );
      break;

    case STEPS.CONFIRM_MONEYTARY:
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
      break;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader className="pt-2 px-6"></DialogHeader>
        {bodyContent}
      </DialogContent>
    </Dialog>
  );
};

export default MoneytaryModal;
