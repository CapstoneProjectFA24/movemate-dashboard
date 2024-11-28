export enum PayemntMethodType {
  PAYOS = "PAYOS",
  VNPAY = "VNPAY",
  MOMO = "MOMO",
  WALLET = "WALLET",
}

export enum TransactionType {
  DEPOSIT = "DEPOSIT",
  RECEIVE = "RECEIVE",
  PAYMENT = "PAYMENT",
  RECHARGE = "RECHARGE"
}
export const TransactionTypeNames = {
  [TransactionType.DEPOSIT]: "Tiền cọc",
  [TransactionType.RECEIVE]: "Nhận tiền",
  [TransactionType.PAYMENT]: "Tiền thanh toán",
  [TransactionType.RECHARGE]: "Tiền nạp",

};

export enum statusType {
  SUCCESS = "SUCCESS",
}
