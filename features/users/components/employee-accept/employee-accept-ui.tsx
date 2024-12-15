"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { IUser } from "../../types/user-type";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";

interface EmployeeAcceptUiProps {
  employees: IUser[];
}

const EmployeeAcceptUi: React.FC<EmployeeAcceptUiProps> = ({ employees }) => {
  const { onOpen } = useModal();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Danh Sách Đăng Kí Thành Nhân Viên
      </h1>
      {employees.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          Không có nhân viên nào
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {employees.map((employee) => (
            <Card key={employee.id} className="w-full">
              <CardHeader className="flex flex-row items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage
                    src={employee.avatarUrl || "/default-avatar.png"}
                    alt={`Avatar của ${employee.name}`}
                  />
                  <AvatarFallback>
                    {employee.name?.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{employee.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {employee.email}
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 ">
                  <div className="flex justify-between">
                    <span className="font-medium">Số điện thoại:</span>
                    <span>{employee.phone || "Chưa cung cấp"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Trạng thái</span>
                    <Badge variant="default">Đang chờ xác nhận</Badge>
                  </div>
                  <div className="flex justify-end items-center">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        onOpen("accpetUserModal", { user: employee })
                      }
                    >
                      Xét duyệt
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeAcceptUi;
