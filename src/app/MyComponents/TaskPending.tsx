"use client"
import { Trash } from 'lucide-react'
import React from 'react'
import { useMyContext } from '../context/ModalContext'
import { getTasks } from '../../action/task.action'
import { deleteTask } from '../../action/task.action'
import { completedTask } from '../../action/task.action'
import { useRouter } from 'next/navigation'
import confetti from 'canvas-confetti'

const Task = ({ id, title, description, completed, createdAt }: { id: number, title: string, description: string, completed: boolean, createdAt: Date }) => {

    const { setIsOpen, setModalData, setEditMode } = useMyContext();
    const router = useRouter()

    const handleEdit = async (id: number) => {
        setIsOpen(true);
        setEditMode(true);

        const tasks = await getTasks();
        const specificTask = tasks?.find((task) => task.id === id);

        if (specificTask) {
            setModalData({
                id: id,
                title: specificTask.title,
                description: specificTask.description
            });
        }
    };

    const handleDelete = async (id: number) => {
        await deleteTask(id)
        window.location.reload()
    }



    const handleCompleteTask = async () => {
        const newStatus = !completed;
        await completedTask(id, newStatus);
        if (newStatus) {
            requestAnimationFrame(() => {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                });
            });
        }
        window.location.reload();
    };



    return (
        <div className='flex my-2 bg-orange-200 dark:bg-slate-700 w-full space-x-2 text-black dark:text-white p-4 rounded-md shadow-lg'>

            <div className='flex items-center'>
                <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div onClick={handleCompleteTask} className="w-5 h-5 rounded-full border border-gray-400 dark:peer-checked:bg-blue-900 peer-checked:bg-orange-500 transition-colors"></div>
                </label>
            </div>


            <div className='flex items-center gap-2 w-full justify-between'>

                <div className='flex flex-col space-y-1 mb-2 text-orange-800 dark:text-white'>
                    <h1 className='text-lg font-bold'>{title}</h1>
                    <p className='text-sm'>{description}</p>
                </div>

                <div className='flex flex-col text-orange-800 dark:text-white'>
                    <p className='text-xs '>{createdAt.toLocaleDateString('en-GB')}</p>
                    <p className='text-xs '>{completed === true ? 'Completed' : 'Pending'}</p>
                </div>

            </div>


            <div className='flex items-center space-x-1'>
                <button className='dark:bg-blue-950 bg-orange-800 px-2 py-1 rounded-md text-white cursor-pointer' onClick={() => handleEdit(id)}>edit</button>
                <div className='dark:bg-blue-950  p-1 rounded-md'>
                    <Trash onClick={() => handleDelete(id)} className='cursor-pointer' color='red' size={25} />
                </div>
            </div>

        </div>
    )
}



export default Task
