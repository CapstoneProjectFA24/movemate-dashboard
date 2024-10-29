// hooks/server/useAuthGuard.ts
import { UserRole } from "@/lib/enums/user-role-enum";
import { auth } from "@/lib/next-auth/auth";
import { redirect } from "next/navigation";

export async function authGuard(
  allowedRoles: UserRole[] = [
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.REVIEWER,
  ]
) {
  const session = await auth();
  const userRole = session?.user?.roleName?.toUpperCase();

  if (!session || !allowedRoles.includes(userRole as UserRole)) {
    redirect("/not-permission");
  }

  return {
    session,
    userRole,
  };
}
