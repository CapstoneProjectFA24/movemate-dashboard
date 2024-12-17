"use client";
import { Icons } from "@/components/shared/landing/icons";
import MaxWidthWrapper from "@/components/shared/landing/max-width-wrapper";
import Phone from "@/components/shared/landing/phone";
import { Reviews } from "@/components/shared/landing/reviews";
import { Check, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "nextjs-toploader/app";

export default function Home() {
  const router = useRouter();

  return (
    <div className="bg-slate-50 grainy-light dark:bg-gray-800 dark:text-gray-200">
      <section className="dark:bg-gray-700">
        <MaxWidthWrapper className="pb-12 lg:grid lg:grid-cols-3 sm:pb-24 lg:gap-x-0 dark:bg-gray-700">
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
            <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
              <h1 className="relative w-fit tracking-tight mt-8 font-bold !leading-tight text-gray-900 dark:text-gray-100 text-5xl md:text-6xl lg:text-7xl">
                Ứng dụng{"  "}
                <span className="bg-orange-600 px-2 text-white rounded-2xl ">
                  {" "}
                  dịch vụ chuyển nhà
                </span>{" "}
              </h1>
              <p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance">
                <span className="font-semibold">MoveMate</span> – Dịch vụ chuyển
                nhà hoàn hảo dành cho bạn. Chúng tôi mang đến trải nghiệm chuyển
                nhà chuyên nghiệp, an toàn và nhanh chóng, giúp bạn chuyển nhà
                một cách dễ dàng hơn bao giờ hết.
              </p>

              <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
                <div className="space-y-2">
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-orange-600" />{" "}
                    Chuyển nhà dễ dàng, an tâm từng bước
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-orange-600" />
                    Dịch vụ trọn gói, đảm bảo an toàn cho mọi tài sản
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-orange-600" />
                    Giải pháp chuyển nhà tối ưu, giúp bạn tiết kiệm công sức
                  </li>
                </div>
              </ul>

              <div className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="flex -space-x-4">
                  <Image
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                    src="/images/landing/users/user-x1.jpg"
                    alt="user image"
                    width={40}
                    height={40}
                  />
                  <Image
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                    src="/images/landing/users/user-x2.jpg"
                    alt="user image"
                    width={40}
                    height={40}
                  />
                  <Image
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                    src="/images/landing/users/user-x3.jpg"
                    alt="user image"
                    width={40}
                    height={40}
                  />
                  <Image
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                    src="/images/landing/users/user-y.jpg"
                    alt="user image"
                    width={40}
                    height={40}
                  />
                  <Image
                    className="inline-block object-cover h-10 w-10 rounded-full ring-2 ring-slate-100"
                    src="/images/landing/users/user-yy.jpg"
                    alt="user image"
                    width={40}
                    height={40}
                  />
                </div>

                <div className="flex flex-col justify-between items-center sm:items-start">
                  <div className="flex gap-0.5">
                    <Star className="h-4 w-4 text-orange-600 fill-orange-600" />
                    <Star className="h-4 w-4 text-orange-600 fill-orange-600" />
                    <Star className="h-4 w-4 text-orange-600 fill-orange-600" />
                    <Star className="h-4 w-4 text-orange-600 fill-orange-600" />
                    <Star className="h-4 w-4 text-orange-600 fill-orange-600" />
                  </div>
                  <p>
                    <span className="font-semibold">1.250 </span> Khách hàng hài
                    lòng - Dịch vụ uy tín
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit">
            <div className="relative md:max-w-xl">
              <Image
                src="/images/landing/farm/veg-cartoon6.png"
                alt="Moving cartoon"
                width={208}
                height={208}
                className="absolute w-40 lg:w-52 left-56 -top-20 select-none hidden sm:block lg:hidden xl:block"
              />
              <Image
                src="/images/landing/line.png"
                alt="Line graphic"
                width={80}
                height={80}
                className="absolute w-20 -left-6 -bottom-6 select-none"
              />
              <Phone className="w-64" imgSrc="/images/landing/farm/spash.png" />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
      <section className="bg-slate-100 grainy-dark dark:bg-gray-700">
        <MaxWidthWrapper className="flex flex-col items-center">
          <section className="bg-orange-600 dark:bg-orange-500 w-full">
            <div className="max-w-7xl mx-auto">
              <div className="w-full">
                <button
                  onClick={() => router.push("/sign-up")}
                  className="w-full px-4 py-3 text-white bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-center text-lg font-bold"
                >
                  Đăng kí làm nhân viên của chúng tôi
                </button>
              </div>
            </div>
          </section>

          <div className="flex flex-col lg:flex-row items-center gap-4 mt-16">
            <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900 dark:text-gray-100">
              Về MoveMate{" "}
              <span>
                <Icons.underline className="hidden sm:block pointer-events-none absolute inset-x-0 -bottom-6 text-orange-500" />
              </span>
            </h2>
          </div>
          <h4 className="font-semibold text-gray-800 dark:text-gray-200 leading-snug">
            Từ những dịch vụ thiết yếu đến cơ hội gia tăng thu nhập. Tất cả đều
            có trên một nền tảng.
          </h4>
        </MaxWidthWrapper>
      </section>
      {/* Review Section */}
      <section className="py-8 lg:py-24 bg-slate-100 grainy-dark  dark:bg-gray-700">
        <MaxWidthWrapper className="flex flex-col items-center">
          <Reviews />
        </MaxWidthWrapper>
      </section>

      <div className="text-center p-8 grainy-dark dark:bg-gray-700 bg-slate-100">
        <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-3xl md:text-4xl text-gray-900 dark:text-gray-100">
          CHUYỂN NHÀ MOVEMATE GIẢI PHÁP VẬN CHUYỂN RẺ NHẤT THỊ TRƯỜNG
        </h2>
        <h2 className="text-2xl font-bold text-orange-600 mb-8">
          QUY TRÌNH VẬN CHUYỂN
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <i className="fas fa-file-alt text-6xl text-red-600 mb-4"></i>
            <h3 className="text-xl font-bold mb-2">
              BƯỚC 1: TIẾP NHẬN THÔNG TIN KHÁCH HÀNG
            </h3>
            <p>
              Nhân viên tư vấn sẽ trao đổi với khách hàng để nắm bắt thông tin
              cá nhân, địa điểm chuyển đi và chuyển đến, số lượng hàng hóa, thời
              gian, khả năng chi để lên kế hoạch chi tiết.
            </p>
          </div>
          <div className="text-center">
            <i className="fas fa-users text-6xl text-red-600 mb-4"></i>
            <h3 className="text-xl font-bold mb-2">
              BƯỚC 2: KHẢO SÁT BÁO GIÁ & KÝ HỢP ĐỒNG
            </h3>
            <p>
              Đội ngũ chuyên viên công ty đến hiện trường để khảo sát trực tiếp
              địa hình, khối lượng đồ dùng, báo giá chính xác cho khách hàng và
              tiến hành ký hợp đồng dịch vụ vận chuyển.
            </p>
          </div>
          <div className="text-center">
            <i className="fas fa-truck-moving text-6xl text-red-600 mb-4"></i>
            <h3 className="text-xl font-bold mb-2">
              BƯỚC 3: TRIỂN KHAI DỊCH VỤ VẬN CHUYỂN
            </h3>
            <p>
              Nhân viên vận chuyển thực hiện công việc theo đúng tiến độ, thời
              gian đã thỏa thuận với Quý khách. Triển khai các hạng mục một cách
              nhanh chóng, đảm bảo an toàn, hạn chế tối đa rủi ro.
            </p>
          </div>
          <div className="text-center">
            <i className="fas fa-hand-holding-usd text-6xl text-red-600 mb-4"></i>
            <h3 className="text-xl font-bold mb-2">
              BƯỚC 4: NGHIỆM THU & THANH TOÁN
            </h3>
            <p>
              Khi công việc vận chuyển hoàn thành, khách hàng và nhân viên công
              ty sẽ nghiệm thu, bàn giao công trình. Cuối cùng, hai bên sẽ tiến
              hành thanh lý hợp đồng dịch vụ vận chuyển.
            </p>
          </div>
        </div>
      </div>
      {/* About the Project Section */}
      <section className="bg-slate-100 grainy-dark py-24 dark:bg-gray-700">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-32">
          <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
            <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900 dark:text-gray-100">
              Đánh giá của khách hàng{" "}
              <span className="relative px-2">
                <Icons.underline className="hidden sm:block pointer-events-none absolute inset-x-0 -bottom-6 text-orange-500" />
              </span>
            </h2>
            <Image
              src="/images/landing/farm/veg-cartoon.png"
              alt="Veg cartoon"
              width={96}
              height={96}
              className="w-24 order-0 lg:order-2"
            />
          </div>

          <div className="mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 gap-y-16">
            <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="flex gap-0.5 mb-2">
                <Star className="h-5 w-5 text-orange-600 fill-orange-600" />
                <Star className="h-5 w-5 text-orange-600 fill-orange-600" />
                <Star className="h-5 w-5 text-orange-600 fill-orange-600" />
                <Star className="h-5 w-5 text-orange-600 fill-orange-600" />
                <Star className="h-5 w-5 text-orange-600 fill-orange-600" />
              </div>
              <div className="text-lg leading-8">
                <p>
                  Chúng tôi phát triển Movemate với mục tiêu tạo ra một nền tảng
                  kết nối giữa những người cần dịch vụ dọn dẹp và chuyển nhà với
                  những người cung cấp dịch vụ này. Chúng tôi tin rằng, việc
                  chuyển nhà không chỉ đơn thuần là di chuyển đồ đạc mà còn là
                  một hành trình mang lại những trải nghiệm mới và xây dựng cộng
                  đồng.
                </p>
              </div>
            </div>

            <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="flex gap-0.5 mb-2">
                <Star className="h-5 w-5 text-orange-600 fill-orange-600" />
                <Star className="h-5 w-5 text-orange-600 fill-orange-600" />
                <Star className="h-5 w-5 text-orange-600 fill-orange-600" />
                <Star className="h-5 w-5 text-orange-600 fill-orange-600" />
                <Star className="h-5 w-5 text-orange-600 fill-orange-600" />
              </div>
              <div className="text-lg leading-8">
                <p>
                  Dự án của chúng tôi không chỉ tập trung vào việc cung cấp dịch
                  vụ dọn dẹp, mà còn mang lại các nguồn lực và kiến thức cho
                  người dùng. Chúng tôi cung cấp thông tin hữu ích và mẹo từ các
                  chuyên gia, giúp bạn có thể dễ dàng quản lý quá trình chuyển
                  nhà một cách hiệu quả và thoải mái nhất.
                </p>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
