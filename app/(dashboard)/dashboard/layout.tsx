"use client";

import Breadcrumb from "@/components/shared/dashboard/bread-crumb";
import { breadcrumbTranslations } from "@/constants/bread-crumb-tranlate";
import { usePathname } from "next/navigation";

interface ContentDashboardLayoutProps {
  children: React.ReactNode;
}

const ContentDashboardLayout = ({ children }: ContentDashboardLayoutProps) => {
  const pathName = usePathname();

  const breadcrumbItems = pathName
    .split("/")
    .filter(Boolean)
    .map((segment, index, arr) => {
      const isLast = index === arr.length - 1;
      return {
        label: breadcrumbTranslations[segment] || segment,
        href: "/" + arr.slice(0, index + 1).join("/"),
        isLast,
      };
    });
  return (
    <div>
      <div className="mb-4">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default ContentDashboardLayout;
