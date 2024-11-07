import { z } from "zod";

export const serviceSchema = z
  .object({
    name: z
      .string()
      .min(3, "Tên dịch vụ phải có ít nhất 3 ký tự")
      .max(100, "Tên dịch vụ không được vượt quá 100 ký tự"),
    description: z
      .string()
      .min(10, "Mô tả phải có ít nhất 10 ký tự")
      .max(500, "Mô tả không được vượt quá 500 ký tự"),
    isTierZeroOverride: z.boolean().default(true),
    isActived: z.boolean().default(true),
    imageUrl: z.string(),
    type: z.string().min(1, "Loại dịch vụ không được để trống"),
    amount: z.number().min(0, "Số tiền không được âm"),
    discountRate: z
      .number()
      .min(0, "Tỷ lệ giảm giá không được âm")
      .max(100, "Tỷ lệ giảm giá không được vượt quá 100%"),
    isQuantity: z.boolean().default(false),
    quantityMax: z
      .number()
      .int("Số lượng tối đa phải là số nguyên")
      .min(1, "Số lượng tối đa phải lớn hơn 0")
      .nullable()
      .optional(),
    truckCategoryId: z.number().int("ID loại xe phải là số nguyên").optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === "TRUCK" && !data.truckCategoryId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "TruckCategoryId là bắt buộc khi Type là Truck",
        path: ["truckCategoryId"],
      });
    }

    // validate tiếp sau
  });
export type ServiceSchemaType = z.infer<typeof serviceSchema>;
