// import React from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react";
// import { getStatisTicTransation } from "@/features/statistic/action/statistic";

// export interface SearchParamFilterDashboard {
//   shard?: string;
//   type?: string;
//   isSummary?: boolean;
// }

// export const formatter = new Intl.NumberFormat('vi-VN', {
//   currency: 'VND',
// });

// const WalletSystem = async ({
//   searchParams,
// }: {
//   searchParams: SearchParamFilterDashboard;
// }) => {
//   const [statisticTransactionData] = await Promise.all([
//     getStatisTicTransation(searchParams),
//   ]);

//   const totalIncome = statisticTransactionData?.data[0].totalIncome || 0;
//   const totalCompensation = statisticTransactionData?.data[0].totalCompensation || 0;
//   const profit = totalIncome - totalCompensation;

//   return (
//     <div className="flex flex-col space-y-2">
//       <div className="flex items-center space-x-2 mb-6">
//         <Activity className="h-6 w-6 text-orange-600" />
//         <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
//           Tổng quan
//         </h1>
//       </div>

//       {/* Metric Cards */}
//       <Card className="hover:shadow-lg transition-shadow duration-200 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 w-full overflow-hidden">
//         <CardHeader className="flex flex-row items-center justify-between pb-2">
//           <CardTitle className="text-sm font-medium">Tổng Thu Nhập</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex justify-between items-center w-full">
//             <div className="text-2xl font-bold text-green-600 dark:text-green-400 overflow-hidden text-ellipsis whitespace-nowrap">
//               {formatter.format(totalIncome)}
//             </div>
//             <span className="text-sm ml-2 text-green-600 dark:text-green-400 overflow-hidden text-ellipsis whitespace-nowrap">đ</span>
//           </div>
//         </CardContent>
//       </Card>

//       <Card className="hover:shadow-lg transition-shadow duration-200 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-red-800 w-full overflow-hidden">
//         <CardHeader className="flex flex-row items-center justify-between pb-2">
//           <CardTitle className="text-sm font-medium">Tổng Bồi Thường</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex justify-between items-center w-full">
//             <div className="text-2xl font-bold text-red-600 dark:text-red-400 overflow-hidden text-ellipsis whitespace-nowrap">
//               {formatter.format(totalCompensation)}
//             </div>
//             <span className="text-sm ml-2 text-red-600 dark:text-red-400 overflow-hidden text-ellipsis whitespace-nowrap">đ</span>
//           </div>
//         </CardContent>
//       </Card>

//       <Card className="hover:shadow-lg transition-shadow duration-200 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 w-full overflow-hidden">
//         <CardHeader className="flex flex-row items-center justify-between pb-2">
//           <CardTitle className="text-sm font-medium">Lợi Nhuận</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex justify-between items-center w-full">
//             <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 overflow-hidden text-ellipsis whitespace-nowrap">
//               {formatter.format(profit)}
//             </div>
//             <span className="text-sm ml-2 text-blue-600 dark:text-blue-400 overflow-hidden text-ellipsis whitespace-nowrap">đ</span>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default LeftStatistic;