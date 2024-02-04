"use server";
import prisma from "@/lib/db";

export const totalCategoriesAction = async () => {
  const totalCategories = await prisma.category.count();

  return { totalCategories };
};
