"use client";
import React, { useState, useEffect, useTransition } from "react";
import { useGetGroup } from "../../react-query/query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { IUser } from "../../types/user-type";
import { addUserToGroup } from "../../action/group";
import { toast } from "sonner";

interface GroupSelectionProps {
  user?: IUser;
}

const GroupSelection: React.FC<GroupSelectionProps> = ({ user }) => {
  const { data: groupsData, isLoading, error } = useGetGroup();
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (user?.groupId) {
      setSelectedGroup(user.groupId.toString());
    }
  }, [user?.groupId]);

  const handleGroupChange = (value: string) => {
    setSelectedGroup(value);

    const dataToSend = {
      groupId: Number(value),
      userId: user?.id,
    };

    try {
      startTransition(async () => {
        const result = await addUserToGroup(dataToSend);

        if (!result.success) {
          toast.error(result.error);
        } else {
          toast.success("Câp nhật nhân viên vào tổ thành công !");
        }
      });
    } catch (error) {
      console.error("có lỗi khi trong quá trình submit ", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2 text-gray-500">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>Đang tải danh sách tổ...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center space-x-2 text-red-500">
        <AlertCircle className="h-5 w-5" />
        <span>Không thể tải danh sách tổ</span>
      </div>
    );
  }

  const groups = groupsData?.data || [];

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Select
          value={selectedGroup || undefined}
          onValueChange={handleGroupChange}
        >
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Chọn nhóm" />
          </SelectTrigger>
          <SelectContent>
            {groups.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                Không có tổ nào
              </div>
            ) : (
              groups.map((group) => (
                <SelectItem
                  key={group.id.toString()}
                  value={group.id.toString()}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <span>{group.name}</span>
                    <Badge variant="secondary" className="ml-2">
                      {group.id.toString()}
                    </Badge>
                    {selectedGroup === group.id.toString() && (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>

        {selectedGroup && (
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <span className="text-sm text-gray-600">Đã chọn tổ</span>
          </div>
        )}
      </div>

      {selectedGroup && (
        <div className="mt-2 p-3  rounded-md border">
          <h4 className="font-semibold mb-2">Thông tin tổ</h4>
          <div className="space-y-1">
            {groups.find((g) => g.id.toString() === selectedGroup)?.name && (
              <p>
                <strong>Tên tổ:</strong>{" "}
                {groups.find((g) => g.id.toString() === selectedGroup)?.name}
              </p>
            )}
            <p>
              <strong>Mã tổ:</strong> {selectedGroup}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupSelection;
