"use client";

import { Button } from "@/components/ui/button";
import { IRefund } from "@/features/refund/types/refund-type";
import { formatter } from "@/lib/utils";
import { Row } from "@tanstack/react-table";
import { Info } from "lucide-react";
import React from "react";

interface InfoMoneytaryContentProps {
  row: Row<IRefund>;
  onBack: () => void;
  onSubmit: () => void;
  loading: boolean;
  actionLabel: string;
  secondaryActionLabel: string;
}

const InfoMoneytaryContent = ({
  row,
  onBack,
  onSubmit,
  loading,
  actionLabel,
  secondaryActionLabel,
}: InfoMoneytaryContentProps) => {
  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-2xl border">
      <div className="text-center border-b border-gray-300 pb-4 mb-4">
        <h3 className="text-xl font-bold text-gray-700 dark:text-gray-200">
          HÓA ĐƠN BỒI THƯỜNG
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Mã đơn: BOK{row.original.bookingId}
        </p>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-gray-600 dark:text-gray-300 mb-2">
          Thông tin khách hàng
        </h4>
        <div className="text-sm text-gray-700 dark:text-gray-400 space-y-1">
          <p>
            <span className="font-medium">Tên:</span> {row.original.owner.name}
          </p>
          <p>
            <span className="font-medium">Email:</span>{" "}
            {row.original.owner.email}
          </p>
          <p>
            <span className="font-medium">Số điện thoại:</span>{" "}
            {row.original.owner.phone}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-gray-600 dark:text-gray-300 mb-2">
          Thông tin bồi thường
        </h4>
        <div className="text-sm text-gray-700 dark:text-gray-400">
          <p>
            Số tiền bồi thường khách hàng yêu cầu:{" "}
            <span className="font-medium text-green-500">
              {formatter.format(row.original.estimatedAmount)}
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
            {row.original.time}
          </p>
          <p>
            <span className="font-medium">Tổng tiền của đơn:</span>{" "}
            {formatter.format(row.original.total)}
          </p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-300">
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          <div className="flex justify-center items-center p-2 gap-2">
            <Info className="h-4 w-4 text-orange-500" />
            Vui lòng kiểm định đơn bồi thường của khách hàng
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
          className={`min-w-[100px] bg-amber-600 hover:bg-amber-700 gap-2`}
          onClick={onSubmit}
          disabled={loading}
        >
          <Info className="h-4 w-4" />
          {actionLabel}
        </Button>
      </div>
    </div>
  );
};

export default InfoMoneytaryContent;
