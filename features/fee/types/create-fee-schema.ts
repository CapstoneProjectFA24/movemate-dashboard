import { z } from "zod";
import { FeeType } from "../enums/fee-enum";

// Base schema cho tất cả các loại fee
const baseFeeSchema = z.object({
  type: z.enum([
    FeeType.SYSTEM,
    FeeType.PORTER,
    FeeType.TRUCK,
    FeeType.DRIVER,
    FeeType.REVIEWER,
    FeeType.WEEKEND,
    FeeType.OUTSIDE,
    FeeType.HOLIDAY,
  ]),
  name: z.string().min(1, "Tên phí dịch vụ là bắt buộc"),
  description: z.string().min(1, "Mô tả là bắt buộc"),
  amount: z
    .number()
    .min(0, "Số tiền phải lớn hơn hoặc bằng 0")
    .nonnegative("Số tiền không thể là số âm"),
  unit: z.union([z.string(), z.null()]),
  rangeMax: z
    .number()
    .min(0, "Số tiền phải lớn hơn hoặc bằng 0")
    .nonnegative("Số tiền không thể là số âm")
    .optional(),
  rangeMin: z
    .number()
    .min(0, "Số tiền phải lớn hơn hoặc bằng 0")
    .nonnegative("Số tiền không thể là số âm")
    .optional(),
});

// Schema cho các trường serviceId
const serviceSchema = z.object({
  serviceId: z.number().positive("ServiceId phải là số dương"),
});

// Schema cho porter/driver fees
const porterDriverSchema = z.object({
  houseTypeId: z.number().positive("HouseTypeId phải là số dương"),
  floorPercentage: z
    .number()
    .min(0, "Tỉ lệ phải lớn hơn hoặc bằng 0")
    .max(100, "Tỉ lệ không thể vượt quá 100%"),
});

// Tạo schema cuối cùng với refined validations
export const feeSchema = baseFeeSchema
  .extend({
    serviceId: z.number(),
    houseTypeId: z.number(),
    floorPercentage: z.number(),
  })
  .refine(
    (data) => {
      // Kiểm tra nếu là DRIVER hoặc PORTER
      if (data.type === FeeType.DRIVER || data.type === FeeType.PORTER) {
        return (
          data.serviceId > 0 &&
          data.houseTypeId > 0 &&
          data.floorPercentage >= 0 &&
          data.floorPercentage <= 100
        );
      }
      // Kiểm tra nếu là TRUCK
      if (data.type === FeeType.TRUCK) {
        return (
          data.serviceId > 0 &&
          data.houseTypeId === 0 &&
          data.floorPercentage === 0
        );
      }
      // Với các loại khác (INSURANCE, OTHER)
      return (
        data.serviceId === 0 &&
        data.houseTypeId === 0 &&
        data.floorPercentage === 0
      );
    }
    // {
    //   message: "Thông tin không hợp lệ cho loại phí dịch vụ này",
    //   path: ["type"], // Chỉ ra trường gây ra lỗi
    // }
  )
  .superRefine((data, ctx) => {
    // Validate cho DRIVER và PORTER
    if (data.type === FeeType.DRIVER || data.type === FeeType.PORTER) {
      if (data.serviceId <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Bắt buộc phải chọn dịch vụ cho Driver/Porter",
          path: ["serviceId"],
        });
      }
      if (data.houseTypeId <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Bắt buộc phải chọn loại nhà cho Driver/Porter",
          path: ["houseTypeId"],
        });
      }
      if (data.floorPercentage < 0 || data.floorPercentage > 100) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Tỉ lệ phải nằm trong khoảng 0-100%",
          path: ["floorPercentage"],
        });
      }
    }

    // Validate cho TRUCK
    if (data.type === FeeType.TRUCK) {
      if (data.serviceId <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Bắt buộc phải chọn dịch vụ cho Truck",
          path: ["serviceId"],
        });
      }
      if (data.houseTypeId !== 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Không được chọn loại nhà cho dịch vụ Truck",
          path: ["houseTypeId"],
        });
      }
      if (data.floorPercentage !== 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Không được set tỉ lệ cho dịch vụ Truck",
          path: ["floorPercentage"],
        });
      }
    }

    // Validate cho INSURANCE và OTHER
    if (
      data.type === FeeType.SYSTEM ||
      data.type === FeeType.REVIEWER ||
      data.type === FeeType.WEEKEND ||
      data.type === FeeType.OUTSIDE ||
      data.type === FeeType.HOLIDAY
    ) {
      if (data.serviceId !== 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Không được chọn dịch vụ cho Insurance/Other",
          path: ["serviceId"],
        });
      }
      if (data.houseTypeId !== 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Không được chọn loại nhà cho Insurance/Other",
          path: ["houseTypeId"],
        });
      }
      if (data.floorPercentage !== 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Không được set tỉ lệ cho Insurance/Other",
          path: ["floorPercentage"],
        });
      }
    }
  });

export type FeeSchemaType = z.infer<typeof feeSchema>;
