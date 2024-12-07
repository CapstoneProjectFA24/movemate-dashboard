import React from "react";
import StatisticFilterDate from "./_components/statistic-filter-date";

export interface SearchParamFilterDashboard {
  shard?: string;
  type?: string;
}

const Dashboard = ({
  searchParams,
}: {
  searchParams: SearchParamFilterDashboard;
}) => {

  console.log(searchParams)
  return (
    <div className="flex flex-col">
      <div className="flex justify-end">
        <StatisticFilterDate searchParams= {searchParams} />
      </div>

      <div>dashboard</div>
    </div>
  );
};

export default Dashboard;
