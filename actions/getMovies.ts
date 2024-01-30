"use server";

import prisma from "@/lib/db";
import redis from "@/lib/redisClient";

export const getMoviesAction = async () => {
  try {
    const cacheVal = await redis.get("movies");
    if (cacheVal) {
      return JSON.parse(cacheVal);
    }

    const movies = await prisma.movie.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        rating: true,
        coverImg: true,
        genres: true,
        publishedDate: true,
      },
    });
    await redis.set("movies", JSON.stringify(movies));

    return movies;
  } catch (error) {
    return [];
  }
};
