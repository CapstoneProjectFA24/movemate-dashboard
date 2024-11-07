import React from 'react';
import { Phone, Mail, MessageCircle } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-6">
      {/* Header Section */}
      <section
        className="bg-cover bg-center h-80 flex items-center justify-center text-white mb-12"
        style={{ backgroundImage: `url('/images/landing/farm/contact.jpg')` }}
      >
        <h1 className="text-4xl font-bold text-black" color=''>Liên hệ với chúng tôi</h1>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-semibold mb-8">Hỗ trợ từ chúng tôi</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-6 shadow-md">
            <Phone className="text-orange-600 mx-auto mb-4" size={32} />
            <h3 className="text-xl font-semibold mb-2">Thông tin liên hệ</h3>
            <p>Các thông tin liên quan của MoveMate.</p>
          </div>

          <div className="border rounded-lg p-6 shadow-md">
            <Mail className="text-orange-600 mx-auto mb-4" size={32} />
            <h3 className="text-xl font-semibold mb-2">Email cho chúng tôi</h3>
            <p>Hãy gửi email cho chúng tôi để nhận phản hồi & tư vấn thắc mắc.</p>
          </div>

          <div className="border rounded-lg p-6 shadow-md">
            <MessageCircle className="text-orange-600 mx-auto mb-4" size={32} />
            <h3 className="text-xl font-semibold mb-2">Hỗ trợ trực tuyến</h3>
            <p>Sẵn sàng tư vấn và giải đáp mọi thắc mắc trực tuyến của bạn.</p>
          </div>
        </div>
      </section>

      {/* <div className="fixed bottom-4 right-4 space-y-3">
        <a href="/call" className="bg-green-600 p-3 rounded-full shadow-lg">
          <Phone size={24} className="text-white" />
        </a>
        <a href="/feedback" className="bg-green-600 p-3 rounded-full shadow-lg">
          <MessageCircle size={24} className="text-white" />
        </a>
        <a href="/support" className="bg-green-600 p-3 rounded-full shadow-lg">
          <Phone size={24} className="text-white" />
        </a>
      </div> */}
    </div>
  );
};

export default ContactPage;
