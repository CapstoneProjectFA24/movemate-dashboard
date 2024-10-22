"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";

const UserAvatar = () => {
  
  const { data: session } = useSession();

  // mốt sửa
  const image = session?.user.roleName
  ? "https://github.com/shadcn.png"
    : session?.user.roleName

  return (
    <Avatar>
      <AvatarImage src={image} alt={session?.user.email ?? "email"} />
      <AvatarFallback>{session?.user.email}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
