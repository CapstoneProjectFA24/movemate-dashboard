export type IWallet = {
  id: number;
  userId: number;
  balance: number;
  bankNumber: string;
  bankName: string;
  expirdAt: string;
  cardHolderName: string;
  isLocked: boolean;
};
