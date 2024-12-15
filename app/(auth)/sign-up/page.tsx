import React, { useState } from "react";

import SignUpForm from "./_components/sign-up-form";
import { getTruckCategorys } from "@/features/services/action/truck-category";

const SignUpPage = async () => {
  const [truckCategorys] = await Promise.all([getTruckCategorys()]);

  return <SignUpForm truckCategorys={truckCategorys.data}/>;
};

export default SignUpPage;
