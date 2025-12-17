import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  // validation
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  // database operation
  try {
    const todos = await prisma.todo.findMany({
      where: {
        author: { authId: userId },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    // success
    return NextResponse.json({
      message: "Todo list.",
      todos,
    });
  } catch (error) {
    console.error("failed to fetch todo list: ", error);
    return NextResponse.json("Listing todos failed.", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  // validation
  const { userId } = await auth();
  const { title, completed } = await req.json();

  if (!userId)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  else if (!title.trim() || typeof completed !== "boolean") {
    return NextResponse.json(
      { message: "Required fileds not found (title, completed)." },
      { status: 422 }
    );
  }
  // database operation
  try {
    const newTodo = await prisma.todo.create({
      data: {
        title,
        completed,
        author: {
          connect: {
            authId: userId,
          },
        },
      },
    });
    // success
    return NextResponse.json({
      message: "Todo successfully added.",
      newTodo,
    });
  } catch (error) {
    console.error("Failed to add todo: ", error);
    return NextResponse.json(
      { message: "Add new todo failed." },
      { status: 500 }
    );
  }
}
