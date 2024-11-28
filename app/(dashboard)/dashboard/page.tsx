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
  const now = new Date();

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = new Intl.DateTimeFormat("vi-VN", { dateStyle: "full" }).format(
    now
  );
  return (
    <section className="flex size-full flex-col gap-5 text-white">
      <div className="h-[303px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          {/* <h2 className="glassmorphism max-w-[273px] rounded py-2 text-center text-base font-normal">
            Upcoming Meeting at: 12:30 PM
          </h2> */}
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
          <h2 className="glassmorphism max-w-[273px] rounded py-2 text-center text-base font-normal ">
            Bạn có 10 đơn trong hôm nay
          </h2>
        </div>
      </div>
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
      </div>
    </section>
  );
};

export default Dashboard;
