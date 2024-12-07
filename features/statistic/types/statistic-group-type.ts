export type IStatisticGroup = {
  totalGroups: number;
  groups: [];
};

export type IGroup = {
  groupId: number;
  groupName: string;
  totalUsers: number;
  usersByRole: IUserByRole[];
};

export type IUserByRole = {
  roleName: string;
  userCount: number;
};
