"use client"

import { useMyContext } from '../context/ModalContext';

const AddTaskButton = () => {
    const { setIsOpen , setModalData , setEditMode} = useMyContext();

    const handleAdd=()=>{
        setIsOpen(true);
        setEditMode(false);

        setModalData({
            id:0,
            title:"",
            description:""
        })
    }

    return (
        <div className='flex justify-end w-full sm:w-fit' onClick={handleAdd}>
            <div className=' flex space-x-2 items-center text-white bg-orange-800 dark:bg-slate-700 p-2 px-3 rounded-sm'> 
                <button className=' text-bold cursor-pointer w-fit'>Add Task</button>
            </div>
        </div>
    )
}

export default AddTaskButton