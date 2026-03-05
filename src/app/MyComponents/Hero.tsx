import React from "react";
import SearchBar from "./SearchBar";
import ToDo_Rank from "./ToDo_Rank";
import { stackServerApp } from "../../stack";
import { getTasks } from "../../action/task.action";
import NotAuthenticated from "./NotAuth";
import Tasks from "./Tasks";
import AddTaskDialog from "./AddTaskDialog";
import { ClipboardList } from "lucide-react";

const Hero = async ( {searchParams}: { searchParams:{search?: string; sort?:"relevant" | "latest" | "oldest" }}) => {
  const user = await stackServerApp.getUser();
  const tasks = await getTasks() ?? [];

  return (
    <div className="flex flex-col items-center justify-center mt-28">
      <div className="w-full sm:w-3/4">
        {user && (
          <div className="flex items-center">
            <h1 className="text-2xl font-bold ml-4 text-orange-800 dark:text-white">
              Daily Tasks
            </h1>
            <p className="w-8 sm:w-8 h-[4px] sm:h-[2px] dark:bg-white mt-2 bg-orange-800"></p>
          </div>
        )}

        <div className="w-full flex justify-between items-center flex-col sm:flex-row">
          {user && tasks?.length !== 0 && (
            <div className="w-full sm:w-3/4 flex sm:flex-row flex-col items-center">
              <SearchBar />
              <ToDo_Rank />
            </div>
          )}

          {user && (
            <div
              className={`w-full ${tasks?.length === 0 ? "w-full" : "sm:w-1/4"} mr-4 mt-2 sm:mr-0 sm:mt-0 flex justify-end`}
            >
              <AddTaskDialog />
            </div>
          )}
        </div>
      </div>

      {user && tasks?.length === 0 && (
        <div className=" flex flex-col items-center justify-center mt-16 text-center text-gray-600 px-4">
          <ClipboardList size={48} className="text-blue-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">No Tasks Found</h2>
          <p className="text-base max-w-md">
            You haven't added any tasks yet. Start by clicking the Add button
            and manage your day effectively.
          </p>
        </div>
      )}

     

      {!user ? (
        <NotAuthenticated />
      ) : (
        <div className="flex w-16/17 sm:w-3/4 flex-col items-center justify-center mt-10">
          <Tasks tasks={tasks} searchParams={searchParams}/>
        </div>
      )}
    </div>
  );
};

export default Hero;
