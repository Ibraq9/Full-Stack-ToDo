
import React from 'react'
import SearchBar from './SearchBar'
import ToDo_Rank from './ToDo_Rank'
import AddTaskButton from './AddTaskButton'
import CheckModal from './CheckModal'
import { stackServerApp } from '../../stack'
import { getTasks } from '../../action/task.action'
import NoTaskMessage from './Nomessage'
import NotAuthenticated from './NotAuth'
import Tasks from './Tasks'



const Hero = async () => {

  const user = await stackServerApp.getUser();
  const tasks = await getTasks();


  return (
    <div className='flex flex-col items-center justify-center mt-10'>


      <div className='w-full sm:w-3/4'>

        {user && (
          <div className='flex items-center'>
            <h1 className='text-2xl font-bold ml-4 text-orange-800 dark:text-white'>Daily tasks</h1>
            <p className='w-8 sm:w-8 h-[4px] sm:h-[2px] dark:bg-white mt-2 bg-orange-800'></p>
          </div>
        )}

        <div className='w-full flex justify-between items-center flex-col sm:flex-row'>

          {user && tasks?.length !== 0 && (
            <div className='w-full sm:w-3/4 flex sm:flex-row flex-col items-center'>
              <SearchBar />
              <ToDo_Rank />
            </div>
          )}


          {user && (
            <div className={`w-full ${tasks?.length===0 ? 'w-full' : 'sm:w-1/4'} mr-4 mt-2 sm:mr-0 sm:mt-0 flex justify-end`}>
              <AddTaskButton />
            </div>
          )}


        </div>

      </div>

      {tasks?.length === 0 && (
        <NoTaskMessage />
      )}

      <CheckModal />

      {
        !user ? (
          <NotAuthenticated />
        ) : (
          <div className='flex w-16/17 sm:w-3/4 flex-col items-center justify-center mt-10'>
            <Tasks />
          </div>
        )
      }

    </div>

  )
}

export default Hero
