"use client";

import MaxWidthWrapper from "@/components/shared/landing/max-width-wrapper";
import React, { useState } from "react";

interface Route {
  label: string;
  href?: string;
  isDisplayDocx?: boolean;
}

const links: Route[] = [
  {
    href: "https://docs.google.com/document/d/1y0aaUTAu8ChYKfdYPB0mw_cWf0K6Xkijkenma0DwgtA/edit?usp=sharing",
    label: "Hợp đồng",
    isDisplayDocx: true,
  },
  { href: "/information/policy", label: "Chính sách sử dụng" },
];

const SearchBox: React.FC = () => {
  const [showContract, setShowContract] = useState(false);

  const handleShowContract = () => {
    setShowContract(true);
  };

  const handleCloseContract = () => {
    setShowContract(false);
  };

  return (
    <div className="dark:bg-gray-700 bg-slate-50 dark:text-gray-200 min-h-screen">
      <MaxWidthWrapper className="flex-1 py-12 sm:py-24">
        <div className="text-center bg-orange-500 p-8 rounded-lg max-w-2xl mx-auto my-12">
          <h1 className="text-2xl mb-5 text-white">
            Xin chào, MoveMate có thể giúp gì cho bạn?
          </h1>
          <div className="bg-white rounded-md flex overflow-hidden shadow-md">
            <input
              type="text"
              placeholder="Nhập từ khóa hoặc nội dung cần tìm"
              className="flex-1 border-none outline-none p-4 text-base text-gray-500"
            />
            <button className="bg-transparent border-none p-4 flex items-center justify-center cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-orange-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M8.5 15a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0z"
                />
              </svg>
            </button>
          </div>

          <div className="mt-5">
            {links.map((link) =>
              link.isDisplayDocx ? (
                <span
                  key={link.label}
                  onClick={handleShowContract}
                  className="text-white underline mr-4 cursor-pointer"
                >
                  {link.label}
                </span>
              ) : link.href ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white underline mr-4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ) : (
                <span
                  key={link.label}
                  className="text-white underline mr-4 cursor-not-allowed"
                >
                  {link.label}
                </span>
              )
            )}
          </div>

          {showContract && (
            <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-[1000]">
              <div className="bg-white p-5 rounded-lg max-w-[90%] max-h-[90%] overflow-auto w-full h-full">
                <h2 className="mb-4">Hợp đồng</h2>
                <iframe
                  src="https://docs.google.com/document/d/1y0aaUTAu8ChYKfdYPB0mw_cWf0K6Xkijkenma0DwgtA/edit?usp=sharing"
                  className="border-none rounded-md w-full h-full"
                >
                  Trình duyệt của bạn không hỗ trợ xem tài liệu
                </iframe>
                <button
                  onClick={handleCloseContract}
                  className="bg-orange-500 text-white border-none p-3 rounded-md cursor-pointer absolute top-3 right-3"
                >
                  Đóng
                </button>
              </div>
            </div>
          )}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default SearchBox;
