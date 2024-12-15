"use client";

import React, { useEffect, useMemo, useState, useTransition } from "react";
import { AlertCircle, CheckCircle2, CircleCheckBig } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BsPatchQuestion } from "react-icons/bs";
import { IRefund } from "../../types/refund-type";
import { Row } from "@tanstack/react-table";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { checkWalletMoney } from "@/features/transactions/action/wallet";
import { toast } from "sonner";
import InfoMoneytaryContent from "./moneytary-children-modal/info-moneytary";
import InspectionMoneytaryContent from "./moneytary-children-modal/inspection-moneytary";
import { moneytaryMoney } from "../../actions/refund";
import FailedReasonForm from "./moneytary-children-modal/failed-form";
import { Input } from "@/components/ui/input";
import { FileUpload } from "@/components/image-uploadthing/file-upload";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CurrencyInput } from "@/components/form/currency-input";
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
  confirmLabel = "Xác nhận",
  cancelLabel = "Hủy",
  row,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [step, setStep] = useState(STEPS.INFO_MONEYTARY);
  const [isPending, startTransition] = useTransition();
  const [checkWalletIsPending, checkWalletTransition] = useTransition();

  const [isChooseRefund, setIsChooseRefund] = useState(false);
  const [failedReason, setFailedReason] = useState<string>("");
  const [error, setError] = useState("");
  const [refundOption, setRefundOption] = useState<"Wallet" | "Other">(
    "Wallet"
  );

  let isMaximumWithoutInsurance = null;

  const moneytarySchema = z.object({
    realAmount: z.number(),
    image: z.string().nullable(),
  });

  const form = useForm<z.infer<typeof moneytarySchema>>({
    resolver: zodResolver(moneytarySchema),
    defaultValues: {
      realAmount: 0,
      image: "",
    },
  });

  const { watch, setValue, formState } = form;
  const realAmount = watch("realAmount");
  const image = watch("image");
  const { errors } = formState;
  if (!row.original.isInsurance) {
    isMaximumWithoutInsurance = 20000000;
  }
  const isRealAmountInvalid =
    (isMaximumWithoutInsurance && realAmount > isMaximumWithoutInsurance) ||
    !!errors.realAmount;

  useEffect(() => {
    if (isRealAmountInvalid) {
      setError("Số tiền không khả dụng");
    }
  }, [isRealAmountInvalid]);

  const onBack = () => {
    setStep((value) => value - 1);
    setError("");
  };

  const onNext = () => {
    if (refundOption === "Wallet") {
      checkWalletTransition(async () => {
        const result = await checkWalletMoney(realAmount);

        if (!result.success) {
          toast.error(result.error);
        } else {
          setStep((value) => value + 1);
        }
      });
    } else {
      setStep((value) => value + 1);
    }
  };

  const onSubmit = () => {
    if (step !== STEPS.CONFIRM_MONEYTARY) {
      return onNext();
    }

    if (isChooseRefund) {
      if (refundOption === "Wallet") {
        const dataToSend = {
          isCompensation: isChooseRefund,
          realAmount: realAmount,
          paymentMethod: refundOption,
        };

        startTransition(async () => {
          const result = await moneytaryMoney(
            dataToSend,
            row.original.id.toString()
          );
          if (!result.success) {
            toast.error(result.error);
          } else {
            toast.success("Xác nhận thành công.");
            form.reset();
            onClose();
          }
        });
      } else if (refundOption === "Other") {
        const dataToSend = {
          isCompensation: isChooseRefund,
          realAmount: realAmount,
          paymentMethod: refundOption,
          resourceList: [
            {
              type: "CONFIRM",
              resourceUrl: image,
              resourceCode: "code",
            },
          ],
        };
        startTransition(async () => {
          const result = await moneytaryMoney(
            dataToSend,
            row.original.id.toString()
          );
          if (!result.success) {
            toast.error(result.error);
          } else {
            toast.success("Xác nhận thành công.");
            form.reset();
            onClose();
          }
        });
      }
    } else {
      startTransition(async () => {
        const dataToSend = {
          failedReason: failedReason,
          isCompensation: isChooseRefund,
        };

        const result = await moneytaryMoney(
          dataToSend,
          row.original.id.toString()
        );
        if (!result.success) {
          toast.error(result.error);
        } else {
          toast.success("Xác nhận thành công.");
          onClose();
        }
      });
    }

    onConfirm();
    setStep(0);
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
        return "";
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
          onClose={onClose}
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
            <div className="p-8 rounded-xl shadow-lg bg-white dark:bg-muted/40 border border-gray-200 dark:border-gray-700">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                  Bồi thường khách hàng
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Nhập thông tin bồi thường và cách xử lý
                </p>
              </div>

              <div className="space-y-6">
                <Form {...form}>
                  <form className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Cách bồi thường
                      </label>
                      <Select
                        defaultValue={refundOption}
                        value={refundOption}
                        onValueChange={(option) =>
                          setRefundOption(option as "Wallet" | "Other")
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Chọn cách bồi thường" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Wallet">
                            <span className="flex items-center">
                              <CircleCheckBig className="w-5 h-5 mr-2 text-green-500" />
                              Ví của hệ thống
                            </span>
                          </SelectItem>
                          <SelectItem value="Other">
                            <span className="flex items-center">
                              <AlertCircle className="w-5 h-5 mr-2 text-yellow-500" />
                              Cách khác
                            </span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Real Amount Input */}
                    <div>
                      <FormField
                        control={form.control}
                        name="realAmount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nhập số tiền bồi thường</FormLabel>
                            <FormControl>
                              <CurrencyInput
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="Nhập số tiền"
                              />
                            </FormControl>
                            <FormMessage className="text-red-500">
                              {error}
                            </FormMessage>
                          </FormItem>
                        )}
                      />
                    </div>

                    {refundOption === "Other" && (
                      <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel> Tải lên file chứng minh</FormLabel>
                            <FormControl>
                              <FileUpload
                                endpoint="serverImage"
                                value={field.value!}
                                onChange={field.onChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </form>
                </Form>
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                {secondaryActionLabel && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      onBack();
                      form.reset();
                    }}
                    className="text-gray-600 dark:text-gray-300"
                    disabled={loading}
                  >
                    {secondaryActionLabel}
                  </Button>
                )}
                <Button
                  onClick={onSubmit}
                  disabled={loading || isRealAmountInvalid}
                >
                  {actionLabel}
                </Button>
              </div>
            </div>
          ) : (
            <FailedReasonForm
              onBack={onBack}
              onSubmit={onSubmit}
              setFailedReason={setFailedReason}
              failedReason={failedReason}
              loading={loading}
              actionLabel={actionLabel}
              secondaryActionLabel={secondaryActionLabel!}
            />
          )}
        </div>
      );
      break;

    case STEPS.CONFIRM_MONEYTARY:
      bodyContent = (
        <div>
          {isChooseRefund ? (
            <div className="flex flex-col bg-white dark:bg-gray-900 rounded-lg shadow-2xl items-center p-6 text-center border">
              {icon}
              <h2 className="mt-4 text-xl font-semibold ">{title}</h2>
              <p className="mt-2 text-sm ">
                Số tiền bồi thường cho khách: {realAmount}
              </p>
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
          ) : (
            <div className="flex flex-col bg-white dark:bg-gray-900 rounded-lg shadow-2xl items-center p-6 text-center border">
              <BsPatchQuestion className="w-12 h-12 text-amber-500" />
              <h2 className="mt-4 text-xl font-semibold ">{title}</h2>
              <p className="mt-2 text-sm ">
                Lý do từ chối của bạn là:{" "}
                {failedReason || "Không có lý do được cung cấp"}
              </p>
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
                  className={`min-w-[100px] bg-amber-600 hover:bg-amber-700 text-white `}
                >
                  {confirmLabel}
                </Button>
              </div>
            </div>
          )}
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
