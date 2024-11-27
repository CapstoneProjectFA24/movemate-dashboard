import { Suspense } from "react";
import ServiceFormSkeleton from "../../../../../components/shared/dashboard/loading-skeleton/service-form-skeleton";

interface CreateServicesLayoutProps {
  children: React.ReactNode;
}

const CreateServicesLayout = ({ children }: CreateServicesLayoutProps) => {
  return (
    <Suspense
      fallback={
        <div className="space-y-2">
          <div className="bg-gray-100 dark:bg-muted/40 min-h-screen p-4 md:p-6 rounded-md min-w-full">
            <ServiceFormSkeleton />
          </div>
        </div>
      }
    >
      <div className="space-y-2">
        <div className="bg-gray-100 dark:bg-muted/40 min-h-screen p-4 md:p-6 rounded-md min-w-full">
          {children}
        </div>
      </div>
    </Suspense>
  );
};

export default CreateServicesLayout;
