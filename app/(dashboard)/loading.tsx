import React from 'react';

const DashboardSkeleton = () => {
  return (
    <div className="bg-gray-100 dark:bg-muted/40 min-h-screen p-4 md:p-6 rounded-md">
      <div className="chart-wrapper mx-auto flex max-w-6xl flex-col flex-wrap items-start justify-center gap-6 p-6 sm:flex-row sm:p-8">
        {/* Left column - Steps and Heart Rate charts */}
        <div className="grid w-full gap-6 sm:grid-cols-2 lg:max-w-[22rem] lg:grid-cols-1 xl:max-w-[25rem]">
          <div className="h-[300px] bg-white dark:bg-gray-800 rounded-lg animate-pulse" />
          <div className="h-[300px] bg-white dark:bg-gray-800 rounded-lg animate-pulse" />
        </div>

        {/* Middle column - Progress, Walking Distance, and Activity charts */}
        <div className="grid w-full flex-1 gap-6 lg:max-w-[20rem]">
          <div className="h-[200px] bg-white dark:bg-gray-800 rounded-lg animate-pulse" />
          <div className="h-[200px] bg-white dark:bg-gray-800 rounded-lg animate-pulse" />
          <div className="h-[200px] bg-white dark:bg-gray-800 rounded-lg animate-pulse" />
        </div>

        {/* Right column - Circle, Energy, and Time charts */}
        <div className="grid w-full flex-1 gap-6">
          <div className="h-[200px] bg-white dark:bg-gray-800 rounded-lg animate-pulse" />
          <div className="h-[200px] bg-white dark:bg-gray-800 rounded-lg animate-pulse" />
          <div className="h-[200px] bg-white dark:bg-gray-800 rounded-lg animate-pulse" />
        </div>
      </div>

      {/* User table skeleton */}
      <div className="bg-white dark:bg-muted/40 p-4 rounded-lg shadow-md">
        <div className="h-6 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-4 animate-pulse" />
        <div className="space-y-4">
          {/* Table header skeleton */}
          <div className="grid grid-cols-3 gap-4">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
          </div>
          
          {/* Table rows skeleton */}
          {[...Array(2)].map((_, index) => (
            <div key={index} className="grid grid-cols-3 gap-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
              <div className="h-8 bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
              <div className="h-8 bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;