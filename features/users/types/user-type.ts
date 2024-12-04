export type IUser = {
  id: number;
  scheduleId: number;
  roleName: UserRole;
  name: string;
  phone: number;
  email: string;
  isDeleted: boolean;
  avatarUrl?: string;
  groupId?:string
};

export enum UserRole {
  Reviewer = "REVIEWER",
  Driver = "DRIVER",
  Porter = "PORTER",
}
