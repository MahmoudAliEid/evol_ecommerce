import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";

const Price = (field: string) => {
  return z.coerce
    .number()
    .refine(
      (value) => /^\d+(\.\d{1,2})?$/.test(formatNumberWithDecimal(value)),
      `${field} must be a valid price with up to two decimal places (e.g., 10.00)`
    );
};

export const ProductInputSchema = z.object({
  name: z.string().min(3, "Name must be least 3 characters long"),
  slug: z.string().min(3, "Slug must be least 3 characters long"),
  category: z.string().min(1, "category is required"),
  images: z.array(z.string()).min(1, "Product must have at least one image"),
  brand: z.string().min(1, "Brand is required"),
  description: z.string().min(1, "Description is required"),
  isPublished: z.boolean().optional(),
  price: Price("Price"),
  listPrice: Price("List Price"),
  countInStock: z.coerce
    .number()
    .int()
    .nonnegative("Count in stock must be a non-negative integer"),
  tags: z.array(z.string()).default([]),
  sizes: z.array(z.string()).default([]),
  colors: z.array(z.string()).default([]),
  avgRating: z.coerce
    .number()
    .min(0, "Avg rating must be at least 0")
    .max(5, "Avg rating must be at most 5"),
  numReviews: z.coerce
    .number()
    .int()
    .nonnegative("Number of reviews must be a non-negative integer"),
  reviews: z.array(z.string()).default([]),
  numSales: z.coerce
    .number()
    .int()
    .nonnegative("Number of sales must be a non-negative integer"),
  ratingDistribution: z
    .array(
      z.object({
        rating: z.coerce.number().int().min(1).max(5),
        count: z.coerce.number().int().nonnegative(),
      })
    )
    .length(
      5,
      "ratingDistribution must have exactly 5 items (for ratings 1-5)"
    ),
});
