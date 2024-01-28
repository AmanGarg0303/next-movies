"use server";
import * as z from "zod";
import prisma from "@/lib/db";
import { MovieSchema } from "@/validators";
import { revalidatePath } from "next/cache";
import redis from "@/lib/redisClient";

export const addMovieAction = async (values: z.infer<typeof MovieSchema>) => {
  const validatedData = MovieSchema.safeParse(values);

  if (!validatedData.success) {
    return { error: "Invalid FIelds!" };
  }

  const {
    title,
    shortDescription,
    description,
    rating,
    coverImg,
    genres,
    publishedDate,
  } = validatedData.data;

  // console.log("validatedData", validatedData);

  await prisma.movie.create({
    data: {
      title,
      shortDescription,
      description,
      rating,
      coverImg,
      genres,
      publishedDate,
    },
  });

  redis.del("movies");
  revalidatePath("/");

  return { success: "New movie created!" };
};
