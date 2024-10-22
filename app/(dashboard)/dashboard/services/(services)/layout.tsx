import ServiceAnalytic from "@/components/shared/dashboard/dashboard-services/service-analytic";
interface ServicesLayoutProps {
  children: React.ReactNode;
}

const ServicesLayout = ({ children }: ServicesLayoutProps) => {
  return (
    <div className="space-y-2">
      <ServiceAnalytic />
      <div className="bg-gray-100 dark:bg-muted/40 min-h-screen p-4 md:p-6 rounded-md min-w-full">
        {children}
      </div>
    </div>
  );
};

export default ServicesLayout;
