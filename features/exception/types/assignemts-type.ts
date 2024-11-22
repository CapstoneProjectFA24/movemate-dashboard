import { IUser } from "@/features/users/types/user-type";


export type IAssignment = {
    id: number;
    bookingId?: number;
    name?: string;
    number?: number;
    type?:string;
    status?: string;
    failReason?: string;
    bookingAt?: string;
    users?: IUser;
}