import { getWallet } from "@/features/refund/actions/refund";

const CreditCardDetails = async () => {
  const data = await getWallet();

  
  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2">Chi tiết thẻ</h3>
      <ul className="space-y-2">
        <li className="flex justify-between">
          <span className="font-medium">Tên chủ thẻ:</span>
          <span className="text-gray-700">John Doe</span>
        </li>
        <li className="flex justify-between">
          <span className="font-medium">Ngày hết hạn:</span>
          <span className="text-gray-700">12/25</span>
        </li>
        <li className="flex justify-between">
          <span className="font-medium">Mã số thẻ:</span>
          <span className="text-gray-700">**** **** **** 1234</span>
        </li>
        <li className="flex justify-between">
          <span className="font-medium">Tên ngân hàng:</span>
          <span className="text-gray-700">Ngân Hàng ABC</span>
        </li>
        <li className="flex justify-between">
          <span className="font-medium">Số dư khả dụng:</span>
          <span className="text-gray-700">$500.00</span>
        </li>
      </ul>
    </div>
  );
};

export default CreditCardDetails;
