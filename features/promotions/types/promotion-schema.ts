import * as z from "zod";

export const promotionSchema = z
  .object({
    name: z.string(),
    quantity: z.number(),
    price: z.number(),
    description: z.string(),
    startDate: z.date().refine((date) => date !== null && date >= new Date(), {
      message: "Vui lòng không chọn ngày trong quá khứ",
    }),

    endDate: z.date(),
    endDateInValid: z.any().nullish(),
    serviceId: z.number(),
    type: z.string(),
  })
  .refine((data) => data.startDate <= data.endDate, {
    path: ["endDateInValid"],
    params: { empty: "empty" },
    message: "Hãy nhập ngày kết thúc lớn hơn hoặc bằng ngày bắt đầu",
  });
