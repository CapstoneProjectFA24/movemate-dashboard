"use server";

import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { axiosAuth } from "@/lib/api/api-interceptor/api";
import {
  Result,
  ApiListResponse,
  ApiSingleResponse,
  apiRequest,
  fetchListData,
  fetchSingleData,
} from "@/lib/api/api-handler/generic";
import { SearchParams } from "@/types/table";
import { BASIC_URL } from "@/constants/api-constant";
import { IStatisticTransaction } from "../types/statistic-transation-type";
import { IStatisticBooking } from "../types/statistic-booking-type";
import { IStatisticTruckCategory } from "../types/statistic-truckcategory-type";
import { IStatisticUser } from "../types/statistic-user-type";
import { IStatisticGroup } from "../types/statistic-group-type";
import { IStatisticPromtion } from "../types/statistic-promotions-type";
export interface SearchParamFilterDashboard {
  shard?: string;
  type?: string;
}
// list và có thể có query
export async function getStatisTicTransation(
  searchParams: SearchParamFilterDashboard
): Promise<ApiListResponse<IStatisticTransaction>> {
  noStore();

  const result = await fetchListData<IStatisticTransaction>(
    `${BASIC_URL.STATISTIC}/transactions`,
    searchParams
  );
  if (!result.success) {
    console.error("Failed to fetch IStatisticTransaction:", result.error);
    return { data: [], pageCount: 0, error: result.error };
  }
  return result.data;
}
export async function getStatisTicTransationCustom(): Promise<
  ApiListResponse<IStatisticTransaction>
> {
  noStore();

  const result = await fetchListData<IStatisticTransaction>(
    `${BASIC_URL.STATISTIC}/transactions?shard=202406-202412&isSummary=false`
  );
  if (!result.success) {
    console.error("Failed to fetch IStatisticTransaction:", result.error);
    return { data: [], pageCount: 0, error: result.error };
  }
  return result.data;
}
export async function getStatisTicTransationNoSumary(): Promise<
  ApiListResponse<IStatisticTransaction>
> {
  noStore();

  const result = await fetchListData<IStatisticTransaction>(
    `${BASIC_URL.STATISTIC}/transactions?type=MONTHNOW`
  );
  if (!result.success) {
    console.error("Failed to fetch IStatisticTransaction:", result.error);
    return { data: [], pageCount: 0, error: result.error };
  }
  return result.data;
}

export async function getStatisTicBooking(
  searchParams: SearchParamFilterDashboard
): Promise<ApiListResponse<IStatisticBooking>> {
  noStore();

  const result = await fetchListData<IStatisticBooking>(
    `${BASIC_URL.STATISTIC}/bookings`,
    searchParams
  );
  if (!result.success) {
    console.error("Failed to fetch IStatisticBooking:", result.error);
    return { data: [], pageCount: 0, error: result.error };
  }
  return result.data;
}

export async function getStatisTicUser(): Promise<
  ApiListResponse<IStatisticUser>
> {
  noStore();

  const result = await fetchListData<IStatisticUser>(
    `${BASIC_URL.STATISTIC}/users`
  );
  if (!result.success) {
    console.error("Failed to fetch IStatisticUser:", result.error);
    return { data: [], pageCount: 0, error: result.error };
  }
  return result.data;
}

// object và không cần query
export async function getStatisTicGroup(): Promise<
  ApiSingleResponse<IStatisticGroup>
> {
  noStore();

  const result = await fetchSingleData<IStatisticGroup>(
    `${BASIC_URL.STATISTIC}/groups`
  );
  if (!result.success) {
    console.error("Failed to fetch IStatisticTruckCategory:", result.error);
    return { data: null, error: result.error };
  }
  return result.data;
}
export async function getStatisTicTruckCategory(): Promise<
  ApiSingleResponse<IStatisticTruckCategory>
> {
  noStore();

  const result = await fetchSingleData<IStatisticTruckCategory>(
    `${BASIC_URL.STATISTIC}/truckcategoris`
  );
  if (!result.success) {
    console.error("Failed to fetch IStatisticTruckCategory:", result.error);
    return { data: null, error: result.error };
  }
  return result.data;
}


export async function getStatisTicPromotion(): Promise<
  ApiSingleResponse<IStatisticPromtion>
> {
  noStore();

  const result = await fetchSingleData<IStatisticPromtion>(
    `${BASIC_URL.STATISTIC}/promotions`
  );
  if (!result.success) {
    console.error("Failed to fetch IStatisticPromtion:", result.error);
    return { data: null, error: result.error };
  }
  return result.data;
}
//   export async function getHousesSearchParams(
//     searchParams: SearchParams
//   ): Promise<ApiListResponse<IHouse>> {
//     noStore();

//     const result = await fetchListData<IHouse>(
//       SERVICES_URL.GET_HOUSE_TYPE,
//       searchParams
//     );
//     if (!result.success) {
//       console.error("Failed to fetch housetypes:", result.error);
//       return { data: [], pageCount: 0, error: result.error };
//     }
//     return result.data;
//   }
