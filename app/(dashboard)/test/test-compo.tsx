"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { getHouses } from "@/lib/actions/house";
import { signOut } from "@/lib/next-auth/auth";
import { useToast } from "@/hooks/use-toast";

interface TestCompoProps {
  housePromise: ReturnType<typeof getHouses>;
}

const TestCompo = ({ housePromise }: TestCompoProps) => {
  const { toast } = useToast();
  const { data, pageCount } = React.use(housePromise);

  React.useEffect(() => {
    if (data) {
      toast({
        title: "Data loaded",
        description: `Loaded ${data.length} houses`,
      });
    }
  }, [data, toast]);

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
      <Button onClick={handleSignOut}>Sign out</Button>
    </>
  );
};

export default TestCompo;