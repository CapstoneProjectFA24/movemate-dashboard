// pages/about.js

import React from 'react';

const About = () => {
  return (
      <section className="py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          Về chúng tôi
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          MoveMate là một nền tảng giúp bạn dễ dàng quản lý và tổ chức các dịch vụ chuyển nhà. Chúng tôi cung cấp giải pháp toàn diện từ các dịch vụ thiết yếu cho đến cơ hội gia tăng thu nhập. 
        </p>
        {/* You can add more content about your service/company here */}
      </section>
  );
};

export default About;
