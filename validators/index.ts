import * as z from "zod";

export const MovieSchema = z.object({
  title: z.string().nonempty({
    message: "Title is required!",
  }),
  shortDescription: z.string().nonempty({
    message: "Short Desc is required!",
  }),
  description: z.string().nonempty({
    message: "Description is required!",
  }),
  rating: z.number().gt(0).lte(10),
  coverImg: z.string().url().nonempty({
    message: "Cover Image is required!",
  }),
  genres: z.array(z.string()),
  publishedDate: z.string().nonempty({
    message: "Date is required!",
  }),
});

export const CategorySchema = z.object({
  catName: z.string().nonempty({
    message: "Category Name is required!",
  }),
});
