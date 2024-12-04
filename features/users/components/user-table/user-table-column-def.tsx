"use client";

import { type ColumnDef } from "@tanstack/react-table";

import avatarUrlColumn from "./column/avatarUrl-column";
import { IUser } from "../../types/user-type";
import selectColumn from "./column/select-column";
import idColumn from "./column/id-column";
import nameColumn from "./column/name-column";
import emailColumn from "./column/email-column";
import phoneColumn from "./column/phone-column";
import roleNameColumn from "./column/role-column";

import actionColumn from "./column/action-column";
import groupIdColumn from "./column/groupid-column";

export function fetchUserTableColumnDefs(): ColumnDef<IUser, unknown>[] {
  return [
    selectColumn,
    avatarUrlColumn,
    idColumn,
    nameColumn,
    emailColumn,
    phoneColumn,
    groupIdColumn,
    roleNameColumn,
    actionColumn,
  ];
}
