import redis from "@/lib/redisClient";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { catId: string } }
) {
  if (!params.catId)
    return NextResponse.json({ status: 400, error: "No Category Id!" });

  await prisma?.category.delete({
    where: {
      id: params.catId,
    },
  });

  const keys = await redis.keys("*categories*");
  if (keys.length > 0) {
    await redis.del(keys);
  }

  revalidatePath("/admin/dashboard");
  return NextResponse.json({
    status: 200,
    message: "Category deleted successfully!",
  });
}
