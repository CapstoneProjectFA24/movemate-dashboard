"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PaymentStatus = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);
  const isSuccess = searchParams.get("isSuccess") === "true";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div>Loading...</div>;
  }

  const content = {
    success: {
      title: "Thanh toán thành công",
      heading: "Cảm ơn bạn!",
      message:
        "Thanh toán của bạn đã được xác nhận. Vui lòng quay lại ứng dụng để tiếp tục.",
    },
    fail: {
      title: "Thanh toán thất bại",
      heading: "Đã xảy ra lỗi!",
      message:
        "Rất tiếc, thanh toán của bạn không thành công. Vui lòng thử lại hoặc quay lại ứng dụng.",
    },
  };

  const currentContent = isSuccess ? content.success : content.fail;

  return (
    <div className="w-full px-4 md:px-6">
      <Card className="w-full max-w-3xl mx-auto border dark:border-gray-700 dark:bg-gray-800">
        <CardContent className="text-center pt-6">
          <div className="flex flex-col items-center justify-center">
            <CardHeader>
              <CardTitle
                className={`text-2xl md:text-3xl font-bold ${
                  isSuccess
                    ? "text-lime-600 dark:text-lime-500"
                    : "text-red-500 dark:text-red-400"
                }`}
              >
                {currentContent.title}
              </CardTitle>
            </CardHeader>

            <div className="relative w-32 h-32 md:w-40 md:h-40 my-6 md:my-8">
              <Image
                src={
                  isSuccess
                    ? "/images/payment_status/payment_success.gif"
                    : "/images/payment_status/payment_fail.gif"
                }
                alt={isSuccess ? "payment success" : "payment fail"}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="mb-6 md:mb-8 mx-4 md:mx-8">
            <h3 className="text-lg md:text-xl font-semibold uppercase mb-3 dark:text-white">
              {currentContent.heading}
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-300 mb-8 md:mb-10">
              {currentContent.message}
            </p>
          </div>

          <Button
            onClick={() => router.push("/")}
            className={`text-base px-6 py-2 ${
              isSuccess
                ? "bg-lime-600 hover:bg-lime-700 dark:bg-lime-500 dark:hover:bg-lime-600"
                : "bg-red-500 hover:bg-red-600 dark:bg-red-400 dark:hover:bg-red-500"
            }`}
          >
            Quay lại trang chủ
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};


export default PaymentStatus;