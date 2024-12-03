"use client";

import { ITruckCategory } from "@/features/services/types/services-type";
import { type ColumnDef } from "@tanstack/react-table";
import idColumn from "./column/id-column";
import selectColumn from "./column/select-column";



export function fetchTruckCategoryTableColumnDefs(): ColumnDef<ITruckCategory, unknown>[] {
  return [
    selectColumn,
    idColumn
  ];
}
