import { getUserToAcceptEmployee } from "@/features/users/action/users";
import EmployeeAcceptUi from "@/features/users/components/employee-accept/employee-accept-ui";
import React from "react";

const AcceptEmployee = async () => {
  const [employees] = await Promise.all([getUserToAcceptEmployee()]);

  return <div>
    <EmployeeAcceptUi employees = {employees.data}/>
  </div>;
};

export default AcceptEmployee;
