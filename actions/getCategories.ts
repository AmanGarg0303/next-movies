"use server";
import prisma from "@/lib/db";

export const getCategoriesAction = async () => {
  const allCat = await prisma.category.findMany();

  return { allCat };
};
