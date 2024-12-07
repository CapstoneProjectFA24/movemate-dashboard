import { Row, Table } from "@tanstack/react-table";
import { IBooking } from "../../../types/booking-type";
import { Checkbox } from "@/components/ui/checkbox";
import { Info, XCircleIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const selectColumn = {
  id: "select",
  cell: ({ row }: { row: Row<IBooking> }) => {
    const bookingDetails = row.original.bookingDetails;
    const bookingTrackers = row.original.bookingTrackers;

    const isHaveIncident = bookingDetails?.some(
      (i) => i.status !== "AVAILABLE"
    );
    const isRefundAndMoneytary = bookingTrackers?.some(
      (i) => i.type === "REFUND" || i.type === "MONETARY"
    );

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            {isHaveIncident || isRefundAndMoneytary ? (
              <Info size={20} color="orange" className="cursor-not-allowed " />
            ) : (
              <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => {
                  row.toggleSelected(!!value);
                }}
                aria-label="Chọn dòng"
                className="translate-y-[2px] dark:text-white"
              />
            )}
          </TooltipTrigger>
          {isHaveIncident && !isRefundAndMoneytary  && (
            <TooltipContent>
              Có sự cố với booking này vui lòng giải quyết sự cố.
            </TooltipContent>
          )}
          {isRefundAndMoneytary && (
             <TooltipContent>
          Đơn đánh muốn hoàn tiền hoặc bồi thường
           </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    );
  },
  enableSorting: false,
  enableHiding: false,
} as const;

export default selectColumn;
