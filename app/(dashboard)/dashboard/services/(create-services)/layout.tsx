import LoadingSpinner, {
  FullPageSpinner,
} from "@/components/shared/custom-ui/loading-spinner";
import { Suspense } from "react";

interface CreateServicesLayoutProps {
  children: React.ReactNode;
}

const CreateServicesLayout = ({ children }: CreateServicesLayoutProps) => {
  return (
    <Suspense fallback={<LoadingSpinner className="text-orange-500" />}>
      <div className="space-y-2">
        <div className="bg-gray-100 dark:bg-muted/40 min-h-screen p-4 md:p-6 rounded-md min-w-full">
          {children}
        </div>
      </div>
    </Suspense>
  );
};

export default CreateServicesLayout;
