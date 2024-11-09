import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Download, Filter } from "lucide-react";
import Link from "next/link";

// Breadcrumb Components
interface BreadcrumbProps {
  children: React.ReactNode;
}

const Breadcrumb = ({ children }: BreadcrumbProps) => (
  <nav className="flex" aria-label="Breadcrumb">
    <ol className="flex items-center space-x-2">{children}</ol>
  </nav>
);

const BreadcrumbItem = ({ children }: BreadcrumbProps) => (
  <li className="flex items-center">
    {children}
    <span className="mx-2 text-muted-foreground">/</span>
  </li>
);

interface BreadcrumbLinkProps {
  href: string;
  children: React.ReactNode;
  isCurrent?: boolean;
}

const BreadcrumbLink = ({ href, children, isCurrent }: BreadcrumbLinkProps) => (
  <Link 
    href={href}
    className={`hover:text-primary transition-colors ${
      isCurrent ? 'text-primary font-medium' : 'text-muted-foreground'
    }`}
    aria-current={isCurrent ? 'page' : undefined}
  >
    {children}
  </Link>
);

interface TransactionLayoutProps {
  children: React.ReactNode;
}

const TransactionLayout = ({ children }: TransactionLayoutProps) => {
  return (
      <div className="container py-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold tracking-tight">Quản lý giao dịch</h1>
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

        <Card className="bg-gray-100 dark:bg-muted/40 p-4 md:p-6 rounded-lg shadow-sm">
          {children}
        </Card>

        </div>
  );
};

export default TransactionLayout;