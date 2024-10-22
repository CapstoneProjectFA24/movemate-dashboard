"use client";

import StepsChart from "@/components/shared/dashboard/chart-dashboard/step-chart";
import HeartRateChart from "@/components/shared/dashboard/chart-dashboard/heart-rate-chart";
import ActivityChart from "@/components/shared/dashboard/chart-dashboard/activity-chart";
import ProgressChart from "@/components/shared/dashboard/chart-dashboard/progress-chart";
import WalkingDistanceChart from "@/components/shared/dashboard/chart-dashboard/walking-distance-chart";
import ActiveEnergyChart from "@/components/shared/dashboard/chart-dashboard/activity-energy";
import TimeChart from "@/components/shared/dashboard/chart-dashboard/time-chart";
import CircleChart from "@/components/shared/dashboard/chart-dashboard/circle-chart";

const Dashboard = () => {
  const stepsData = [
    { date: "2024-01-01", steps: 2000 },
    { date: "2024-01-02", steps: 2100 },
    { date: "2024-01-03", steps: 2200 },
    { date: "2024-01-04", steps: 1300 },
    { date: "2024-01-05", steps: 1400 },
    { date: "2024-01-06", steps: 2500 },
    { date: "2024-01-07", steps: 1600 },
  ];

  const heartRateData = [
    { date: "2024-01-01", resting: 62 },
    { date: "2024-01-02", resting: 72 },
    { date: "2024-01-03", resting: 35 },
    { date: "2024-01-04", resting: 62 },
    { date: "2024-01-05", resting: 52 },
    { date: "2024-01-06", resting: 62 },
    { date: "2024-01-07", resting: 70 },
  ];

  const sleepData = [
    { date: "2024-01-01", time: 8.5 },
    { date: "2024-01-02", time: 7.2 },
    { date: "2024-01-03", time: 8.1 },
    { date: "2024-01-04", time: 6.2 },
    { date: "2024-01-05", time: 5.2 },
    { date: "2024-01-06", time: 8.1 },
    { date: "2024-01-07", time: 7.0 },
  ];

  const activityData = [
    {
      activity: "stand",
      value: (8 / 12) * 100,
      label: "8/12 hr",
      fill: "var(--color-stand)",
    },
    {
      activity: "exercise",
      value: (46 / 60) * 100,
      label: "46/60 min",
      fill: "var(--color-exercise)",
    },
    {
      activity: "move",
      value: (245 / 360) * 100,
      label: "245/360 kcal",
      fill: "var(--color-move)",
    },
  ];

  const progressData = {
    currentYearData: { year: "2024", steps: 12453 },
    previousYearData: { year: "2023", steps: 10103 },
  };

  return (
    <div className="bg-gray-100 dark:bg-muted/40 min-h-screen p-4 md:p-6 rounded-md">
      <div className="chart-wrapper mx-auto flex max-w-6xl flex-col flex-wrap items-start justify-center gap-6 p-6 sm:flex-row sm:p-8">
        <div className="grid w-full gap-6 sm:grid-cols-2 lg:max-w-[22rem] lg:grid-cols-1 xl:max-w-[25rem]">
          <StepsChart data={stepsData} />
          <HeartRateChart data={heartRateData} />
        </div>
        <div className="grid w-full flex-1 gap-6 lg:max-w-[20rem]">
          <ProgressChart
            currentYearData={progressData.currentYearData}
            previousYearData={progressData.previousYearData}
          />

          <WalkingDistanceChart data={stepsData} averageDistance={12.5} />

          <ActivityChart data={activityData} />
        </div>
        <div className="grid w-full flex-1 gap-6">
          <CircleChart data={activityData} />
          <ActiveEnergyChart energyData={stepsData} />
          <TimeChart sleepData={sleepData} />
        </div>
      </div>

      <div className="bg-white dark:bg-muted/40 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2">Danh sách người dùng</h2>
        <table className="min-w-full border-collapse border border-gray-200 dark:border-gray-700">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 text-left">Tên</th>
              <th className="border border-gray-300 p-2 text-left">Email</th>
              <th className="border border-gray-300 p-2 text-left">
                Trạng thái
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">Nguyễn Văn A</td>
              <td className="border border-gray-300 p-2">vana@example.com</td>
              <td className="border border-gray-300 p-2">Hoạt động</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Trần Thị B</td>
              <td className="border border-gray-300 p-2">btran@example.com</td>
              <td className="border border-gray-300 p-2">Ngừng hoạt động</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
