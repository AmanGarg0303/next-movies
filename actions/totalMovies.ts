"use server";
import prisma from "@/lib/db";

export const totalMoviesAction = async () => {
  const totalMovies = await prisma.movie.count();

  return { totalMovies };
};
