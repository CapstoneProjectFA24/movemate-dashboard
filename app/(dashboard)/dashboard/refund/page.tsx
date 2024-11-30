// import React from "react";
// import { SearchParams } from "@/types/table";
// import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
// import { Shell } from "@/components/shared/custom-ui/shell";
// import { getRefunds } from "@/features/refund/actions/refund";
// import { RefundTable } from "@/features/refund/components/refund-table";
// export interface IndexPageProps {
//   searchParams: SearchParams;
// }
// const RefundPage = ({ searchParams }: IndexPageProps) => {
//   const refundPromise = getRefunds(searchParams);
//   return (
//     <div className="min-w-full">
//       <Shell>
//         <React.Suspense
//           fallback={
//             <DataTableSkeleton
//               columnCount={5}
//               searchableColumnCount={1}
//               filterableColumnCount={2}
//               cellWidths={["10rem", "40rem", "12rem", "12rem", "8rem"]}
//               shrinkZero
//             />
//           }
//         >
//           <RefundTable refundPromise={refundPromise} />
//         </React.Suspense>
//       </Shell>
//     </div>
//   );
// };

// export default RefundPage;

'use client';
import React from "react";
import { useState, useEffect } from "react";
import { FaRegMoneyBillAlt, FaMoneyBillAlt, FaRegListAlt } from "react-icons/fa";

const RefundPage = () => {
  const [userDetails, setUserDetails] = useState<{ name: string; email: string; phone: string } | null>(null);
  const [claims, setClaims] = useState<{ id: string; totalRefund: number; reason: string; status: string; claimDate: string, customerId: string }[]>([]);
  const [expandedClaimId, setExpandedClaimId] = useState<string | null>(null);

  useEffect(() => {
    // Simulating data fetch for user details (replace with actual API call)
    setUserDetails({
      name: "Nguyen Thi Lan",
      email: "lan@example.com",
      phone: "0123456789",
    });

    // Simulating refund claims (replace with actual API call)
    setClaims([
      { id: "1", totalRefund: 5000000, reason: "Damage during transport", status: "pending", claimDate: "2024-11-27", customerId: "1" },
      { id: "2", totalRefund: 3000000, reason: "Lost item", status: "approved", claimDate: "2024-11-25", customerId: "2" },
      { id: "3", totalRefund: 1000000, reason: "Delay in delivery", status: "denied", claimDate: "2024-11-20", customerId: "3" },
    ]);
  }, []);

  const renderRefundStatus = (status: string) => {
    switch (status) {
      case "pending":
        return <span className="text-yellow-500">Chờ xử lý</span>;
      case "approved":
        return <span className="text-green-500">Đã duyệt</span>;
      case "denied":
        return <span className="text-red-500">Bị từ chối</span>;
      default:
        return <span className="text-gray-500">Không xác định</span>;
    }
  };

  const toggleExpandClaim = (claimId: string) => {
    setExpandedClaimId(expandedClaimId === claimId ? null : claimId);
  };

  const handleAction = (claimId: string, action: string) => {
    // Here you can handle different actions like "Approve", "Deny", etc.
    alert(`Action ${action} on claim ID: ${claimId}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Quản lý bồi thường</h1>

      {/* Refund Claims Table */}
      <section className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Danh sách yêu cầu bồi thường</h2>
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Số tiền yêu cầu</th>
              <th className="border border-gray-300 px-4 py-2">Lý do</th>
              <th className="border border-gray-300 px-4 py-2">Ngày yêu cầu</th>
              <th className="border border-gray-300 px-4 py-2">Trạng thái</th>
              <th className="border border-gray-300 px-4 py-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((claim) => (
              <React.Fragment key={claim.id}>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">{claim.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{claim.totalRefund} VND</td>
                  <td className="border border-gray-300 px-4 py-2">{claim.reason}</td>
                  <td className="border border-gray-300 px-4 py-2">{claim.claimDate}</td>
                  <td className="border border-gray-300 px-4 py-2">{renderRefundStatus(claim.status)}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => toggleExpandClaim(claim.id)}
                      className="text-blue-500 hover:underline"
                    >
                      {expandedClaimId === claim.id ? "Ẩn chi tiết" : "Xem chi tiết"}
                    </button>
                  </td>
                </tr>

                {/* Expanded claim details */}
                {expandedClaimId === claim.id && (
                  <tr>
                    <td colSpan={6} className="border border-gray-300 px-4 py-4">
                      <h3 className="font-semibold text-xl">Chi tiết yêu cầu bồi thường</h3>
                      {/* Customer Details */}
                      <div className="mt-4">
                        <p><strong>Thông tin khách hàng:</strong></p>
                        <p><strong>Họ và tên:</strong> {userDetails?.name}</p>
                        <p><strong>Email:</strong> {userDetails?.email}</p>
                        <p><strong>Điện thoại:</strong> {userDetails?.phone}</p>
                      </div>

                      {/* Claim Details */}
                      <div className="mt-4">
                        <p><strong>Vật dụng bị hư hỏng:</strong> Bàn, ghế, tủ</p>
                        <p><strong>Chứng cứ (hình ảnh/video):</strong> <a href="#">Xem ảnh</a></p>
                      </div>

                      {/* Action buttons for manager */}
                      <div className="mt-4 flex space-x-4">
                        <button
                          onClick={() => handleAction(claim.id, "approve")}
                          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                          Duyệt yêu cầu
                        </button>
                        <button
                          onClick={() => handleAction(claim.id, "deny")}
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                          Từ chối yêu cầu
                        </button>
                        <button
                          onClick={() => handleAction(claim.id, "process")}
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                          Tiến hành bồi thường
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default RefundPage;
