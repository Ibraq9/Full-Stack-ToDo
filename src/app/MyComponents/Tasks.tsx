"use client"

import { getTasks } from '@/action/task.action';
import { useMyContext } from '../context/ModalContext'
import React, { useEffect, useState } from 'react'
import Task from './Task';
import { Spinner } from "@/components/ui/spinner"

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

    // Combined search and sort function
    const searchAndSort = async () => {
        try {
            setLoading(true);
            const tasks = await getTasks();

            if (!tasks || tasks.length === 0) {
                setFilteredTasks([]);
                return;
            }

            // First: Filter/Search tasks
            let processedTasks = tasks.filter((task) =>
                task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.description.toLowerCase().includes(searchTerm.toLowerCase())
            );

            // Second: Sort the filtered tasks
            if (sortType === "Latest") {
                processedTasks = processedTasks.sort((a, b) => {
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                });
            } else if (sortType === "Oldest") {
                processedTasks = processedTasks.sort((a, b) => {
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
        return <Spinner size="lg" />
    }

    return (
        <div className='w-full space-y-2'>
            {filteredTasks.length === 0 ? (
                <div className="w-full text-center py-4 text-gray-500">
                    {searchTerm ? 'No tasks found matching your search.' : <Spinner/>}
                </div>
            ) : (
                filteredTasks.map((task) => (
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
    )
}

export default Tasks