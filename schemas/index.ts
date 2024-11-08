import { z } from "zod";

export const homePageAboutSchema = z.object({
   name: z.string(),
   category: z.string(),
   subCategory: z.string(),
   shortDescription: z.string(),
   longDescription: z.string(),
   image: z.string().optional(),
   isFeatured: z.boolean().optional(),
   isArchived: z.boolean().optional(),
   topBrands: z.boolean().optional(),
});

export const categorySchema = z.object({
   name: z.string(),
});

export const subCategorySchema = z.object({
   name: z.string(),
});

export type TcategoryProps = z.infer<typeof categorySchema>;
export type TsubCategoryProps = z.infer<typeof subCategorySchema>;
export type TpageAboutSectionData = z.infer<typeof homePageAboutSchema>;
