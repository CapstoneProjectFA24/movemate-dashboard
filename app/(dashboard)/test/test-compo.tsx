"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { getHouses } from "@/lib/actions/house";
import { useToast } from "@/hooks/use-toast";
import { signOut, useSession, } from "next-auth/react";

interface TestCompoProps {
  housePromise: ReturnType<typeof getHouses>;
}

const TestCompo = ({ housePromise }: TestCompoProps) => {
  const {data: session} = useSession()
const email = session?.user.email;
console.log(email)

  const { toast } = useToast();
  const { data, pageCount, error } = React.use(housePromise);
  React.useEffect(() => {
    if (error) {
      toast({
        title: "Data loaded",
        description: error,
      });
    }
  }, [error]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div>TestCompo call data and see in terminal</div>
      <Button onClick={() => signOut()}>Sign out</Button>
    </>
  );
};

export default TestCompo;