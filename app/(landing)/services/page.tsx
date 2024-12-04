"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MaxWidthWrapper from "@/components/shared/landing/max-width-wrapper";
import Image from "next/image";

const Services = () => {
  const [activeTab, setActiveTab] = useState("services1");

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="dark:bg-gray-700 bg-slate-50 dark:text-gray-200 min-h-screen">
      <MaxWidthWrapper className="flex-1 py-12 sm:py-24">
        <Slider {...sliderSettings}>
          <div>
            <Image
              src="/images/landing/farm/slider1.png"
              alt="anh 1"
              width={320}
              height={160}
              className="max-w-xs max-h-40 rounded-lg mx-auto"
            />
          </div>
          <div>
            <Image
              src="/images/landing/farm/slider2.jpg"
              alt="anh 2"
              width={320}
              height={160}
              className="max-w-xs max-h-40 rounded-lg mx-auto "
            />
          </div>
          <div>
            <Image
              src="/images/landing/farm/veg-cartoon6.png"
              alt="Mô tả ảnh 3"
              width={320}
              height={160}
              className="max-w-xs max-h-40 rounded-lg mx-auto"
            />
          </div>
        </Slider>

        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Bảng giá thuê xe
        </h2>

        <div className={`price-table ${isVisible ? "fade-in" : ""}`}>
          <table className="table-fixed w-full border-collapse border border-gray-400 text-gray-700 dark:text-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-400 p-2">Loại xe</th>
                <th className="border border-gray-400 p-2">Cước ban đầu</th>
                <th className="border border-gray-400 p-2">4-10 km</th>
                <th className="border border-gray-400 p-2">10-15 km</th>
                <th className="border border-gray-400 p-2">15-45 km</th>
                <th className="border border-gray-400 p-2">45-80 km</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-400 p-2">Xe van 500kg</td>
                <td className="border border-gray-400 p-2">111.780đ</td>
                <td className="border border-gray-400 p-2">10.800đ/km</td>
                <td className="border border-gray-400 p-2">7.560đ/km</td>
                <td className="border border-gray-400 p-2">5.940đ/km</td>
                <td className="border border-gray-400 p-2">4.860đ/km</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">Xe van 1000kg</td>
                <td className="border border-gray-400 p-2">148.500đ</td>
                <td className="border border-gray-400 p-2">12.420đ/km</td>
                <td className="border border-gray-400 p-2">9.720đ/km</td>
                <td className="border border-gray-400 p-2">7.020đ/km</td>
                <td className="border border-gray-400 p-2">5.400đ/km</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">Xe tải 500kg</td>
                <td className="border border-gray-400 p-2">111.780đ</td>
                <td className="border border-gray-400 p-2">10.800đ/km</td>
                <td className="border border-gray-400 p-2">7.560đ/km</td>
                <td className="border border-gray-400 p-2">5.940đ/km</td>
                <td className="border border-gray-400 p-2">4.860đ/km</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">Xe tải 1000kg</td>
                <td className="border border-gray-400 p-2">148.500đ</td>
                <td className="border border-gray-400 p-2">12.420đ/km</td>
                <td className="border border-gray-400 p-2">9.720đ/km</td>
                <td className="border border-gray-400 p-2">7.020đ/km</td>
                <td className="border border-gray-400 p-2">5.400đ/km</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">Xe tải 2000kg</td>
                <td className="border border-gray-400 p-2">260.280đ</td>
                <td className="border border-gray-400 p-2">13.500đ/km</td>
                <td className="border border-gray-400 p-2">10.800đ/km</td>
                <td className="border border-gray-400 p-2">7.020đ/km</td>
                <td className="border border-gray-400 p-2">5.940đ/km</td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2">Xe tải 2500kg</td>
                <td className="border border-gray-400 p-2">355.860đ</td>
                <td className="border border-gray-400 p-2">15.120đ/km</td>
                <td className="border border-gray-400 p-2">12.420đ/km</td>
                <td className="border border-gray-400 p-2">9.720đ/km</td>
                <td className="border border-gray-400 p-2">9.180đ/km</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex space-x-4 border-b border-gray-300 mb-6 pt-8">
          <button
            className={`py-2 ${
              activeTab === "services1"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("services1")}
          >
            Dịch vụ bốc xếp
          </button>
          <button
            className={`py-2 ${
              activeTab === "services2"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("services2")}
          >
            Dịch vụ tháo lắp/đóng gói
          </button>
        </div>

        {activeTab === "services1" && (
          <div data-aos="fade-left">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-6">
              Dịch Vụ Bốc Xếp
            </h2>

            <div data-aos="fade-left" className="mt-4">
              <h3 className="font-semibold">Bốc Xếp (Bởi Tài Xế)</h3>
              <p>
                👉 Phí cơ bản: <strong>120.000đ/người/xe</strong> cho tối đa 3
                tầng. Nếu công trình có từ 4 đến 5 tầng, giá sẽ tăng thêm 20%
                cho mỗi tầng. Đối với những công trình trên 5 tầng, mức tăng là
                25%. <br />
                🛠️ Bao gồm: Hỗ trợ bốc xếp hàng hóa bởi tài xế (không bao gồm
                nhân viên bốc xếp chuyên nghiệp).
              </p>
            </div>

            <div data-aos="fade-left" className="mt-4">
              <h3 className="font-semibold">Bốc Xếp (Bởi Nhân Viên Bốc Xếp)</h3>
              <p>
                👉 Phí cơ bản: <strong>400.000đ/người</strong> cho tối đa 3
                tầng. Tăng giá theo tầng: từ 4 đến 5 tầng, giá sẽ tăng thêm 20%
                cho mỗi tầng. Với những công trình trên 5 tầng, mức tăng là 25%.{" "}
                <br />
                🛠️ Bao gồm: Nhân viên bốc xếp chuyên nghiệp đảm bảo hàng hóa
                được xử lý an toàn và nhanh chóng.
              </p>
            </div>

            <div data-aos="fade-left" className="mt-4">
              <h3 className="font-semibold">
                Bốc Xếp Sử Dụng Thang Máy Nhỏ Hoặc Không Có Thang Máy
              </h3>
              <p>
                👉 Phí: <strong>100.000đ/tầng</strong>.
              </p>
            </div>

            <div data-aos="fade-left" className="mt-4">
              <h3 className="font-semibold">
                Bốc Xếp Tại Địa Điểm Khó Tiếp Cận 🚧
              </h3>
              <p>
                👉 Phí thêm: <strong>20.000đ cho mỗi 10m</strong>, tối đa 50 đơn
                vị. <br />
                🛠️ Bao gồm: Phí áp dụng cho những địa điểm mà xe tải không thể
                đến gần, cần di chuyển hàng hóa qua quãng đường dài.
              </p>
            </div>
          </div>
        )}

        {activeTab === "services2" && (
          <div data-aos="fade-left">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-6">
              Dịch Vụ Tháo Lắp và Đóng Gói
            </h2>
            <h3 className="font-semibold">Tháo Lắp, Đóng Gói Máy Lạnh</h3>
            <p>
              👉 Phí: <strong>300.000đ/bộ</strong>. <br /> 🛠️ Bao gồm: Dịch vụ
              tháo lắp và đóng gói điều hòa...
            </p>

            <h3 className="font-semibold">
              Tháo Lắp, Đóng Gói Các Đồ Vật Khác
            </h3>
            <p>
              👉 Phí: <strong>150.000đ/bộ</strong> cho đồ vật nhỏ (≤5kg),{" "}
              <strong>300.000đ/bộ</strong> cho đồ vật lớn...
            </p>
          </div>
        )}
      </MaxWidthWrapper>
    </div>
  );
};

export default Services;
