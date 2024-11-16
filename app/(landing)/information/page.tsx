import * as Tabs from "@radix-ui/react-tabs";
import { Check } from 'lucide-react';

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
              <section className="text-center mt-8">
                <h2 className="text-lg font-bold mb-4 text-orange-500">Cách chọn mua bảo hiểm</h2>
                <p className="text-sm text-gray-600">
                  Bạn có thể dễ dàng chọn mua bảo hiểm thông qua các bước đơn giản.
                </p>
                <img
                  src="https://via.placeholder.com/300x200"
                  alt="Hướng dẫn mua bảo hiểm"
                  className="mx-auto mt-4"
                />
              </section>
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


            </Tabs.Content>

            <Tabs.Content value="tab2" className="mt-4">

              <div className="space-y-4 mt-4">
                <h3 className="font-semibold text-orange-500 text-center">Các bước yêu cầu bồi thường bảo hiểm</h3>
                <div className="flex space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-orange-500 text-white rounded-full">
                    1
                  </div>
                  <p>Vui lòng kiểm tra sản phẩm có còn trong thời hạn bảo hành.</p>
                </div>
                <div className="flex space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-orange-500 text-white rounded-full">
                    2
                  </div>
                  <p>Đảm bảo sản phẩm không bị hỏng hóc do sử dụng sai cách.</p>
                </div>
                <div className="flex space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-orange-500 text-white rounded-full">
                    3
                  </div>
                  <p>Gửi yêu cầu bảo hiểm trong vòng 7 ngày kể từ khi xảy ra sự cố.</p>
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
              <h3 className="text-md font-semibold mt-4">Quyền lợi bảo hiểm</h3>
              <p>
                Tuân thủ các điều khoản bảo hiểm, Công ty bảo hiểm sẽ bồi thường chi phí hợp lý cho các trường hợp như:
              </p>
              <ul>
                <li>Chi phí điều trị y tế và nằm viện do thương tật hoặc bệnh tật bất ngờ.</li>
                <li>Tử vong hoặc thương tật toàn bộ vĩnh viễn.</li>
                <li>Tổn thất hoặc thiệt hại tài sản phát sinh từ sản phẩm được bán qua Shopee.</li>
              </ul>

              <h3 className="text-md font-semibold mt-4">Điều kiện bảo hiểm</h3>
              <p>
                Thời hạn bảo hiểm là 12 tháng kể từ ngày bảo hiểm được kích hoạt. Các sản phẩm được bảo hiểm phải còn mới và đính kèm Bảo hiểm Quyền lợi tiêu dùng.
              </p>

              <h3 className="text-md font-semibold mt-4">Các điểm loại trừ</h3>
              <ul>
                <li>Không bảo hiểm đối với hành động cố ý hoặc sai sót cố ý của Người được bảo hiểm.</li>
                <li>Không bảo hiểm đối với các sản phẩm bán bên ngoài nền tảng Shopee.</li>
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
