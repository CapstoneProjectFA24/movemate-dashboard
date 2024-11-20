// components/layouts/ReviewerBookingLayout.tsx
import { Suspense } from 'react';
import { UserRole } from "@/lib/enums/user-role-enum";
import { authGuard } from '@/hooks/use-auth-session-server';
import LoadingSpinner from '@/components/shared/custom-ui/loading-spinner';

interface ReviewerBookingLayoutProps {
  children: React.ReactNode;
}

const ReviewerBookingLayout = async ({ children }: ReviewerBookingLayoutProps) => {
  // Server-side authentication sẽ mở nếu phân role
  // await authGuard([UserRole.REVIEWER, UserRole.MANAGER]); 

  return (
    <div className="space-y-2">
      <Suspense fallback={<LoadingSpinner className="text-orange-500" />}>
        <main className="bg-gray-100 dark:bg-muted/40 min-h-screen p-4 md:p-6 rounded-md min-w-full">
          {children}
        </main>
      </Suspense>
    </div>
  );
};

export default ReviewerBookingLayout;