"use server";
import prisma from "@/lib/db";

export const dashboardTotalLists = async () => {
  const totalMovies: number = await prisma.movie.count();
  const totalCategories: number = await prisma.category.count();
  const totalUsers: number = await prisma.user.count();

  return { totalMovies, totalCategories, totalUsers };
};
