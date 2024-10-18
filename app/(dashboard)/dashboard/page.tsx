"use client";
import React from "react";
import Footer from "@/components/shared/landing/footer";
import MaxWidthWrapper from "@/components/shared/landing/max-width-wrapper";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Doanh thu",
        data: [120, 150, 180, 130, 220, 300, 250],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-1">Tổng số người dùng</h2>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            1,234
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-1">Doanh thu tháng này</h2>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            $12,345
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-1">Số lượng đơn hàng</h2>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            567
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
        <h2 className="text-lg font-semibold mb-2">Doanh thu theo tháng</h2>
        <div style={{ height: "200px" }}>
          <Bar
            data={data}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  labels: {
                    color: "rgb(75, 75, 75)",
                  },
                },
              },
            }}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2">Danh sách người dùng</h2>
        <table className="min-w-full border-collapse border border-gray-200 dark:border-gray-700">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 text-left">Tên</th>
              <th className="border border-gray-300 p-2 text-left">Email</th>
              <th className="border border-gray-300 p-2 text-left">
                Trạng thái
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">Nguyễn Văn A</td>
              <td className="border border-gray-300 p-2">vana@example.com</td>
              <td className="border border-gray-300 p-2">Hoạt động</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Trần Thị B</td>
              <td className="border border-gray-300 p-2">btran@example.com</td>
              <td className="border border-gray-300 p-2">Ngừng hoạt động</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
