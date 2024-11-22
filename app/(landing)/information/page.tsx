"use client";

import React from "react";
import Link from "next/link";

interface Route {
  label: string;
  href?: string;
  isDownload?: boolean;
}

export const links: Route[] = [
  { href: "/information/insurance", label: "Bảo hiểm thiết bị điện tử" },
  { href: "/hop-dong.docx", label: "Hợp đồng", isDownload: true },
  { href: "/information/policy", label: "Chính sách sử dụng" },
];

const SearchBox: React.FC = () => {
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
          link.isDownload ? (
            <a
              key={link.href}
              href={link.href}
              download
              style={{
                color: "white",
                textDecoration: "underline",
                marginRight: "15px",
              }}
            >
              {link.label}
            </a>
          ) : link.href ? (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color: "white",
                textDecoration: "underline",
                marginRight: "15px",
              }}
            >
              {link.label}
            </Link>
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
    </div>
  );
};

export default SearchBox;
