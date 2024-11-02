"use client";

import { type ColumnDef } from "@tanstack/react-table";

import { IService } from "../../type/services-type";
import selectColumn from "./column/select-column";
import imageUrlColumn from "./column/imageUrl-column";
import idColumn from "./column/id-column";
import nameColumn from "./column/name-column";
import typeColum from "./column/type-column";
import amountColumn from "./column/amount-column";
import inverseParentColumn from "./column/inverse-parent-column";
import isActivedColumn from "./column/isActived-column";
import actionColumn from "./column/action-column";

export function fetchServicesTableColumnDefs(): ColumnDef<IService, unknown>[] {
  return [
    selectColumn,
    imageUrlColumn,
    idColumn,
    nameColumn,
    amountColumn,
    typeColum,
    inverseParentColumn,
    isActivedColumn,
    actionColumn,
  ];
}
