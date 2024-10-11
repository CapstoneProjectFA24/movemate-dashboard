import { Icons } from "@/components/shared/landing/icons";
import MaxWidthWrapper from "@/components/shared/landing/max-width-wrapper";
import Phone from "@/components/shared/landing/phone";
import { Reviews } from "@/components/shared/landing/reviews";
import { Check, Star } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-slate-50 grainy-light dark:bg-gray-800 dark:text-gray-200">
      {" "}
      <section className="bg-slate-100 grainy-dark py-24 dark:bg-gray-700">
        <MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52 dark:bg-gray-700">
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
            <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
              <div className="absolute w-28 left-0 -top-20 hidden lg:block">
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t via-slate-50/50 from-slate-50 h-28" />
                <Image
                  src="/images/landing/farm/veg-cartoon.jpg" // Giữ nguyên hình ảnh cũ
                  alt="Moving cartoon"
                  width={256}
                  height={256}
                  className="w-32 lg:w-64"
                />
              </div>
              <h1 className="relative w-fit tracking-tight mt-16 font-bold !leading-tight text-gray-900 dark:text-gray-100 text-5xl md:text-6xl lg:text-7xl">
                Ứng dụng{"  "}
                <span className="bg-orange-600 px-2 text-white rounded-2xl ">
                  {" "}
                  dịch vụ vận chuyển nhà
                </span>{" "}
              </h1>
              <p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap">
                Dịch vụ vận chuyển nhà: Hướng tới những người cần chuyển nhà một
                cách dễ dàng và nhanh chóng.{" "}
                <span className="font-semibold">Movemate</span> là lựa chọn của
                bạn để trải nghiệm dịch vụ dọn dẹp chuyên nghiệp và an toàn.
              </p>

              <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
                <div className="space-y-2">
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-orange-600" />{" "}
                    {/* Thay đổi màu thành cam */}
                    Đội ngũ dọn dẹp chuyên nghiệp
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-orange-600" />
                    Dịch vụ nhanh chóng, tiết kiệm thời gian
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-orange-600" />
                    Kết nối với cộng đồng và chia sẻ trải nghiệm
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
                src="/images/landing/farm/veg-cartoon6.png" // Giữ nguyên hình ảnh cũ
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
              <Phone
                className="w-64"
                imgSrc="/images/landing/farm/Chika-Farm-1-1024x639.webp" // Giữ nguyên hình ảnh cũ
              />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
      <section className="bg-slate-100 grainy-dark dark:bg-gray-700">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-32">
          <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
            <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900 dark:text-gray-100">
              Về Movemate{" "}
              <span className="relative px-2">
                <Icons.underline className="hidden sm:block pointer-events-none absolute inset-x-0 -bottom-6 text-orange-500" />
              </span>
            </h2>
            <Image
              src="/images/landing/farm/veg-cartoon3.png"
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
                  Movemate cung cấp dịch vụ{" "}
                  <span className="p-0.5 bg-slate-800 text-white">
                    dọn dẹp và chuyển nhà
                  </span>
                  , giúp bạn dễ dàng chuyển đến nơi ở mới mà không gặp phải khó
                  khăn, hỗ trợ từ A đến Z để đảm bảo quá trình di chuyển diễn ra
                  suôn sẻ.
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
                  Chúng tôi mang đến lợi ích cho những ai{" "}
                  <span className="p-0.5 bg-slate-800 text-white">đam mê</span>{" "}
                  và{" "}
                  <span className="p-0.5 bg-slate-800 text-white">
                    thích sự tiện lợi
                  </span>
                  , tham gia vào cộng đồng dịch vụ chuyển nhà chuyên nghiệp, cải
                  thiện trải nghiệm sống của bạn.
                </p>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
      {/* Review Section */}
      <section className="py-16 lg:py-24 bg-slate-100 grainy-dark  dark:bg-gray-700">
        <MaxWidthWrapper className="flex flex-col items-center">
          <h2 className="text-3xl lg:text-5xl font-bold">
            Đánh giá của người dùng
          </h2>
          <Reviews />
        </MaxWidthWrapper>
      </section>
      {/* About the Project Section */}
      <section className="bg-slate-100 grainy-dark py-24 dark:bg-gray-700">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-32">
          <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
            <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900 dark:text-gray-100">
              Về dự án của Movemate{" "}
              <span className="relative px-2">
                <Icons.underline className="hidden sm:block pointer-events-none absolute inset-x-0 -bottom-6 text-orange-500" />
              </span>
            </h2>
            <Image
              src="/images/landing/farm/veg-cartoon6.png"
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
