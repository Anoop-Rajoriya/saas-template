import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  // validate user
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  // fetch all todos of user
  const todos = await prisma.todo.findMany({
    where: {
      author: { authId: userId },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  // return fetched todos
  return NextResponse.json({ message: "Todos list.", todos });
}

export async function POST(req: NextRequest) {
  // validate user
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  // validate todo formate
  const { title, completed } = await req.json();
  if (!title.trim() || typeof completed !== "boolean") {
    return NextResponse.json(
      { message: "Following fields are required (title, completed)." },
      { status: 422 }
    );
  }
  // add to in db
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
    // return added todo
    return NextResponse.json({ message: "New Todo", newTodo });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to add new todo." },
      { status: 400 }
    );
  }
}
