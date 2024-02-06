import redis from "@/lib/redisClient";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { movieId: string } }
) {
  if (!params.movieId)
    return NextResponse.json({ status: 400, error: "No Movie Id!" });

  await prisma?.movie.delete({
    where: {
      id: params.movieId,
    },
  });

  const keys = await redis.keys("*movies*");
  if (keys.length > 0) {
    await redis.del(keys);
  }

  revalidatePath("/admin/dashboard");
  return NextResponse.json({
    status: 200,
    message: "Movie deleted successfully!",
  });
}
