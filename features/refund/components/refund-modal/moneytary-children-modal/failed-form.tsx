"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

interface FailedReasonFormProps {
  onBack: () => void;
  onSubmit: () => void;
  setFailedReason: (value: React.SetStateAction<string>) => void;
  failedReason: string;
  loading: boolean;
  actionLabel: string;
  secondaryActionLabel: string;
}

const FailedReasonForm = ({
  onBack,
  onSubmit,
  setFailedReason,
  failedReason,
  loading,
  actionLabel,
  secondaryActionLabel,
}: FailedReasonFormProps) => {
  return (
    <div className="p-6 rounded-lg shadow-2xl border">
      <div className="text-center border-b border-gray-300 pb-4 mb-4">
        <h3 className="text-xl font-bold text-gray-700 dark:text-gray-200">
          Lý do không bồi thường
        </h3>
      </div>
      <div>
        <Textarea
          name="failedReason"
          placeholder="Nhập lý do không bồi thường"
          rows={4}
          value={failedReason}
          onChange={(e) => setFailedReason(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-end mt-4 space-x-3">
        {secondaryActionLabel && (
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              onBack();
              setFailedReason("");
            }}
            disabled={loading}
          >
            {secondaryActionLabel}
          </Button>
        )}
        <Button
          type="submit"
          className={`min-w-[100px] `}
          onClick={onSubmit}
          disabled={loading}
        >
          {actionLabel}
        </Button>
      </div>
    </div>
  );
};

export default FailedReasonForm;
