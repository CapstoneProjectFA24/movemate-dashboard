import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Download, Filter } from "lucide-react";

interface TransactionLayoutProps {
  children: React.ReactNode;
}

const CreditCard = () => (
  <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 sm:p-6 rounded-xl shadow-lg w-full overflow-hidden mt-16">
    {/* Chip Icon */}
    <div className="absolute top-4 left-4 w-8 sm:w-10 h-6 sm:h-8 bg-gradient-to-r from-gray-200 to-gray-400 rounded-sm"></div>

    {/* Card Content */}
    <div className="relative z-10 flex flex-col space-y-4 sm:space-y-6">
      {/* Title */}
      <h2 className="text-sm sm:text-lg font-bold tracking-wide truncate">
        Credit Card
      </h2>

      {/* Card Number */}
      <div className="text-base sm:text-lg font-mono tracking-widest truncate">
        **** **** **** 1234
      </div>

      {/* Card Footer */}
      <div className="flex justify-between text-xs sm:text-sm flex-wrap">
        <div className="truncate">
          <p className="text-[10px] sm:text-xs uppercase">Card Holder</p>
          <p className="font-bold truncate">John Doe</p>
        </div>
        <div className="truncate">
          <p className="text-[10px] sm:text-xs uppercase">Expiry</p>
          <p className="font-bold truncate">12/25</p>
        </div>
      </div>

      {/* Value */}
      <div className="text-2xl sm:text-4xl font-extrabold mt-4 truncate">
        $1,000.00
      </div>
    </div>
  </div>
);

const CreditCardDetails = () => (
  <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow">
    <h3 className="text-lg font-semibold mb-2">Chi tiết thẻ</h3>
    <ul className="space-y-2">
      <li className="flex justify-between">
        <span className="font-medium">Tên chủ thẻ:</span>
        <span className="text-gray-700">John Doe</span>
      </li>
      <li className="flex justify-between">
        <span className="font-medium">Ngày hết hạn:</span>
        <span className="text-gray-700">12/25</span>
      </li>
      <li className="flex justify-between">
        <span className="font-medium">Mã số thẻ:</span>
        <span className="text-gray-700">**** **** **** 1234</span>
      </li>
      <li className="flex justify-between">
        <span className="font-medium">Tên ngân hàng:</span>
        <span className="text-gray-700">Ngân Hàng ABC</span>
      </li>
      <li className="flex justify-between">
        <span className="font-medium">Số dư khả dụng:</span>
        <span className="text-gray-700">$500.00</span>
      </li>
    </ul>
  </div>
);

const TransactionLayout = ({ children }: TransactionLayoutProps) => {
  return (
    <div className="container py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold tracking-tight">
            Quản lý giao dịch
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Lọc
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Xuất
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Thêm giao dịch
          </Button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Card for Transactions */}
        <Card className="bg-gray-100 dark:bg-muted/40 p-4 md:p-6 rounded-lg flex-grow w-full">
          <div className="overflow-auto flex-grow">{children}</div>
        </Card>

        {/* Credit Card Section */}
        <Card className="p-6 rounded-lg shadow-lg w-full sm:w-full md:w-1/3 lg:w-1/4 flex-shrink-0 mx-auto bg-white transition-transform transform hover:scale-105">
          <h2 className="text-xl font-semibold mb-4 text-center text-gray-800 mt-8">
            Thẻ Tín Dụng
          </h2>
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg mb-4 mt-4">
            <CreditCard />
          </div>
          <CreditCardDetails />
        </Card>
      </div>
    </div>
  );
};

export default TransactionLayout;
