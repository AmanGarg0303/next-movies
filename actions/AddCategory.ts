"use server";
import * as z from "zod";
import prisma from "@/lib/db";
import { CategorySchema } from "@/validators";
import { revalidatePath } from "next/cache";

export const addCategoryAction = async (
  values: z.infer<typeof CategorySchema>
) => {
  const validatedData = CategorySchema.safeParse(values);

  if (!validatedData.success) {
    return { error: "Invalid Fields!" };
  }

  const { catName } = validatedData.data;
  const newCatName = catName.charAt(0).toUpperCase() + catName.slice(1);

  let allCategories: any = await prisma.category.findMany();

  allCategories = allCategories.reduce(
    (acc: any, curr: any) => [...acc, curr.catName],
    ""
  );

  if (allCategories.includes(newCatName)) {
    return { error: "Category already exists!" };
  }

  await prisma.category.create({
    data: {
      catName: newCatName,
    },
  });

  revalidatePath("/");

  return { success: "New Category created!" };
};
