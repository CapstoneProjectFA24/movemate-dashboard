"use client";

import { type ColumnDef } from "@tanstack/react-table";

// import imageUrlColumn from "./column/imageUrl-column";

// import nameColumn from "./column/name-column";
// import typeColum from "./column/type-column";
// import amountColumn from "./column/amount-column";
// import inverseParentColumn from "./column/inverse-parent-column";
// import isActivedColumn from "./column/isActived-column";
// import actionColumn from "./column/action-column";
import { ITransaction } from "../../type/transaction-type";
import selectColumn from "./column/select-column";
import idColumn from "./column/id-column";

export function fetchTransactionsTableColumnDefs(): ColumnDef<ITransaction, unknown>[] {
  return [
    selectColumn,
    idColumn,
    // nameColumn,
    // amountColumn,
    // typeColum,
    // inverseParentColumn,
    // isActivedColumn,
    // actionColumn,
  ];
}
