"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { IFee } from "../../types/fee-type";
import selectColumn from "./column/select-column";
import idColumn from "./column/id-column";
import nameColumn from "./column/name-column";
import amountColumn from "./column/amount-column";
import typeColumn from "./column/type-column";
import isActivedColumn from "./column/isActived-column";
import actionColumn from "./column/action-column";

export function fetchFeeTableColumnDefs(): ColumnDef<IFee, unknown>[] {
  return [
    selectColumn,
    idColumn,
    nameColumn,
    amountColumn,
    typeColumn,
    isActivedColumn,
    actionColumn,
  ];
}
