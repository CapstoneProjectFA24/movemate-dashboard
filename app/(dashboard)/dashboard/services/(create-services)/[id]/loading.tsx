import { LoadingSpinner } from "@/components/shared/custom-ui/loading-spinner";
import ServiceFormSkeleton from "../../../../../../components/shared/dashboard/loading-skeleton/service-form-skeleton";

export default function loading() {
  return (
    <div className="space-y-2">
      <div className="bg-gray-100 dark:bg-muted/40 min-h-screen p-4 md:p-6 rounded-md min-w-full">
        <ServiceFormSkeleton />
      </div>
    </div>
  );
}
