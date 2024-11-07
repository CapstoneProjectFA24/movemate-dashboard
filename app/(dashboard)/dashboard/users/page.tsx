"use client";

import React, { useState } from 'react';

// Define User type
interface User {
  name: string;
  status: string;
  rating: number;
  phone?: string; 
  truckInfo?: string;  
}

const UserPage = () => {
  const [activeTab, setActiveTab] = useState('driver');

  // Static data representing user information
  const driverInfo: User[] = [
    { name: 'Nguyen Van A', status: 'Active', rating: 4.5, phone: '0123456789', truckInfo: '2.5 tấn' },
    { name: 'Tran Van B', status: 'Inactive', rating: 3.8, phone: '0987654321', truckInfo: '1.5 tấn' },
  ];

  const porterInfo: User[] = [
    { name: 'Le Van C', status: 'Active', rating: 4.2, phone: '0234567890' },
    { name: 'Pham Thi D', status: 'Inactive', rating: 4.0, phone: '0345678901' },
  ];

  const reviewerInfo: User[] = [
    { name: 'Hoang Van E', status: 'Active', rating: 4.8, phone: '0456789012' },
    { name: 'Do Thi F', status: 'Active', rating: 4.6, phone: '0567890123' },
  ];

  // Define statuses for each role
  const driverStatuses = ['EnRoute', 'Arrived', 'Failed', 'InProgress', 'Completed'];
  const porterStatuses = ['EnRoute', 'Arrived', 'Failed', 'InProgress', 'Completed'];
  const reviewerStatuses = ['EnRoute', 'Arrived', 'Failed', 'InProgress', 'Reviewed'];

  // Function to handle status changes
  const handleStatusChange = (index: number, newStatus: string, type: string) => {
    console.log(`Updated ${type} ${index} to status: ${newStatus}`);
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Thông tin nhân viên</h2>

      {/* Tab Navigation */}
      <div className="flex gap-4 mb-6">
        {['driver', 'porter', 'reviewer'].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 font-medium rounded ${activeTab === tab ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'driver' ? 'Tài xế' : tab === 'porter' ? 'Bốc vác' : 'Người đánh giá'}
          </button>
        ))}
      </div>

      <div className="bg-white p-4 rounded-lg shadow-inner">
        {activeTab === 'driver' && (
          <UserList users={driverInfo} type="driver" onStatusChange={handleStatusChange} statuses={driverStatuses} />
        )}
        {activeTab === 'porter' && (
          <UserList users={porterInfo} type="porter" onStatusChange={handleStatusChange} statuses={porterStatuses} />
        )}
        {activeTab === 'reviewer' && (
          <UserList users={reviewerInfo} type="reviewer" onStatusChange={handleStatusChange} statuses={reviewerStatuses} />
        )}
      </div>
    </div>
  );
};

// User List Component with Status Dropdown
interface UserListProps {
  users: User[];
  type: string;
  onStatusChange: (index: number, newStatus: string, type: string) => void;
  statuses: string[];
}

const UserList: React.FC<UserListProps> = ({ users, type, onStatusChange, statuses }) => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null); // State to track the open dropdown

  const toggleDropdown = (index: number) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index); // Toggle open/close
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Thông tin {type === 'driver' ? 'tài xế' : type === 'porter' ? 'bốc vác' : 'người đánh giá'}</h3>
      {users.map((user, index) => (
        <div key={index} className="border-b border-gray-200 py-2">
          <p className="font-semibold">Tên: {user.name}</p>
          {user.phone && <p className="text-sm">Số điện thoại: {user.phone}</p>}
          {user.truckInfo && <p className="text-sm">Thông tin xe tải: {user.truckInfo}</p>}
          <div className="relative inline-block text-left">
            <button
              className="text-sm bg-gray-100 p-2 rounded-md hover:bg-gray-200"
              onClick={() => toggleDropdown(index)}
            >
              Trạng thái: {user.status} ▼
            </button>
            {/* Conditionally render the dropdown based on the openDropdownIndex */}
            {openDropdownIndex === index && (
              <div className="absolute mt-1 w-32 rounded-md bg-white shadow-lg z-10">
                {statuses.map((status) => (
                  <div
                    key={status}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => onStatusChange(index, status, type)}
                  >
                    {status}
                  </div>
                ))}
              </div>
            )}
          </div>
          <p>Đánh giá: {user.rating} ★</p>
        </div>
      ))}
    </div>
  );
};

export default UserPage;
