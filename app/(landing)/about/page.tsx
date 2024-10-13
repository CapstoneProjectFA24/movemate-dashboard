"use client";

import MaxWidthWrapper from "@/components/shared/landing/max-width-wrapper";
import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <div className="bg-slate-50 dark:bg-gray-800 dark:text-gray-200 min-h-screen flex flex-col">
      <MaxWidthWrapper className="flex-1 py-12 sm:py-24">
        <section className="lg:grid lg:grid-cols-3 lg:gap-x-8">
          <div className="col-span-2">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
              Về chúng tôi
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              MoveMate là một nền tảng giúp bạn dễ dàng quản lý và tổ chức các
              dịch vụ chuyển nhà. Chúng tôi cung cấp giải pháp toàn diện từ các
              dịch vụ thiết yếu cho đến cơ hội gia tăng thu nhập.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Với đội ngũ chuyên nghiệp và công nghệ tiên tiến, chúng tôi cam
              kết mang đến trải nghiệm chuyển nhà suôn sẻ và thuận tiện nhất cho
              khách hàng.
            </p>
          </div>
          <div className="mt-8 lg:mt-0">
            <Image
              src="/images/landing/snake-1.png"
              width={100}
              height={100}
              alt="img"
            />
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Tại sao chọn MoveMate?
              </h2>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>Dịch vụ toàn diện</li>
                <li>Đội ngũ chuyên nghiệp</li>
                <li>Công nghệ tiên tiến</li>
                <li>Hỗ trợ 24/7</li>
              </ul>
            </div>
          </div>
        </section>
        <section className="col-span-2 px-6 lg:px-0 lg:pt-4">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Với đội ngũ chuyên nghiệp và công nghệ tiên tiến, chúng tôi cam kết
            mang đến trải nghiệm chuyển nhà suôn sẻ và thuận tiện nhất cho khách
            hàng.
          </p>
        </section>
      </MaxWidthWrapper>
    </div>
  );
};

export default About;
