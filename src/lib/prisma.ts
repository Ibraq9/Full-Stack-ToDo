"use server";

// import { PrismaClient } from "../generated/prisma/client";

// const prisma = new PrismaClient();
import prisma from "./prismaSetup";

export async function getTasksFrom_DB(userId: string) {
  try {
    return await prisma.task.findMany({
      where: { userId },
    });
  } catch (error) {
    throw new Error(error + "error occured while retreive tasks");
  }
}

export async function addTask_DB({
  title,
  description,
  userId,
}: {
  title: string;
  description: string;
  userId: string;
}) {
  try {
    return await prisma.task.create({
      data: { title, description, userId },
    });
  } catch (error) {
    throw new Error(error + "error occured while creating a new task");
  }
}

export async function deleteTask_DB(id: number) {
  if (!id) {
    throw new Error("missing taskId");
  }

  try {
    return await prisma.task.delete({
      where: { id },
    });
  } catch (error) {
    throw new Error(error + "error occured while deleting task");
  }
}

export async function UpdateTask_DB(
  id: number,
  title: string,
  description: string,
) {
  if (!id) {
    throw new Error("missing taskId");
  }

  if (!title) {
    throw new Error("missing title");
  }

  if (!description) {
    throw new Error("missing description");
  }

  try {
    return await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
      },
    });
  } catch (error) {
    throw new Error(error + "error occured while updating task");
  }
}

export async function Convert_Comp_pend_DB(id: number, isComplete: boolean) {
  const existingTask = await prisma.task.findUnique({
    where: { id },
  });

  if (!id) {
    throw new Error("missing taskId");
  }


  try {
    if (existingTask) {
      return await prisma.task.update({
        where: { id },
        data: { completed: isComplete },
      });
    }
  } catch (error) {
    throw new Error(
      error + "error occured while marked as complete/incomplete task",
    );
  }
}
