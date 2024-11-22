"use client";
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
        <h1 className="text-5xl font-bold px-2">Bảo hiểm thiết bị điện tử</h1>
        <p className="mt-4 font-semibold text-2xl">
          Tại sao bảo hiểm này là lựa chọn tuyệt vời dành cho bạn?
        </p>
        <ul className="mt-2 space-y-2 text-lg">
          <li>• Bảo vệ thiết bị điện tử của bạn trong lúc sử dụng dịch vụ chuyển nhà.</li>
          <li>• Bảo vệ thiết bị điện tử của bạn trước những thiệt hại bất ngờ, thiệt hại do chất lỏng, trộm cắp.</li>
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
                      <span className="font-semibold">Thiệt hại do sự cố bất ngờ</span>
                    </div>
                    <p className="text-sm text-gray-600 text-left">
                      Bảo hiểm thiết bị điện tử trước những thiệt hại gây ra bởi sự cố bất ngờ, nằm ngoài khả năng kiểm soát và không được bảo hành theo chính sách của nhà sản xuất.                    </p>
                  </li>
                  <li className="flex flex-col items-start">
                    <div className="flex items-center">
                      <Check color="green" size={24} className="mr-2" />
                      <span className="font-semibold">Thiệt hại do tiếp xúc với chất lỏng</span>
                    </div>
                    <p className="text-sm text-gray-600 text-left">
                      Bảo hiểm thiết bị điện tử trước những thiệt hại gây ra bởi chất lỏng trong các tình huống tai nạn nằm ngoài khả năng kiểm soát.                    </p>
                  </li>
                  <li className="flex flex-col items-start">
                    <div className="flex items-center">
                      <Check color="green" size={24} className="mr-2" />
                      <span className="font-semibold">Quy trình sửa chữa và yêu cầu bồi thường đơn giản, thuận tiện</span>
                    </div>
                    <p className="text-sm text-gray-600 text-left">
                      Khi có nhu cầu sửa chữa, bạn chỉ cần gửi yêu cầu bồi thường bảo hiểm trên Cổng thông tin trực tuyến 24/7 của đối tác Bảo hiểm và làm theo hướng dẫn được cung cấp. Chi phí sửa chữa thiết bị sẽ được chi trả dựa trên điều khoản quy định của đối tác cung cấp bảo hiểm.
                    </p>
                  </li>
                </ul>
              </section>
              <section className="text-center mt-8">
                <h2 className="text-lg font-bold mb-4 text-orange-500">Cách chọn mua bảo hiểm</h2>
                <p className="text-sm text-gray-600">
                  Bảo hiểm sẽ được thêm vào đơn hàng như sản phẩm mua kèm khi "Đặt dịch vụ". Trường hợp bạn chưa muốn mua kèm Bảo hiểm, có thể bỏ chọn.</p>
              </section>
              <section className="mt-8">
                <h2 className="text-lg font-bold mb-4 text-orange-500 text-center">Câu hỏi thường gặp</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <h3 className="font-medium text-orange-500 mr-4">Q1</h3>
                    <p className="font-medium">Bảo hiểm Thiết bị điện tử là gì?</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-0">
                    Bảo hiểm Thiết bị điện tử được cung cấp bởi đối tác bảo hiểm uy tín của MoveMate, nhằm giúp bạn bảo vệ thiết bị điện tử trước những thiệt hại không mong muốn gây ra bởi sự cố bất ngờ, tiếp xúc với chất lỏng và trộm cắp với trong lúc vận chuyển nhà kể từ thời điểm nhân viên đến vận chuyển.                  </p>

                  <div className="flex items-center">
                    <h3 className="font-medium text-orange-500 mr-4">Q2</h3>
                    <p className="font-medium">Thời hạn yêu cầu bồi thường bảo hiểm là bao lâu?</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-0">
                    Bạn cần gửi yêu cầu bồi thường trong vòng 05 ngày kể từ ngày phát sinh sự cố đối với thiết bị di động.
                  </p>

                  <div className="flex items-center">
                    <h3 className="font-medium text-orange-500 mr-4">Q3</h3>
                    <p className="font-medium">Bảo hiểm Thiết bị điện tử có mức phí là bao nhiêu?</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-0">
                    Mức phí của Bảo hiểm Thiết bị điện tử sẽ thay đổi tùy theo mức giá của thiết bị được mua bảo hiểm.
                  </p>
                </div>
              </section>

              <section className="text-center mt-8">
                <h2 className="text-lg font-normal mb-4 text-gray-400">Đối tác</h2>
                <div className="flex justify-center mt-6 space-x-6">
                  <img src="https://cdn.insurance.shopee.com/images/2f109e6f72c48dc311dbd4b3f582f3c2-Fuse.png" alt="Logo 1" className="w-48 h-auto" />

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
                  <p>Truy cập <a href="https://fuse.com.vn" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">https://movemate.fuse.com.vn</a> – Công Ty TNHH Fuse Online.</p>
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
                  <p>Lựa chọn cơ sở sửa chữa từ danh sách các hệ thống/ cửa hàng sửa chữa được ủy quyền.</p>
                </div>
                <div className="flex space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-orange-500 text-white rounded-full">
                    6
                  </div>
                  <p>Bạn cần thanh toán trước chi phí sửa chữa. Cung cấp đầy đủ các thông tin sửa chữa tài sản bị hư hỏng, thông tin thanh toán (hóa đơn đỏ).</p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold text-orange-500 text-center">Thời hạn yêu cầu bồi thường
                </h3>
                <table className="table-auto w-full mt-4 mx-auto m-10">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 text-center bg-gray-100">Hoạt động</th>
                      <th className="py-2 px-4 text-center bg-gray-100">Thời gian quy định</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="odd:bg-gray-200 even:bg-white">
                      <td className="py-2 px-4">Gửi yêu cầu bồi thường bảo hiểm</td>
                      <td className="py-2 px-4">Trong vòng 05 ngày kể từ thời điểm xảy ra sự cố</td>
                    </tr>
                    <tr className="odd:bg-gray-200 even:bg-white">
                      <td className="py-2 px-4">Hoàn tất hồ sơ yêu cầu bồi thường bảo hiểm</td>
                      <td className="py-2 px-4">Trong vòng 30 ngày kể từ ngày gửi yêu cầu bồi thường bảo hiểm</td>
                    </tr>
                    <tr className="odd:bg-gray-200 even:bg-white">
                      <td className="py-2 px-4">Thanh toán yêu cầu bồi thường bảo hiểm</td>
                      <td className="py-2 px-4">Trong vòng 5-7 ngày làm việc kể từ ngày yêu cầu bồi thường bảo hiểm được chấp nhận</td>
                    </tr>
                  </tbody>
                </table>
                <section>
                  <h2 className="text-lg font-bold mb-4 text-orange-500 text-center">Liên hệ</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Nếu bạn cần được hỗ trợ hoặc hướng dẫn thêm, vui lòng liên hệ:
                  </p>
                  <img
                    src="https://cdn.insurance.MoveMate.com/images/5b620225f35be50e0ea5722f78bf2d8f-fuse.png"
                    alt="Logo"
                    className="mb-4 w-48 h-auto"
                  />
                  <div className="text-left max-w-md">
                    <p className="font-semibold">CÔNG TY TNHH FUSE ONLINE
                    </p>
                    <p className="text-sm text-gray-600">
                      Dreamplex
                      Số 21 Nguyễn Trung Ngạn
                      Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      08:00 - 20:00 thứ 2 - thứ 6, 09:00 - 18:00 thứ 7 - Chủ nhật (trừ các ngày lễ, Tết)                     </p>
                    <div className="mt-4 space-y-2">
                      <p className="flex items-center text-sm text-gray-600">
                        <Mail size={18} className="text-orange-500 mr-2" />
                        <span>cs@fuse.com.vn</span>
                      </p>
                      <p className="flex items-center text-sm text-gray-600">
                        <Phone size={18} className="text-blue-500 mr-2" />
                        <span>028 7300 8803</span>
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </Tabs.Content>


            <Tabs.Content value="tab3" className="mt-4">
              <div>
                <p>
                  Sản phẩm Bảo hiểm Thiết bị điện tử được cung cấp bởi Công ty TNHH Bảo hiểm Phi nhân thọ MSIG Việt Nam (“MSIG”), thông qua đại lý bảo hiểm là Công ty TNHH Fuse Online, và tuân theo Điều khoản và Điều kiện Bảo hiểm Điện tử của MSIG này như được nêu dưới đây.
                  Các Điều khoản và Điều kiện của sản phẩm Bảo hiểm Thiết bị điện tử này quyết định việc sử dụng và quyền lợi của người được bảo hiểm / người thụ hưởng.
                  Việc mua sản phẩm Bảo hiểm Thiết bị điện tử trên Nền tảng MoveMate phải tuân theo Điều khoản và Điều kiện của Nền tảng MoveMate.
                  Người dùng nên đọc kỹ vì nó có thể ảnh hưởng đến quyền và nghĩa vụ của người dùng về mặt pháp lý. Bằng việc chọn hoặc mua sản phẩm Bảo hiểm này, Người dùng ủy quyền cho MoveMate thu xếp hoàn tất thỏa thuận bảo hiểm Điện tử với MSIG, và ủy quyền này bao gồm nhưng không giới hạn việc ký kết hợp đồng bảo hiểm thay mặt Người dùng và hỗ trợ thanh toán phí bảo hiểm theo quy định hiện hành.
                  Khi mua sản phẩm Bảo hiểm Thiết bị điện tử, Người dùng được coi là đã đọc, hiểu và đồng ý với tất cả các nội dung trong Điều khoản và Điều kiện Bảo hiểm Thiết bị điện tử này như được nêu dưới đây.
                </p>
              </div>
              <h3 className="text-md font-semibold mt-4">QUYỀN LỢI BẢO HIỂM</h3>
              <p>
                Chính sách Bảo hiểm sẽ thanh toán Chi phí sửa chữa hoặc Chi phí thay thế cần thiết để xử lý các tổn thất hoặc thiệt hại vật chất gây ra cho đối tượng được bảo hiểm, là hậu quả trực tiếp gây ra bởi:

              </p>
              <p>
                1. Hỏa hoạn, Sét đánh, Nổ; hoặc              </p>
              <p>
                2. Bạo loạn; hoặc             </p>
              <p>
                3. Tiếp xúc với chất lỏng; hoặc              </p>
              <p>
                4. Trộm cắp; hoặc              </p>
              <p>
                5. Thiệt hại bất ngờ.              </p>
              <h3 className="text-md font-semibold mt-4">
                ĐỐI TƯỢNG ĐƯỢC BẢO HIỂM</h3>
              <p>
                Thiết bị điện tử
              </p>
              <h3 className="text-md font-semibold mt-4">
                MỨC KHẤU TRỪ TRƯỚC KHI ÁP DỤNG BỒI THƯỜNG BẢO HIỂM</h3>
              <p>
                0%
              </p>
              <h3 className="text-md font-semibold mt-4">
                SỐ LẦN YÊU CẦU BỒI THƯỜNG BẢO HIỂM
              </h3>
              <p>
                Nhiều lần, nhưng không vượt quá giới hạn cho phép của Chính sách Bảo hiểm
              </p>
              <h3 className="text-md font-semibold mt-4">HỒ SƠ YÊU CẦU BỒI THƯỜNG BẢO HIỂM</h3>
              <p>
                Thiết bị được bảo hiểm bị mất
              </p>
              <p>
                1. Biểu mẫu Khiếu nại đã được điền đầy đủ (hoặc các trường yêu cầu bắt buộc trên Cổng thông tin như chứng nhận quyền sở hữu, điện thoại, tên, ...)

              </p>
              <p>
                2. Video clip chứng minh sự kiện được bảo hiểm hoặc biên bản/báo cáo của cảnh sát

              </p>
              <p>
                3. Báo cáo hình ảnh (tùy chọn)

              </p>
              <p>
                4. Hóa đơn thay thế thiết bị

              </p>
              <p>
                5. Hợp đồng vận chuyển được ký bởi khách hàng và MoveMate
              </p>
              <p>
                ------------
              </p>
              <p>
                Thiết bị được bảo hiểm bị thiệt hại
              </p>
              <p>
                1. Biểu mẫu Khiếu nại đã được điền đầy đủ (hoặc các trường yêu cầu bắt buộc trên Cổng thông tin như chứng nhận quyền sở hữu, điện thoại, tên, ...)

              </p>
              <p>
                2. Hóa đơn giá trị gia tăng từ Trung tâm bảo hành được ủy quyền có IMEI hoặc số sê-ri
              </p>
              <p>
                3. Ảnh chụp thiệt hại của thiết bị


              </p>
              <p>
                4. Hợp đồng vận chuyển được ký bởi khách hàng và MoveMate
              </p>
              <h3 className="text-md font-semibold mt-4">ĐIỀU KHOẢN LOẠI TRỪ CHUNG
              </h3>
              <ul>
                <li>Đối với tất cả các Chính sách Bảo hiểm, Đơn vị bảo hiểm MSIG sẽ không bồi thường bảo hiểm cho Khách hàng trước bất cứ tổn thất hoặc thiệt hại hoặc trách nhiệm trực tiếp hay gián tiếp xảy ra do hậu quả của:</li>
                <li>1. Hành động cố ý hoặc có tính toán thực hiện bởi Khách hàng, hoặc thực hiện bởi các cá nhân khác theo chỉ thị hoặc hướng dẫn của Khách hàng;

                </li>
                <li>2. Tổn thất gây ra do chiến tranh, xâm lược, hành động thù địch của nước ngoài, chiến sự (kể cả chiến tranh có được tuyên bố hay không), nội chiến, bạo loạn, cách mạng, khởi nghĩa, binh biến, bạo động của quần chúng, đảo chính quân sự hay tiếm quyền, thiết quân luật, khủng bố hay hành động hợp pháp của bất kỳ cơ quan chức năng có thẩm quyền nào;

                </li>
                <li>3. Toàn bộ các tổn thất hoặc mất mát liên quan đến hệ thống phần mềm. Điều khoản loại trừ này bao gồm toàn bộ các tổn thất hoặc mất mát đối với bất kỳ chương trình, phần mềm hoặc hệ điều hành máy tính, hướng dẫn lập trình hoặc dữ liệu phát sinh từ hoặc gây ra bởi bất kỳ sự cố, trục trặc, thiếu hụt, xóa, lỗi, vi rút hoặc hỏng hóc; hoặc bất kỳ tổn thất khả năng sử dụng hoặc tính năng sử dụng, tổn thất về mặt chi phí hoặc tổn thất về mặt trách nhiệm và quyền lợi gây ra bởi những vấn đề trên.

                  Tổn thất về phần mềm bao gồm, nhưng không giới hạn trong, những tổn thất hoặc thiệt hại gây ra bởi bất kỳ hành động truy cập được phép hoặc không được phép nào vào bất kỳ máy vi tính, hệ thống thông tin liên lạc, máy chủ, thiết bị mạng, hệ thống máy tính, phần cứng máy tính, thiết bị xử lý dữ liệu, bộ nhớ máy tính, vi mạch, bộ vi xử lý (chip máy tính), mạch tích hợp hoặc thiết bị tương tự trong hệ thống máy vi tính, cũng như bất kỳ chương trình, phần mềm máy vi tính hoặc hệ điều hành, hướng dẫn lập trình hoặc hệ thống dữ liệu nào.

                  Vi-rút được định nghĩa là bất kỳ phần mềm, hệ thống dữ liệu hoặc mã có thể gây ảnh hưởng đến hoạt động hoặc chức năng của bất kỳ máy vi tính, hệ thống thông tin liên lạc, máy chủ, thiết bị mạng, hệ thống máy vi tính, phần cứng máy vi tính, thiết bị xử lý dữ liệu, bộ nhớ máy vi tính, vi mạch, bộ vi xử lý (chip máy tính), mạch tích hợp hoặc thiết bị tương tự trong hệ thống máy vi tính, cũng như bất kỳ chương trình, phần mềm máy vi tính hoặc hệ điều hành, hướng dẫn lập trình hoặc hệ thống dữ liệu nào; bao gồm nhưng không giới hạn bởi bất kỳ phần mềm, mã máy tính, vi-rút máy tính hoặc sâu máy tính mang tính phá hoại, bom logic, tấn công từ chối dịch vụ, tấn công lén lút, phá hoại, phần mềm ác tính Ngựa Troia hoặc bất kỳ dữ liệu nào khác được đưa vào bất kỳ hệ thống điện tử nào gây ra việc xóa, phá hủy, xuống cấp, sai lạc, trục trặc hoặc xâm phạm đối với dữ liệu, phần mềm hoặc hệ thống kinh doanh điện tử.

                </li>
              </ul>
              <h3 className="text-md font-semibold mt-4">THỜI HẠN YÊU CẦU BỒI THƯỜNG
              </h3>
              <p>
                Gửi yêu cầu bồi thường bảo hiểm: Sớm nhất có thể trong vòng 05 ngày kể từ thời điểm xảy ra sự cố.

                Hoàn tất hồ sơ Yêu cầu bồi thường bảo hiểm: Sớm nhất có thể trong vòng 30 ngày kể từ ngày gửi Yêu cầu bồi thường bảo hiểm.
              </p>
            </Tabs.Content>


          </Tabs.Root>
        </div>
      </main>
    </div>
  );
};

export default InformationPage;
