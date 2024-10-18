'use client';
import React from 'react';

const SettingPage = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-6">
      <div className="container mx-auto max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">

        <div className="space-y-8">
          {/* General Settings */}
          <section className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Cài đặt chung</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300">Ngôn ngữ</label>
                <select className="w-full p-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300">
                  <option value="en">English</option>
                  <option value="vn">Tiếng Việt</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300">Timezone</label>
                <select className="w-full p-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300">
                  <option value="UTC">UTC</option>
                  <option value="GMT+7">GMT+7</option>
                </select>
              </div>
            </div>
          </section>

          {/* Appearance Settings */}
          <section className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Hiển thị</h2>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div>
                <label className="block text-gray-700 dark:text-gray-300">Kích thước phông chữ</label>
                <select className="w-full p-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300">
                  <option value="small">Nhỏ</option>
                  <option value="medium">Vừa</option>
                  <option value="large">Lớn</option>
                </select>
              </div>
            </div>
          </section>

          <section className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Cài đặt tài khoản</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300">Tài khoản</label>
                <input
                  type="text"
                  value="user123"
                  className="w-full p-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300">Mật khẩu</label>
                <input
                  type="password"
                  value="******"
                  className="w-full p-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300"
                  readOnly
                />
              </div>
            </div>
          </section>

          <div className="flex justify-end">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md">
              Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
