import * as z from "zod";

export const truckCategorySchema = z.object({
    categoryName: z.string(),
    maxLoad: z.number(),
    description: z.string(),
    imageUrl: z.string(),
    estimatedLenght: z.string(),
    estimatedWidth: z.string(),
    estimatedHeight: z.string()
})