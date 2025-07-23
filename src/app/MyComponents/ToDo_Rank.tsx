"use client"
import React from 'react'
import { useMyContext } from '../context/ModalContext'

const ToDo_Rank = () => {

    const {setSortType , sortType} = useMyContext()
    return (
        <div className="w-16/17 sm:w-1/2 border-1 border-orange-800 rounded-3xl dark:border-blue-800">
            <select
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
                className=" rounded-3xl w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-blue-950"
            >
                <option className='text-black'>Relavent</option>
                <option className='text-black'>Latest</option>
                <option className='text-black'>Oldest</option>
            </select>
        </div>
    )
}

export default ToDo_Rank
