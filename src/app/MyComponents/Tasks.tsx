"use client"

import { getTasks } from '../../action/task.action'
import { useMyContext } from '../context/ModalContext'
import React, { useEffect, useState } from 'react'
import { ArrowDown, ArrowRight } from 'lucide-react';
import Task from './Task';


type FilterTasks = {
    id: number;
    title: string;
    description: string | null;
    completed: boolean;
    createdAt: Date;
}

const Tasks = () => {
    const { searchTerm, sortType } = useMyContext();
    const [filteredTasks, setFilteredTasks] = useState<FilterTasks[]>([]);
    const [loading, setLoading] = useState(false);
    const [appearCompleted, setappearCompleted] = useState(true);


    const CompleteTasksCount = () => {
        let count = 0;
        for (let i = 0; i < filteredTasks.length; i++) {
            if (filteredTasks[i].completed === true) {
                count++;
            }
        }

        return count;
    }




    const searchAndSort = async () => {
        try {
            setLoading(true);
            const tasks = await getTasks();

            if (!tasks || tasks.length === 0) {
                setFilteredTasks([]);
                return;
            }


            let processedTasks = tasks.filter((task: FilterTasks) =>
                task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (task.description?.toLowerCase() ?? '').includes(searchTerm.toLowerCase())
            );


            if (sortType === "Latest") {
                processedTasks = processedTasks.sort((a: FilterTasks, b: FilterTasks) => {
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                });
            } else if (sortType === "Oldest") {
                processedTasks = processedTasks.sort((a: FilterTasks, b: FilterTasks) => {
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                });
            }

            setFilteredTasks(processedTasks);

        } catch (error) {
            alert("Somthing went wrong")
            setFilteredTasks([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        searchAndSort();
    }, [searchTerm, sortType]);

    if (loading) {
        return "Loading..."
    }

    return (
        <div className='w-full space-y-2'>
            {filteredTasks.length === 0 ? (
                <div className="w-full text-center py-4 text-gray-500">
                    {searchTerm ? 'No tasks found matching your search.' : ""}
                </div>
            ) : (
                <div className='flex flex-col'>

                    <div>
                        {filteredTasks.filter(task => !task.completed).map(task => (
                            <Task
                                key={task.id}
                                id={task.id}
                                title={task.title}
                                description={task.description ?? ''}
                                completed={task.completed}
                                createdAt={task.createdAt}
                            />
                        ))}
                    </div>


                    <div className='mt-2'>

                        {CompleteTasksCount() > 0 && (
                            <div onClick={() => setappearCompleted(prev => !prev)} className=' rounded-sm ml-1 sm:ml-0 flex items-center gap-2 w-fit mb-2 cursor-pointer p-1.5 bg-orange-800 text-white dark:bg-slate-700'>
                                {appearCompleted ? <ArrowDown size={18} /> : <ArrowRight size={18} />}
                                {` Completed (${CompleteTasksCount()}) `}
                            </div>
                        )}


                        {appearCompleted && (
                            filteredTasks.filter(task => task.completed).map(task => (
                                <Task
                                    key={task.id}
                                    id={task.id}
                                    title={task.title}
                                    description={task.description ?? ''}
                                    completed={task.completed}
                                    createdAt={task.createdAt}
                                />
                            ))
                        )}

                    </div>

                </div>
            )}
        </div>
    );
}

export default Tasks