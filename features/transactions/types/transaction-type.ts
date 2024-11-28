export type ITransaction = {
  id: number;
  paymentId: number;
  walletId: number;
  resource: string;
  amount: number;
  status: string;
  paymentMethod: string;
  transactionCode: string;
  transactionType: string;
  isCredit: boolean;
  createdAt?: Date;
};
