export type IUser = {
  id: number;
  scheduleId: number;
  roleName: UserRole;
  name: string;
  phone: number;
  email: string;
  gender: string;
  isDeleted: boolean;
  avatarUrl?: string;
  groupId?: string;
  dob?: string;
  isDriver?: boolean;
  truck?: ITruck;
  userInfos?: IUserInfos[];
};

export type ITruck = {
  id: number;
  userId: number;
  truckCategoryId: number;
  model: string;
  numberPlate: number;
  capacity: number;
  isAvailable: boolean;
  brand: string;
  color: string;
  isInsurrance: boolean;
};

export type IUserInfos = {
  id: number;
  userId: number;
  type: string;
  imageUrl: string;
};

export enum UserRole {
  Reviewer = "REVIEWER",
  Driver = "DRIVER",
  Porter = "PORTER",
}
