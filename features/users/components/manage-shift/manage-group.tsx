"use client";

import React, { useState, useTransition } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ApiListResponse } from "@/lib/api/api-handler/generic";
import { Button } from "@/components/ui/button";
import { Network, Pencil, PlusCircle, Save, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { IGroup } from "../../types/group-type";
import { createGroup, deleteGroup, updateGroup } from "../../action/group";
import { toast } from "sonner";
import AlertModal from "@/components/modals/alert-modal";

interface ManageGroupProps {
  groupData: ApiListResponse<IGroup>;
}

const ManageGroup = ({ groupData }: ManageGroupProps) => {
  const [groups, setGroups] = useState<IGroup[]>(groupData.data); // State để quản lý danh sách nhóm
  const [editingGroup, setEditingGroup] = useState<IGroup | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [groupToDelete, setGroupToDelete] = useState<IGroup | null>(null);

  const [isCreate, setIsCreate] = useState(false);

  const handleEdit = (group: IGroup) => {
    setEditingGroup(group);
  };

  const handleSave = async () => {
    if (isCreate) {
      if (editingGroup) {
        try {
          const result = await createGroup(editingGroup);
          if (!result.success) {
            toast.error(result.error);
          } else {
            toast.success("Tạo tổ mới thành công");
            setEditingGroup(null);
            setIsCreate(false);
          }
        } catch (error) {
          toast.error("Đã xảy ra lỗi khi tạo nhóm.");
        }
      }
    } else {
      if (editingGroup) {
        try {
          const result = await updateGroup(
            editingGroup,
            editingGroup.id.toString()
          );
          if (!result.success) {
            toast.error(result.error);
          } else {
            toast.success("Cập nhật tổ thành công");
            setEditingGroup(null);
          }
        } catch (error) {
          toast.error("Đã xảy ra lỗi khi cập nhật nhóm.");
        }
      }
    }
  };

  const handleCreateNewGroup = () => {
    const newGroup: IGroup = {
      id: groups.length ? groups[groups.length - 1].id + 1 : 1,
      name: "",
      countUser: 0,
    };
    setIsCreate(true);
    setGroups((prevGroups) => [...prevGroups, newGroup]);
    setEditingGroup(newGroup);
  };

  const onDelete = async () => {
    if (groupToDelete) {
      try {
        setLoading(true);
        startTransition(async () => {
          const result = await deleteGroup(groupToDelete.id.toString());

          if (!result.success) {
            toast.error(result.error);
          } else {
            setGroups((prevGroups) =>
              prevGroups.filter((group) => group.id !== groupToDelete.id)
            );
            toast.success("Xóa thành công.");
          }
        });
      } catch (error: any) {
        toast.error("Đã có lỗi.");
      } finally {
        setLoading(false);
        setOpen(false);
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (editingGroup) {
      setEditingGroup({
        ...editingGroup,
        [e.target.name]: e.target.value,
      });
      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group.id === editingGroup.id
            ? { ...group, [e.target.name]: e.target.value }
            : group
        )
      );
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        variant="danger"
        onConfirm={onDelete}
        loading={loading}
        title="Xóa tổ này"
        description="Bạn có chắc chắn muốn xóa tổ này không?"
      />
      <div>
        <div className="flex justify-between p-6">
          <div className="text-3xl font-bold tracking-tight">Quản lý tổ</div>
          <Button
            variant="outline"
            className="gap-2"
            onClick={handleCreateNewGroup} // Gọi hàm khi nhấn nút Tạo mới
          >
            <PlusCircle className="h-4 w-4" />
            <span className="text-sm"> Tạo mới</span>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {groups
            .sort((a, b) => a.id - b.id)
            .map((group) => (
              <Card
                key={group.id}
                className="group relative bg-white dark:bg-muted/40 shadow-md hover:shadow-xl transition-all duration-300 border-orange-100 dark:border-orange-900"
              >
                <div className="absolute -top-2 -right-2">
                  <Badge
                    variant="secondary"
                    className="bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300"
                  >
                    {group.id}
                  </Badge>
                </div>

                <CardHeader className="p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Network className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    {editingGroup?.id === group.id ? (
                      <Input
                        name="name"
                        value={editingGroup.name}
                        onChange={handleInputChange}
                        className="text-lg font-semibold"
                      />
                    ) : (
                      <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                        {group.name}
                      </CardTitle>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="p-4">
                  <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                    số lượng nhân viên: {group.countUser}
                  </p>
                </CardContent>

                <CardFooter className="p-4 flex justify-end border-t border-orange-100 dark:border-orange-900">
                  {editingGroup?.id === group.id ? (
                    <Button
                      variant="ghost"
                      type="button"
                      size="icon"
                      className="hover:bg-green-600 dark:hover:bg-green-900 text-green-600 dark:text-green-400"
                      onClick={handleSave}
                      disabled={loading}
                    >
                      <Save className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      type="button"
                      size="icon"
                      className="hover:bg-orange-600 dark:hover:bg-orange-900 text-orange-600 dark:text-orange-400"
                      onClick={() => handleEdit(group)}
                      disabled={loading}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    type="button"
                    size="icon"
                    onClick={() => {
                      setGroupToDelete(group);
                      setOpen(true);
                    }}
                    className="hover:bg-red-600 dark:hover:bg-red-900 text-red-600 dark:text-red-400"
                    disabled={loading}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </>
  );
};

export default ManageGroup;
