import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/redisClient";

export async function GET(req: NextRequest) {
  const page: number = Number(req.nextUrl.searchParams.get("page")) || 1;
  const limit: number = Number(req.nextUrl.searchParams.get("limit")) || 2;

  const skip = (page - 1) * limit;

  const query = "users/page:" + page + "limit:" + limit;

  try {
    const cacheVal = await redis.get(query);
    const totalUsers = await prisma.user.count();
    const totalPages = Math.ceil(totalUsers / limit);

    if (cacheVal) {
      let data = JSON.parse(cacheVal);
      return NextResponse.json({ status: 200, data: data, totalPages });
    } else {
      const users = await prisma.user.findMany({
        take: limit,
        skip,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          name: true,
          role: true,
          email: true,
          createdAt: true,
        },
      });
      await redis.set(query, JSON.stringify(users));

      return NextResponse.json({
        status: 200,
        data: users,
        totalPages,
      });
    }
  } catch (error) {
    return NextResponse.json({ status: 400, error: error });
  }
}
