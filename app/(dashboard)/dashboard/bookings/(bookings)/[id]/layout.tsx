import { Suspense } from "react";
import { UserRole } from "@/lib/enums/user-role-enum";
import { authGuard } from "@/hooks/use-auth-session-server";
import LoadingSpinner from "@/components/shared/custom-ui/loading-spinner";
import ReviewerBookingPageSkeleton from "@/components/shared/dashboard/loading-skeleton/reviewer-booking-skeleton";

import ReviewerBookingDetailPageSkeleton from "@/components/shared/dashboard/loading-skeleton/booking-detail-skeleton";
interface ReviewerBookingDetailPageProps {
  children: React.ReactNode;
}

const ReviewerBookingDetailPage = async ({
  children,
}: ReviewerBookingDetailPageProps) => {
  // Server-side authentication sẽ mở nếu phân role
  // await authGuard([UserRole.REVIEWER, UserRole.MANAGER]);

  return (
    <Suspense fallback={<ReviewerBookingDetailPageSkeleton />}>
      {children}
    </Suspense>
  );
};

export default ReviewerBookingDetailPage;
