"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { IPromotion } from "../../types/promotion-type";

import selectColumn from "./column/select-column";
import idColumn from "./column/id-column";
import nameColumn from "./column/name-column";
import startDateColumn from "./column/start-date-column";
import endDateColumn from "./column/end-date-column";
import expriedColumn from "./column/expried-column";
import quantityColumn from "./column/quantity-column";
import serviceIdColumn from "./column/serviceId-column";

import actionColumn from "./column/action-column";

export function fetchPromotionsTableColumnDefs(): ColumnDef<
  IPromotion,
  unknown
>[] {
  return [
    selectColumn,
    idColumn,
    nameColumn,
    startDateColumn,
    endDateColumn,
    // serviceIdColumn,
    quantityColumn,
    expriedColumn,
    actionColumn
  ];
}
