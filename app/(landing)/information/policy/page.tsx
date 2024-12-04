"use client";

import MaxWidthWrapper from "@/components/shared/landing/max-width-wrapper";
import React from "react";

const TermsOfService: React.FC = () => {
  const sections = [
    {
      title: "1. Chấp Nhận Điều Khoản",
      content:
        "Khi sử dụng ứng dụng MoveMate, bạn đồng ý tuân thủ các điều khoản và điều kiện dưới đây. Nếu không đồng ý với bất kỳ điều khoản nào, vui lòng không sử dụng dịch vụ.",
    },
    {
      title: "2. Dịch Vụ",
      content: [
        "MoveMate cung cấp dịch vụ thuê xe tải và hỗ trợ dọn nhà.",
        "Các dịch vụ bổ sung, nếu có, sẽ được thông báo rõ trong ứng dụng trước khi khách hàng sử dụng.",
        "Không ảnh hưởng đến các quy định khác của Điều Khoản Sử Dụng Dịch Vụ này, MoveMate có quyền ngay lập tức tạm dừng hoặc ngừng cung cấp Dịch Vụ sau khi gửi thông báo bằng văn bản cho Khách Hàng trong các trường hợp sau:",
        "Hành vi vi phạm: MoveMate có lý do hợp lý để nghi ngờ Khách Hàng có hành vi sử dụng dịch vụ trái phép, bất hợp pháp, gian lận, hoặc vi phạm pháp luật.",
        "Thanh toán không đầy đủ: Dịch vụ chưa được thanh toán đầy đủ hoặc đúng hạn theo quy định.",
        "Rủi ro vận hành: Vì bất kỳ lý do nào liên quan đến rủi ro an toàn hoặc vận hành, theo đánh giá hợp lý của MoveMate.",
      ],
    },
    {
      title: "3. Trách Nhiệm của Người Dùng",
      content: [
        "Người dùng cam kết cung cấp thông tin chính xác, đầy đủ và chịu trách nhiệm về hoạt động diễn ra dưới tài khoản của mình.",
        "Người dùng có quyền chỉnh sửa hoặc đổi ngày đặt dịch vụ trước khi xác nhận đặt dịch vụ.",
        "Việc đổi ngày đặt dịch vụ sau xác nhận chỉ được thực hiện miễn phí một lần. Các thay đổi tiếp theo sẽ áp dụng phí theo quy định.",
      ],
    },
    {
      title: "4. Đặt Dịch Vụ và Chỉnh Sửa",
      content: [
        "Đặt dịch vụ bằng cách nhập thông tin về loại nhà, loại xe, và các dịch vụ bổ sung trên ứng dụng.",
        "Trước khi được gán cho nhân viên đánh giá, người dùng có thể chỉnh sửa hoặc hủy đơn đặt.",
        "Sau khi thanh toán tiền cọc, người dùng không được hủy dịch vụ nếu đã gán tài xế hoặc nhân viên bốc vác.",
      ],
    },
    {
      title: "5. Thanh Toán",
      content: [
        "Người dùng thanh toán qua các phương thức: thẻ tín dụng, thẻ ghi nợ, ví điện tử hoặc tiền mặt.",
        "Đối với hợp đồng khảo sát trực tuyến, khách hàng đặt cọc trước 30% giá trị hợp đồng.",
        "Đối với hợp đồng khảo sát trực tiếp, khoản đặt cọc là 100.000 VNĐ.",
        "Phí dịch vụ bổ sung nếu áp dụng.",
        "Số tiền còn lại sẽ được thanh toán sau khi khách hàng nghiệm thu và xác nhận hoàn thành công việc trên nền tảng MoveMate.",
      ],
    },
    {
      title: "6. Chính Sách Hủy Dịch Vụ",
      content: [
        "Việc hủy dịch vụ phải được thực hiện trước giờ dự kiến.",
        "Nếu hệ thống đã gán tài xế hoặc nhân viên bốc vác, việc hủy sẽ không được hoàn cọc.",
        "Trong trường hợp lỗi từ phía MoveMate, khách hàng sẽ được hoàn trả toàn bộ số tiền đã thanh toán.",
      ],
    },
    {
      title: "7. Xử Lý Sự Cố và Bồi Thường",
      content: [
        "Trong quá trình vận chuyển, nếu xảy ra sự cố, tài xế hoặc nhân viên bốc vác phải thông báo ngay cho hệ thống và khách hàng.",
        "Bồi thường dựa trên giá trị thực tế của đồ vật trên thị trường tại thời điểm vận chuyển.",
        "Các tranh chấp sẽ được giải quyết sau khi hoàn tất dịch vụ.",
      ],
    },
    {
      title: "8. Theo Dõi Trực Tiếp và Liên Lạc",
      content: [
        "Người dùng có thể theo dõi hành trình của tài xế qua GPS.",
        "Tính năng chat hoặc gọi điện trong ứng dụng cho phép liên lạc trực tiếp với tài xế và nhân viên bốc vác.",
      ],
    },
    {
      title: "9. Tháo Dỡ và Kiểm Kê Đồ Đạc",
      content: [
        "Tài xế và nhân viên bốc vác sẽ phối hợp với khách hàng để kiểm kê số lượng và tình trạng đồ đạc trước và sau khi vận chuyển.",
        "Hệ thống sẽ ghi lại và lưu trữ thông tin để đảm bảo quyền lợi cho cả hai bên.",
      ],
    },
    {
      title: "10. Quyền Sở Hữu",
      content:
        "Tất cả nội dung, bao gồm văn bản, hình ảnh, và tài nguyên trên ứng dụng MoveMate, thuộc quyền sở hữu của MoveMate và được bảo vệ bởi luật pháp.",
    },
    {
      title: "11. Sửa Đổi Điều Khoản",
      content: [
        "MoveMate có quyền sửa đổi điều khoản và sẽ thông báo qua ứng dụng trước khi áp dụng.",
        "Người dùng cần kiểm tra điều khoản mới trước khi sử dụng dịch vụ.",
      ],
    },
    {
      title: "12. Liên Hệ",
      content:
        "Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua email: support@movemate.com hoặc hotline: 0382703625.",
    },
  ];

  return (
    <div className="dark:bg-gray-700 bg-slate-50 dark:text-gray-200 min-h-screen">
      <MaxWidthWrapper className="flex-1 py-12 sm:py-24">
        <div className="p-5 font-sans">
          <h1 className="text-center mb-10">Điều Khoản Sử Dụng</h1>
          {sections.map((section, index) => (
            <div key={index} className="mb-5">
              <h2 className="text-orange-500">{section.title}</h2>
              {Array.isArray(section.content) ? (
                <ul className="pl-5 mt-2.5">
                  {section.content.map((item, idx) => (
                    <li key={idx} className="mb-2">{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2.5">{section.content}</p>
              )}
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default TermsOfService;