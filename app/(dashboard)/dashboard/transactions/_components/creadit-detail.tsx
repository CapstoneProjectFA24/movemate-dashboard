import { getWallet } from "@/features/refund/actions/refund";
import { formatCurrency, formatter } from "@/lib/utils";

const CreditCardDetails = async () => {
  const data = await getWallet();

  
  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2">Chi tiết thẻ</h3>
      <ul className="space-y-2">
        <li className="flex justify-between">
          <span className="font-medium">Tên chủ thẻ:</span>
          <span className="text-gray-700">{data.data?.cardHolderName}</span>
        </li>
        <li className="flex justify-between">
          <span className="font-medium">Ngày hết hạn:</span>
          <span className="text-gray-700">{data.data?.expirdAt}</span>
        </li>
        <li className="flex justify-between">
          <span className="font-medium">Mã số thẻ:</span>
          <span className="text-gray-700">{data.data?.bankNumber}</span>
        </li>
        <li className="flex justify-between">
          <span className="font-medium">Tên ngân hàng:</span>
          <span className="text-gray-700">{data.data?.bankName}</span>
        </li>
        <li className="flex justify-between">
          <span className="font-medium">Số dư khả dụng:</span>
          <span className="text-gray-700">{formatCurrency(data.data?.balance) }</span>
        </li>
      </ul>
    </div>
  );
};

export default CreditCardDetails;
