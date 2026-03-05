"use server"

// import { PrismaClient } from "../generated/prisma/client";

// const prisma = new PrismaClient();
import prisma from "./prismaSetup";

export async function getTasksFrom_DB(userId: string) {
  return await prisma.task.findMany({
    where: { userId },
  });
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
  return await prisma.task.create({
    data: { title, description, userId },
  });
}

export async function deleteTask_DB(id: number) {

  if(!id){
    throw new Error("missing taskId");
  }
  return await prisma.task.delete({
    where: { id },
  });
}

export async function UpdateTask_DB(
  id: number,
  title: string,
  description: string,
) {

  if(!id){
    throw new Error("missing taskId")
  }

   if(!title){
    throw new Error("missing title")
  }

   if(!description){
    throw new Error("missing description")
  }
  return await prisma.task.update({
    where: { id },
    data: {
      title,
      description,
    },
  });
}

export async function Convert_Comp_pend_DB(id: number, isComplete: boolean) {
  const existingTask = await prisma.task.findUnique({
    where: { id },
  });

   if(!id){
    throw new Error("missing taskId")
  }

   if(!isComplete){
    throw new Error("missing isComplete Sign")
  }

  if (existingTask) {
    return await prisma.task.update({
      where: { id },
      data: { completed: isComplete },
    });
  } else {
    throw new Error(
      "Task not found. Cannot upsert without title and description.",
    );
  }
}
