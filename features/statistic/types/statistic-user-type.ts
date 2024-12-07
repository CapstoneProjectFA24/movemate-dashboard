import { IUserByRole } from "./statistic-group-type"


export type IStatisticUser = {
    shard: string,
    totalUsers: number,
    totalBannedUsers: number,
    totalActiveUsers: number,
    usersByRole: IUserByRole[]
}