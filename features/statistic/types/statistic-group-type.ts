export interface IUserByRole {
  roleName: string;
  userCount: number;
  totalActiveUsers?: number,
  totalNoActiveUsers?: number
}

export interface IGroup {
  groupId: number;
  groupName: string;
  totalUsers: number;
  usersByRole: IUserByRole[];
}

export interface IStatisticGroup {
  totalGroups: number;
  groups: IGroup[]; 
}