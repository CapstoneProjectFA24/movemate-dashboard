"use client";

import {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "@/types/table";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  VisibilityState,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  useReactTable,
} from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebounce } from "./use-debounce";

interface useDataTableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  pageCount?: number;
  searchableColumns?: DataTableSearchableColumn<TData>[];
  filterableColumns?: DataTableFilterableColumn<TData>[];
}

export function useDataTable<TData, TValue>({
  data,
  columns,
  pageCount,
  searchableColumns = [],
  filterableColumns = [],
}: useDataTableProps<TData, TValue>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // search params
  const page = searchParams?.get("page") ?? "1";
  const pageAsNumber = Number(page);
  const fallbackPage =
    isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber;

  const per_page = searchParams?.get("per_page") ?? "10";
  const perPageAsNumber = Number(per_page);
  const fallbackPerPage = isNaN(perPageAsNumber) ? 10 : perPageAsNumber;

  const sort = searchParams?.get("sort");
  const [column, order] = sort?.split(".") ?? [];
  const globalSearch = searchParams?.get("Search") ?? "";

  // create query string
  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());


      if (newSearchParams.get("page") === "1") {
        newSearchParams.delete("page");
      }
      if (newSearchParams.get("per_page") === "10") {
        newSearchParams.delete("per_page");
      }

      for (const [key, value] of Object.entries(params)) {
        // Only add page and per_page to URL if they're not default values
        if (key === "page" && value === 1) {
          newSearchParams.delete(key);
          continue;
        }
        if (key === "per_page" && value === 10) {
          newSearchParams.delete(key);
          continue;
        }
        
        if (value === null || value === "") {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams]
  );

  // Initial column filters
  const initialColumnFilters: ColumnFiltersState = useMemo(() => {
    const filters: ColumnFiltersState = [];

    // Add filters for filterable columns
    Array.from(searchParams.entries()).forEach(([key, value]) => {
      const filterableColumn = filterableColumns.find(
        (column) => column.id === key
      );
      if (filterableColumn) {
        filters.push({ id: key, value: value.split(".") });
      }
    });

    // Add global search to all searchable columns
    if (globalSearch && searchableColumns.length > 0) {
      searchableColumns.forEach((column) => {
        filters.push({
          id: String(column.id),
          value: globalSearch,
        });
      });
    }

    return filters;
  }, [filterableColumns, searchableColumns, searchParams, globalSearch]);

  // Table states
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>(initialColumnFilters);

  // handle server-side pagination
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: fallbackPage - 1,
    pageSize: fallbackPerPage,
  });

  const pagination = useMemo(
    () => ({ pageIndex, pageSize }),
    [pageIndex, pageSize]
  );

  useEffect(() => {
    setPagination({ pageIndex: fallbackPage - 1, pageSize: fallbackPerPage });
  }, [fallbackPage, fallbackPerPage]);

  useEffect(() => {
    const newPage = pageIndex + 1;
    const queryString = createQueryString({
      page: newPage,
      per_page: pageSize,
    });

    router.push(`${pathname}${queryString ? `?${queryString}` : ""}`, {
      scroll: false,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize]);

  const [sorting, setSorting] = useState<SortingState>([
    { id: column ?? "", desc: order === "desc" },
  ]);

  useEffect(() => {
    const queryString = createQueryString({
      page,
      sort: sorting[0]?.id
        ? `${sorting[0]?.id}.${sorting[0]?.desc ? "desc" : "asc"}`
        : null,
    });

    router.push(`${pathname}${queryString ? `?${queryString}` : ""}`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting]);

  // Handle server-side filtering
  const debouncedColumnFilters = JSON.parse(
    useDebounce(
      JSON.stringify(
        columnFilters.filter((filter) => {
          return searchableColumns.find((column) => column.id === filter.id);
        })
      ),
      500
    )
  ) as ColumnFiltersState;



  const filterableColumnFilters = debouncedColumnFilters.filter(filter => 
    filterableColumns.find(column => column.id === filter.id)
  );

  useEffect(() => {
    // Initialize new params
    const newParamsObject: Record<string, string | number | null> = {
      page: 1,
      per_page: 10,
    };

    // Handle global search
    const searchValue =
      debouncedColumnFilters.length > 0
        ? (debouncedColumnFilters[0].value as string)
        : null;
    if ( newParamsObject.search = searchValue) {
      Object.assign(newParamsObject, { search: newParamsObject.search });
    }

    // Handle filterable column filters
    for (const column of filterableColumnFilters) {
      if (typeof column.value === "object" && Array.isArray(column.value)) {
        Object.assign(newParamsObject, { [column.id]: column.value.join(".") });
      }
    }

    // Remove deleted values
    for (const key of searchParams.keys()) {
      if (
        key === "Search" && !searchValue ||
        (filterableColumns.find((column) => column.id === key) &&
          !filterableColumnFilters.find((column) => column.id === key))
      ) {
        Object.assign(newParamsObject, { [key]: null });
      }
    }

    // After cumulating all the changes, push new params
    router.push(`${pathname}?${createQueryString(newParamsObject)}`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(debouncedColumnFilters),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(filterableColumnFilters),
    pathname,
    createQueryString,
    router,
    searchParams,
    filterableColumns,
  ]);

  const dataTable = useReactTable({
    data,
    columns,
    pageCount: pageCount ?? -1,
    state: {
      pagination,
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
  });

  return { dataTable };
}