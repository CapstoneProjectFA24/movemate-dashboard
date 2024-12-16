// "use client";

import { getWallet } from "@/features/refund/actions/refund";
import { formatCurrency } from "@/lib/utils";

const CreditCard = async () => {

  const data = await getWallet();

//   console.log(data.data);
  return (
    <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 sm:p-6 rounded-xl shadow-lg w-full overflow-hidden mt-16">
      {/* Chip Icon */}
      <div className="absolute top-4 left-4 w-8 sm:w-10 h-6 sm:h-8 bg-gradient-to-r from-gray-200 to-gray-400 rounded-sm"></div>

      {/* Card Content */}
      <div className="relative z-10 flex flex-col space-y-4 sm:space-y-6">
        {/* Title */}
        <h2 className="text-sm sm:text-lg font-bold tracking-wide truncate">
          Credit Card
        </h2>

        {/* Card Number */}
        <div className="text-base sm:text-lg font-mono tracking-widest truncate">
        {data.data?.bankNumber}
        </div>

        {/* Card Footer */}
        <div className="flex justify-between text-xs sm:text-sm flex-wrap">
          <div className="truncate">
            <p className="text-[10px] sm:text-xs uppercase">Card Holder</p>
            <p className="font-bold truncate">{data.data?.cardHolderName}</p>
          </div>
          <div className="truncate">
            <p className="text-[10px] sm:text-xs uppercase">Expiry</p>
            <p className="font-bold truncate">{data.data?.expirdAt}</p>
          </div>
        </div>

        {/* Value */}
        <div className="text-2xl sm:text-4xl font-extrabold mt-4 truncate">
         {formatCurrency(data.data?.balance) }
        </div>
      </div>
    </div>
  );
};
export default CreditCard;
