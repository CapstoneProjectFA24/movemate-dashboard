import { z } from "zod";


const childServiceSchema = z.object({
  name: z
    .string()
    .min(3, "Tên dịch vụ phải có ít nhất 3 ký tự")
    .max(100, "Tên dịch vụ không được vượt quá 100 ký tự"),
  description: z
    .string()
    .min(10, "Mô tả phải có ít nhất 10 ký tự")
    .max(500, "Mô tả không được vượt quá 500 ký tự"),
  isActived: z.boolean().default(true),
  tier: z.literal(0).or(z.literal(1)),  // Only allow 0 or 1
  imageUrl: z.string().url("URL hình ảnh không hợp lệ").optional(),
  type: z.string().min(1, "Loại dịch vụ không được để trống"),
  amount: z.number().min(0, "Số tiền không được âm"),
  isQuantity: z.boolean().default(false),
});


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
    isActived: z.boolean().default(true),
    tier: z.literal(0).or(z.literal(1)), // Only allow 0 or 1
    imageUrl: z.string().url("URL hình ảnh không hợp lệ").optional(),
    type: z.string().min(1, "Loại dịch vụ không được để trống"),
    amount: z.number().min(0, "Số tiền không được âm"),
    parentServiceId: z.number().int("ID dịch vụ cha phải là số nguyên").optional(),
    isQuantity: z.boolean().default(false),
    quantityMax: z
      .number()
      .int("Số lượng tối đa phải là số nguyên")
      .min(1, "Số lượng tối đa phải lớn hơn 0")
      .nullable()
      .optional(),
    truckCategoryId: z.number().int("ID loại xe phải là số nguyên").optional(),
    inverseParentService: z.array(childServiceSchema).default([]),
  })
  .superRefine((data, ctx) => {
    // Custom validation for parentServiceId based on tier
    if (data.tier === 1 && !data.parentServiceId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "ParentServiceId là bắt buộc khi tier là 1",
        path: ["parentServiceId"],
      });
    }
    if (data.tier === 0 && data.parentServiceId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "ParentServiceId không được tồn tại khi tier là 0",
        path: ["parentServiceId"],
      });
    }
    // Custom validation for truckCategoryId based on type
    if (data.type === "Truck" && !data.truckCategoryId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "TruckCategoryId là bắt buộc khi Type là Truck",
        path: ["truckCategoryId"],
      });
    }
    // Validation for inverseParentService
    if (data.tier === 1 && data.inverseParentService.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Tier 1 phải có ít nhất một dịch vụ con trong inverseParentService",
        path: ["inverseParentService"],
      });
    }
  });


export type ServiceSchemaType = z.infer<typeof serviceSchema>;
export type ChildServiceSchemaType = z.infer<typeof childServiceSchema>;
