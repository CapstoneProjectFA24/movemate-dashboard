"use client";

import React, { useState } from "react";

// Định nghĩa lại kiểu Route với các thuộc tính cần thiết
interface Route {
  label: string;
  href?: string;
  isDisplayDocx?: boolean;  // Thêm isDisplayDocx cho các link đặc biệt
}

// Danh sách các liên kết
const links: Route[] = [
  { href: "https://docs.google.com/document/d/1y0aaUTAu8ChYKfdYPB0mw_cWf0K6Xkijkenma0DwgtA/edit?usp=sharing", label: "Hợp đồng", isDisplayDocx: true },
  { href: "/information/policy", label: "Chính sách sử dụng" }
];

const SearchBox: React.FC = () => {
  const [showContract, setShowContract] = useState(false);

  // Hàm để hiển thị hợp đồng khi click
  const handleShowContract = () => {
    setShowContract(true);
  };

  // Hàm đóng hợp đồng
  const handleCloseContract = () => {
    setShowContract(false);
  };

  return (
    <div
      style={{
        textAlign: "center",
        backgroundColor: "#ff5722",
        padding: "20px 40px",
        borderRadius: "8px",
        color: "white",
        maxWidth: "600px",
        margin: "50px auto",
      }}
    >
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
        Xin chào, MoveMate có thể giúp gì cho bạn?
      </h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: "4px",
          overflow: "hidden",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <input
          type="text"
          placeholder="Nhập từ khóa hoặc nội dung cần tìm"
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            padding: "10px 16px",
            fontSize: "16px",
            color: "#333",
          }}
        />
        <button
          style={{
            backgroundColor: "transparent",
            border: "none",
            padding: "10px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            style={{ width: "20px", height: "20px", color: "#ff5722" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M8.5 15a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0z"
            />
          </svg>
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        {links.map((link) =>
          link.isDisplayDocx ? (
            <span
              key={link.label}
              onClick={handleShowContract}
              style={{
                color: "white",
                textDecoration: "underline",
                marginRight: "15px",
                cursor: "pointer",
              }}
            >
              {link.label}
            </span>
          ) : link.href ? (
            <a
              key={link.href}
              href={link.href}
              style={{
                color: "white",
                textDecoration: "underline",
                marginRight: "15px",
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ) : (
            <span
              key={link.label}
              style={{
                color: "white",
                textDecoration: "underline",
                marginRight: "15px",
                cursor: "not-allowed",
              }}
            >
              {link.label}
            </span>
          )
        )}
      </div>

      {showContract && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay background
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              position: "relative",
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              maxWidth: "90%",
              maxHeight: "90%",
              overflow: "auto",
              width: "100%",
              height: "100%",
            }}
          >
            <h2>Hợp đồng</h2>
            <iframe
              src="https://docs.google.com/document/d/1y0aaUTAu8ChYKfdYPB0mw_cWf0K6Xkijkenma0DwgtA/edit?usp=sharing"
              width="100%"
              height="100%"
              style={{
                border: "none",
                borderRadius: "4px",
              }}
            >
              Trình duyệt của bạn không hỗ trợ xem tài liệu
            </iframe>
            <button
              onClick={handleCloseContract}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                backgroundColor: "#ff5722",
                color: "white",
                border: "none",
                padding: "10px 20px",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
