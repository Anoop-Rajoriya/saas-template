import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ todoId: string }> }
) {
  // validation
  const { userId: authId } = await auth();
  const { todoId } = await params;
  const { completed } = await request.json();

  if (!authId || !todoId || typeof completed !== "boolean") {
    return NextResponse.json("Required fields not found.", { status: 422 });
  }

  // database operation
  try {
    await prisma.todo.update({
      where: {
        id: todoId,
        author: {
          authId,
        },
      },
      data: {
        completed,
      },
    });
  } catch (error) {
    console.error("Failed to toggle todo: ", error);
    return NextResponse.json("Todo toggle failed.", { status: 500 });
  }
  // success
  return NextResponse.json("Todo toggle successfull.", { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ todoId: string }> }
) {
  // validation
  const { userId: authId } = await auth();
  const { todoId } = await params;
  if (!authId || !todoId) {
    return NextResponse.json("Required fields not found.", { status: 422 });
  }
  // database operation
  try {
    await prisma.todo.delete({
      where: { id: todoId, author: { authId } },
    });
  } catch (error) {
    console.error("failed to delete todo: ", error);
    return NextResponse.json("Delete todo failed.", { status: 500 });
  }
  // success
  return NextResponse.json("Todo successfully deleted.", { status: 200 });
}
