import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/redisClient";

export async function GET(req: NextRequest) {
  const page: number = Number(req.nextUrl.searchParams.get("page")) || 1;
  const limit: number = Number(req.nextUrl.searchParams.get("limit")) || 2;

  const skip = (page - 1) * limit;

  const query = "movies/page:" + page + "limit:" + limit;

  try {
    const cacheVal = await redis.get(query);
    const totalMovies = await prisma.movie.count();
    const totalPages = Math.ceil(totalMovies / limit);

    if (cacheVal) {
      let data = JSON.parse(cacheVal);
      return NextResponse.json({ status: 200, data: data, totalPages });
    } else {
      const movies = await prisma.movie.findMany({
        take: limit,
        skip,
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
      await redis.set(query, JSON.stringify(movies));

      return NextResponse.json({
        status: 200,
        data: movies,
        totalPages,
      });
    }
  } catch (error) {
    return NextResponse.json({ status: 400, error: error });
  }
}
