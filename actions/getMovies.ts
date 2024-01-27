"use server";

import prisma from "@/lib/db";

export const getMoviesAction = async () => {
  try {
    const movies = await prisma.movie.findMany({});
    return movies;
  } catch (error) {
    return [];
  }
};
