"use server"

import { getUserId } from "./user.action";
import { Convert_Comp_pend_DB, getTasksFrom_DB } from "../lib/prisma";
import { addTask_DB } from "../lib/prisma";
import { deleteTask_DB } from "../lib/prisma";
import { UpdateTask_DB } from "../lib/prisma";


export async function getTasks() {
    const userId = await getUserId();
    
    if (userId === null) {
       return null
    }
    
    return await getTasksFrom_DB(userId);
} 

export async function addTask({ title, description }: { title: string; description: string }) {
    const userId = await getUserId();
    
     if (userId === null) {
       return null
    }
    
    return await addTask_DB({ title, description, userId });
}


export async function deleteTask(id:number) {
  return await deleteTask_DB(id);
}


export async function UpdateTask({id,title,description}:{title: string; description: string; id: number}) {
    return await UpdateTask_DB({id,title,description})
}



export async function completedTask(id :number , Iscomplete :boolean) {
  await Convert_Comp_pend_DB(id,Iscomplete);
}