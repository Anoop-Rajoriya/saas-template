import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// create todos
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json(
        { error: "User authentication required" },
        { status: 401 }
      );

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { todos: true },
    });

    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    if (!user.subscribed && user.todos.length > 3) {
      return NextResponse.json(
        {
          error:
            "Subscription required for increase creation limit more then 3",
        },
        { status: 403 }
      );
    }

    const { title, completed = false } = await req.json();

    if (!title || !title.trim()) {
      return NextResponse.json(
        { error: "Title, is required" },
        { status: 400 }
      );
    }

    const newTodo = await prisma.todo.create({
      data: {
        title,
        completed,
        userId,
      },
    });

    return NextResponse.json(newTodo, { status: 201 });
  } catch (err: any) {
    console.error("Todos POST route error: ", err);
    return NextResponse.json(
      { error: err.message || "Server internal error" },
      { status: 500 }
    );
  }
}

// get all user todos
const TODO_PER_PAGE = 10;
export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json(
        { error: "User authentication required" },
        { status: 401 }
      );

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const search = searchParams.get("search") || "";

    const todos = await prisma.todo.findMany({
      where: {
        userId,
        title: {
          contains: search,
          mode: "insensitive",
        },
        orderBy: { createAt: "desc" },
        take: TODO_PER_PAGE,
        skip: (page - 1) * TODO_PER_PAGE,
      },
    });

    const totalTodos = await prisma.todo.count({
      where: {
        userId,
        title: {
          contains: search,
          mode: "insensitive",
        },
      },
    });

    const totalPages = Math.ceil(totalTodos / TODO_PER_PAGE);

    return NextResponse.json({
      todos,
      totalTodos,
      totalPages,
      currentPage: page,
    });
  } catch (err: any) {
    console.error("Todos GET route error: ", err);
    return NextResponse.json(
      { error: err.message || "Server internal error" },
      { status: 500 }
    );
  }
}
