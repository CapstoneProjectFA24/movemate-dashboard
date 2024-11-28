"use client";

import { type ColumnDef } from "@tanstack/react-table";

// import imageUrlColumn from "./column/imageUrl-column";

// import nameColumn from "./column/name-column";
// import typeColum from "./column/type-column";
// import amountColumn from "./column/amount-column";
// import inverseParentColumn from "./column/inverse-parent-column";
// import isActivedColumn from "./column/isActived-column";
// import actionColumn from "./column/action-column";
import { ITransaction } from "../../types/transaction-type";
import selectColumn from "./column/select-column";
import idColumn from "./column/id-column";
import amountColumn from "./column/amount";
import {transTypeColumn} from "./column/transaction-type";
import { paymentMethodColumn } from "./column/payment-method";
import statusColumn from "./column/status-column";
import createdAtColumn from "./column/createAt-column";


export function fetchTransactionsTableColumnDefs(): ColumnDef<ITransaction, unknown>[] {
  return [
    selectColumn,
    idColumn,
    amountColumn,
    transTypeColumn,
    paymentMethodColumn,
    statusColumn,
    // createdAtColumn
    // typeColum,
    // inverseParentColumn,
    // isActivedColumn,
    // actionColumn,
  ];
}
