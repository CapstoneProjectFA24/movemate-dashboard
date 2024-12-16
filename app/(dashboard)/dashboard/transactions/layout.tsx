import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Download, Filter } from "lucide-react";
import CreditCard from "./_components/creadit-card";
import CreditCardDetails from "./_components/creadit-detail";

interface TransactionLayoutProps {
  children: React.ReactNode;
}

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
