export type IWindraw = {
  id: number;
  userId: number;
  walletId: number;
  balanceBefore: number;
  balanceAfter: number;
  date: string;
  bankName: string;
  bankNumber: string;
  isSuccess: boolean;
  isCancel: boolean;
  amount: number;
};
