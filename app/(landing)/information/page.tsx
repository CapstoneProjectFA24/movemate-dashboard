import * as Tabs from "@radix-ui/react-tabs";
import { Check, Mail, Phone } from 'lucide-react';

const InformationPage = () => {
  return (
    <div className="min-h-screen bg-white mx-24">
      <header className="relative bg-orange-500 text-white text-center py-8">
        <div className="flex justify-center">
          <img
            src="https://www.svgrepo.com/show/422038/product.svg"
            alt="Icon"
            className="w-16 h-16 mb-4"
          />
        </div>
        <h1 className="text-5xl font-bold px-2">Bảo hiểm Trách nhiệm sản phẩm</h1>
        <p className="mt-4 font-semibold text-2xl">
          Tại sao bảo hiểm này là lựa chọn tuyệt vời dành cho bạn?
        </p>
        <ul className="mt-2 space-y-2 text-lg">
          <li>• Giúp bảo vệ bạn khỏi các nguy hiểm, thiệt hại gây ra bởi sản phẩm được bảo hiểm trong quá trình sử dụng chúng.</li>
          <li>• Tổng giá trị bồi thường đến 500% giá trị sản phẩm (sau khi áp dụng khuyến mãi).</li>
        </ul>
        <div className="absolute bottom-0 w-full h-6 bg-white rounded-t-full"></div>
      </header>

      <main className="p-4">
        <div className="max-w-4xl mx-auto">

          <Tabs.Root defaultValue="tab1" className="max-w-4xl mx-auto">
            <Tabs.List
              aria-label="Information Tabs"
              className="flex justify-center border-b border-gray-300 mb-4"
            >
              <Tabs.Trigger
                value="tab1"
                className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-orange-500 border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:text-orange-500"
              >
                Lợi ích
              </Tabs.Trigger>
              <Tabs.Trigger
                value="tab2"
                className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-orange-500 border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:text-orange-500"
              >
                Yêu cầu bảo hiểm
              </Tabs.Trigger>
              <Tabs.Trigger
                value="tab3"
                className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-orange-500 border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:text-orange-500"
              >
                Điều khoản
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="tab1" className="mt-4">
              <section className="text-center">
                <h2 className="text-lg font-bold mb-4 text-orange-500">Quyền lợi bảo hiểm</h2>
                <ul className="space-y-4">
                  <li className="flex flex-col items-start">
                    <div className="flex items-center">
                      <Check color="green" size={24} className="mr-2" />
                      <span className="font-semibold">Bảo hiểm Chi phí Y tế</span>
                    </div>
                    <p className="text-sm text-gray-600 text-left">
                      Bảo vệ toàn diện trước các thiệt hại liên quan đến sản phẩm.
                    </p>
                  </li>
                  <li className="flex flex-col items-start">
                    <div className="flex items-center">
                      <Check color="green" size={24} className="mr-2" />
                      <span className="font-semibold">Quyền lợi 2</span>
                    </div>
                    <p className="text-sm text-gray-600 text-left">
                      Hỗ trợ tài chính trong trường hợp xảy ra sự cố.
                    </p>
                  </li>
                  <li className="flex flex-col items-start">
                    <div className="flex items-center">
                      <Check color="green" size={24} className="mr-2" />
                      <span className="font-semibold">Quyền lợi 3</span>
                    </div>
                    <p className="text-sm text-gray-600 text-left">
                      Đảm bảo quy trình bồi thường nhanh chóng và hiệu quả.
                    </p>
                  </li>
                </ul>
              </section>
              {/* <section className="text-center mt-8">
                <h2 className="text-lg font-bold mb-4 text-orange-500">Cách chọn mua bảo hiểm</h2>
                <p className="text-sm text-gray-600">
                  Bạn có thể dễ dàng chọn mua bảo hiểm thông qua các bước đơn giản.
                </p>
                <img
                  src="https://via.placeholder.com/300x200"
                  alt="Hướng dẫn mua bảo hiểm"
                  className="mx-auto mt-4"
                />
              </section> */}
              <section className="mt-8">
                <h2 className="text-lg font-bold mb-4 text-orange-500 text-center">Câu hỏi thường gặp</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <h3 className="font-medium text-orange-500 mr-4">Q1</h3>
                    <p className="font-medium">Làm thế nào để đăng ký bảo hiểm?</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-0">
                    Bạn có thể đăng ký bảo hiểm trực tiếp qua ứng dụng hoặc website của chúng tôi.
                  </p>

                  <div className="flex items-center">
                    <h3 className="font-medium text-orange-500 mr-4">Q2</h3>
                    <p className="font-medium">Bảo hiểm có thời hạn bao lâu?</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-0">
                    Thời hạn bảo hiểm tùy thuộc vào gói sản phẩm bạn chọn, thông thường từ 1 đến 5 năm.
                  </p>

                  <div className="flex items-center">
                    <h3 className="font-medium text-orange-500 mr-4">Q3</h3>
                    <p className="font-medium">Tôi có thể hủy bảo hiểm không?</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-0">
                    Có, bạn có thể hủy bảo hiểm bất kỳ lúc nào, và các khoản hoàn phí sẽ được xử lý theo điều khoản hợp đồng.
                  </p>
                </div>
              </section>

              <section className="text-center mt-8">
                <h2 className="text-lg font-normal mb-4 text-gray-400">Đối tác</h2>
                <div className="flex justify-center mt-6 space-x-6">
                  <img src="https://lh3.googleusercontent.com/QzsJhcwLuK7hxgEV8tJtAffEAW-By-HOaqnEyZe5iFOSwNtufFnoAUSNsod01V63uRlcU_S5xZTHzHlazgTnx85wsVbYHaiAf20q4u5gT0kgrq7Sb3bm" alt="Logo 1" className="w-48 h-auto" />

                </div>
              </section>
            </Tabs.Content>

            <Tabs.Content value="tab2" className="mt-4">

              <div className="space-y-4 mt-4">
                <h3 className="font-semibold text-orange-500 text-center">Các bước Yêu cầu bồi thường bảo hiểm</h3>
                <div className="flex space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-orange-500 text-white rounded-full">
                    1
                  </div>
                  <p>Truy cập <a href="https://movemate.pasarpolis.io" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">https://movemate.pasarpolis.io</a> của đơn vị đồng đại lý – Công ty TNHH PP Vietnam.</p>
                </div>
                <div className="flex space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-orange-500 text-white rounded-full">
                    2
                  </div>
                  <p>Đăng nhập với số điện thoại/ địa chỉ email được liên kết với Tài khoản MoveMate của bạn.</p>
                </div>
                <div className="flex space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-orange-500 text-white rounded-full">
                    3
                  </div>
                  <p>Chọn Chính sách bảo hiểm mà bạn muốn yêu cầu bồi thường.</p>
                </div>
                <div className="flex space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-orange-500 text-white rounded-full">
                    4
                  </div>
                  <p>Điền đầy đủ các thông tin và tải lên các tài liệu theo yêu cầu.</p>
                </div>
                <div className="flex space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-orange-500 text-white rounded-full">
                    5
                  </div>
                  <p>Làm theo hướng dẫn ở các trang tiếp theo để tạo Yêu cầu bồi thường bảo hiểm.</p>
                </div>
                <div className="flex space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-orange-500 text-white rounded-full">
                    6
                  </div>
                  <p>Bạn cần thanh toán trước chi phí sửa chữa. Cung cấp đầy đủ các thông tin sửa chữa tài sản bị hư hỏng, thông tin thanh toán (hóa đơn đỏ).</p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold text-orange-500 text-center">Thời gian xử lý yêu cầu bảo hiểm</h3>
                <table className="table-auto w-full mt-4 mx-auto m-10">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 text-center bg-gray-100">Hoạt động</th>
                      <th className="py-2 px-4 text-center bg-gray-100">Thời gian quy định</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="odd:bg-gray-200 even:bg-white">
                      <td className="py-2 px-4">Kiểm tra yêu cầu bảo hiểm</td>
                      <td className="py-2 px-4">2 ngày làm việc</td>
                    </tr>
                    <tr className="odd:bg-gray-200 even:bg-white">
                      <td className="py-2 px-4">Thẩm định sản phẩm</td>
                      <td className="py-2 px-4">5 ngày làm việc</td>
                    </tr>
                    <tr className="odd:bg-gray-200 even:bg-white">
                      <td className="py-2 px-4">Ra quyết định bồi thường</td>
                      <td className="py-2 px-4">1 ngày làm việc</td>
                    </tr>
                    <tr className="odd:bg-gray-200 even:bg-white">
                      <td className="py-2 px-4">Thông báo kết quả</td>
                      <td className="py-2 px-4">1 ngày làm việc</td>
                    </tr>
                  </tbody>
                </table>
                <section>
                  <h2 className="text-lg font-bold mb-4 text-orange-500 text-center">Liên hệ</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Nếu bạn cần được hỗ trợ hoặc hướng dẫn thêm, vui lòng liên hệ:
                  </p>
                  <img
                    src="https://lh3.googleusercontent.com/QzsJhcwLuK7hxgEV8tJtAffEAW-By-HOaqnEyZe5iFOSwNtufFnoAUSNsod01V63uRlcU_S5xZTHzHlazgTnx85wsVbYHaiAf20q4u5gT0kgrq7Sb3bm"
                    alt="PasarPolis Logo"
                    className="mb-4 w-48 h-auto"
                  />
                  <div className="text-left max-w-md">
                    <p className="font-semibold">CÔNG TY TNHH PP VIETNAM</p>
                    <p className="text-sm text-gray-600">
                      Tòa nhà E.Town Central, Phòng #22-143, Số 11, đường Đoàn Văn Bơ,
                      Phường 13, Quận 4, TP. Hồ Chí Minh
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      09:00 - 18:00 Thứ 2 đến Thứ 6 (trừ các ngày lễ, Tết)
                    </p>
                    <div className="mt-4 space-y-2">
                      <p className="flex items-center text-sm text-gray-600">
                        <Mail size={18} className="text-orange-500 mr-2" />
                        <span>cskh@pasarpolis.co.id</span>
                      </p>
                      <p className="flex items-center text-sm text-gray-600">
                        <Phone size={18} className="text-blue-500 mr-2" />
                        <span>0967 292 971</span>
                      </p>
                      <p className="flex items-center text-sm text-gray-600">
                        <Phone size={18} className="text-blue-500 mr-2" />
                        <span>1900232454</span>
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </Tabs.Content>


            <Tabs.Content value="tab3" className="mt-4">
              <h2 className="text-lg font-bold">Điều khoản Bảo hiểm</h2>
              <div>
                <p>
                  1. Bảo hiểm chỉ áp dụng cho sản phẩm được mua từ các nhà cung cấp được ủy quyền.
                </p>
                <p>
                  2. Các điều kiện bảo hiểm có thể thay đổi theo từng thời điểm.
                </p>
                <p>
                  3. Vui lòng đọc kỹ hợp đồng bảo hiểm để hiểu rõ quyền lợi của bạn.
                </p>
              </div>
              <h3 className="text-md font-semibold mt-4">Bảo hiểm Quyền lợi tiêu dùng</h3>
              <p>
                Bảo hiểm Quyền lợi tiêu dùng được cung cấp bởi Công ty bảo hiểm PVI, thông qua đối tác môi giới bảo hiểm PasarPolis. Các Điều khoản và Điều kiện của Bảo hiểm Quyền lợi tiêu dùng là một phần thuộc hệ thống Điều khoản và Điều kiện của MoveMate. Việc sử dụng các dịch vụ Bảo hiểm Quyền lợi tiêu dùng cần phải tuân thủ những Điều khoản và Điều kiện của MoveMate, Chính sách bảo mật, và Điều khoản và Điều kiện riêng được nêu ra bên dưới. Người dùng được khuyến cáo nên đọc kỹ vì nó có thể ảnh hưởng đến quyền và nghĩa vụ về mặt pháp lý của Người dùng.
              </p>
              <p>
                Bằng việc đăng ký và/hoặc sử dụng trang www.movemate.info, Người dùng được coi là đã đọc, hiểu, hiểu rõ và đồng ý với tất cả các nội dung trong Điều khoản và Điều kiện. Nếu Người dùng không đồng ý với một, một phần hoặc tất cả các nội dung của Điều khoản và Điều kiện, Người dùng không được phép sử dụng các dịch vụ tại trang www.movemate.info.
              </p>
              <h3 className="text-md font-semibold mt-4">Quyền lợi bảo hiểm</h3>
              <p>
                Tuân thủ các điều khoản bảo hiểm, Công ty bảo hiểm sẽ bồi thường chi phí hợp lý cho các trường hợp như:
              </p>
              <ul>
                <li>Chi phí điều trị y tế và nằm viện do thương tật hoặc bệnh tật bất ngờ.</li>
                <li>Tử vong hoặc thương tật toàn bộ vĩnh viễn.</li>
                <li>Tổn thất hoặc thiệt hại tài sản phát sinh từ sản phẩm được bán qua MoveMate.</li>
              </ul>
              <h3 className="text-md font-semibold mt-4">Điều kiện bảo hiểm</h3>
              <p>
                Thời hạn bảo hiểm là 12 tháng kể từ ngày bảo hiểm được kích hoạt. Các sản phẩm được bảo hiểm phải còn mới và đính kèm Bảo hiểm Quyền lợi tiêu dùng.
              </p>
              <h3 className="text-md font-semibold mt-4">Các điểm loại trừ</h3>
              <ul>
                <li>Không bảo hiểm đối với hành động cố ý hoặc sai sót cố ý của Người được bảo hiểm.</li>
                <li>Không bảo hiểm đối với các sản phẩm bán bên ngoài nền tảng MoveMate.</li>
                <li>Trách nhiệm phát sinh từ chiến tranh, nội chiến, hay các hành động khủng bố.</li>
              </ul>
            </Tabs.Content>


          </Tabs.Root>
        </div>
      </main>
    </div>
  );
};

export default InformationPage;
