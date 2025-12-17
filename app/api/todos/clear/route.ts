import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  // validatation
  const { userId: authId } = await auth();
  if (!authId) {
    return NextResponse.json("Unauthorized access.", { status: 401 });
  }
  // database operation
  try {
    await prisma.todo.deleteMany({
      where: { completed: true, author: { authId } },
    });
  } catch (error) {
    console.error("Failed to clear todos.", error);
    return NextResponse.json("Todos clear failed.", { status: 500 });
  }
  // success
  return NextResponse.json("Todos clear successfully.", { status: 200 });
}
