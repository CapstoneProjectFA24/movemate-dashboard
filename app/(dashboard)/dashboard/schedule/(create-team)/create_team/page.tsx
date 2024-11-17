"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";

import { Plus, ChevronDown, User } from 'lucide-react';
import { useTheme } from 'next-themes';

interface Driver {
  name: string;
  contact: string;
  vehicleType: string;
}

interface Porter {
  name: string;
  contact: string;
  shift: string;
}

interface Reviewer {
  name: string;
  contact: string;
  region: string;
}

type TableData = {
  driver: {
    data: Driver[];
    columns: string[];
    key: keyof Driver;
  };
  porter: {
    data: Porter[];
    columns: string[];
    key: keyof Porter;
  };
  rating: {
    data: Reviewer[];
    columns: string[];
    key: keyof Reviewer;
  };
};

const TeamManagement = () => {
  const { theme, setTheme } = useTheme();
  const [teamName, setTeamName] = useState('Tổ 1');
  const [activeTab, setActiveTab] = useState<'driver' | 'porter' | 'rating'>('driver');

  const [drivers] = useState<Driver[]>([
    { name: 'Nguyễn A', contact: '0909203029', vehicleType: 'Xe tải 1000kg' },
    { name: 'Trần B', contact: '0909203030', vehicleType: 'Xe tải 2000kg' },
  ]);

  const [porters] = useState<Porter[]>([
    { name: 'Lê X', contact: '0909203031', shift: 'Sáng' },
    { name: 'Phạm Y', contact: '0909203032', shift: 'Chiều' },
  ]);

  const [reviewers] = useState<Reviewer[]>([
    { name: 'Hoàng M', contact: '0909203033', region: 'Khu vực A' },
    { name: 'Phan N', contact: '0909203034', region: 'Khu vực B' },
  ]);

  const tableContent: TableData = {
    driver: {
      data: drivers,
      columns: ['Tên', 'Thông tin liên hệ', 'Loại xe'],
      key: 'vehicleType'
    },
    porter: {
      data: porters,
      columns: ['Tên', 'Thông tin liên hệ', 'Ca làm việc'],
      key: 'shift'
    },
    rating: {
      data: reviewers,
      columns: ['Tên', 'Thông tin liên hệ', 'Khu vực'],
      key: 'region'
    }
  };

  const getTableContent = () => {
    return tableContent[activeTab];
  };

  const renderTableCell = (item: Driver | Porter | Reviewer, key: string) => {
    return (item as any)[key];
  };

  return (
    <div className="min-h-screen transition-colors duration-200 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto p-6">

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <User className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="text-xl font-semibold bg-transparent border-b-2 border-gray-200 dark:border-gray-700 focus:border-orange-500 dark:focus:border-orange-400 outline-none text-gray-800 dark:text-gray-200"
              />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Số lượng nhân viên: {getTableContent().data.length}
              </span>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <div className="flex space-x-1">
                {[
                  { id: 'driver' as const, label: 'Tài xế' },
                  { id: 'porter' as const, label: 'Nhân viên bốc xếp' },
                  { id: 'rating' as const, label: 'Nhân viên đánh giá' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'bg-orange-500 text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-gray-800 rounded-lg">
            <div className="flex flex-col">
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th scope="col" className="w-12 px-6 py-3">
                            <input
                              type="checkbox"
                              className="w-4 h-4 rounded border-gray-300 dark:border-gray-600"
                            />
                          </th>
                          {getTableContent().columns.map((column) => (
                            <th
                              key={column}
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                            >
                              {column}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {getTableContent().data.map((item, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                type="checkbox"
                                className="w-4 h-4 rounded border-gray-300 dark:border-gray-600"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900 dark:text-gray-100">
                                {item.name}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900 dark:text-gray-100">
                                {item.contact}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900 dark:text-gray-100">
                                {renderTableCell(item, getTableContent().key)}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex justify-end">
            <button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200">
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamManagement;