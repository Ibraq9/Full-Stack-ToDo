

import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();


export async function getTasksFrom_DB(userId: string) {
    return await prisma.task.findMany({
        where: { userId }
    });
}



export async function addTask_DB({ title, description, userId }: { title: string; description: string; userId: string }) {
    return await prisma.task.create({
        data: { title, description, userId }
    });
}



export async function deleteTask_DB(id:number) {
    return await prisma.task.delete({
        where:{id}
    })

}


export async function UpdateTask_DB({id,title,description}:{title: string; description: string; id: number}) {
    return await prisma.task.update({
        where:{id},
        data:{
            title,
            description,
        }
    })
}

