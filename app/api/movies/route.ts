import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const page: number = Number(req.nextUrl.searchParams.get("page")) || 1;
  const limit: number = Number(req.nextUrl.searchParams.get("limit")) || 2;

  const skip = (page - 1) * limit;

  try {
    const totalMovies = await prisma.movie.count();
    const totalPages = Math.ceil(totalMovies / limit);

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

    return NextResponse.json({
      status: 200,
      data: movies,
      totalPages,
    });
  } catch (error) {
    return NextResponse.json({ status: 400, error: error });
  }
}
